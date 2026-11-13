import crypto from "node:crypto";
import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";

export type StoredArticle = {
  id: string;
  slug: string;
  category: string;
  published: boolean;
  author: string;
  image: string;
  createdAt: string;
  en: { title: string; excerpt: string; body: string; caption: string };
  sw: { title: string; excerpt: string; body: string; caption: string };
};

const root = process.cwd();
const newsFile = path.join(root, "data", "news.json");
const adminFile = path.join(root, "data", "admin.json");
const uploadDir = path.join(root, "public", "uploads");
const sessions = new Set<string>();

function readNews(): StoredArticle[] {
  const raw = fs.readFileSync(newsFile, "utf8");
  const parsed = JSON.parse(raw) as { articles: StoredArticle[] };
  return parsed.articles;
}

function writeNews(articles: StoredArticle[]) {
  fs.writeFileSync(newsFile, JSON.stringify({ articles }, null, 2));
}

function adminRecord() {
  const parsed = JSON.parse(fs.readFileSync(adminFile, "utf8")) as { username: string; password: string };
  return parsed;
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function authorized(req: IncomingMessage) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token.length > 0 && sessions.has(token);
}

function slugify(title: string, articles: StoredArticle[], currentId?: string) {
  const base =
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "update";
  let slug = base;
  let n = 2;
  while (articles.some((item) => item.slug === slug && item.id !== currentId)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

function saveImage(dataUrl: string) {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([a-z0-9+/=\s]+)$/i.exec(dataUrl);
  if (!match) return null;
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 1_500_000) return null;
  fs.mkdirSync(uploadDir, { recursive: true });
  const ext = match[1] === "image/png" ? "png" : match[1] === "image/webp" ? "webp" : "jpg";
  const name = `${crypto.randomBytes(8).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(uploadDir, name), buffer);
  return `/uploads/${name}`;
}

function cleanCopy(value: unknown) {
  const record = (value ?? {}) as Record<string, unknown>;
  return {
    title: String(record.title ?? "").trim(),
    excerpt: String(record.excerpt ?? "").trim(),
    body: String(record.body ?? "").trim(),
    caption: String(record.caption ?? "").trim(),
  };
}

export async function handleNewsApi(req: IncomingMessage, res: ServerResponse) {
  const parsed = new URL(req.url ?? "/", "http://localhost");
  const pathname = parsed.pathname;
  const method = req.method ?? "GET";

  if (pathname === "/api/news" && method === "GET") {
    const articles = readNews()
      .filter((item) => item.published)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    send(res, 200, { articles });
    return;
  }

  if (pathname === "/api/admin/login" && method === "POST") {
    const body = JSON.parse(await readBody(req)) as { username?: string; password?: string };
    const admin = adminRecord();
    if (body.username !== admin.username || body.password !== admin.password) {
      send(res, 401, { error: "unauthorized" });
      return;
    }
    const token = crypto.randomBytes(24).toString("hex");
    sessions.add(token);
    send(res, 200, { token });
    return;
  }

  if (!pathname.startsWith("/api/admin/")) {
    send(res, 404, { error: "not-found" });
    return;
  }

  if (!authorized(req)) {
    send(res, 401, { error: "unauthorized" });
    return;
  }

  if (pathname === "/api/admin/news" && method === "GET") {
    const articles = readNews().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    send(res, 200, { articles });
    return;
  }

  if (pathname === "/api/admin/news" && method === "POST") {
    const body = JSON.parse(await readBody(req)) as Record<string, unknown>;
    const en = cleanCopy(body.en);
    if (!en.title) {
      send(res, 400, { error: "title" });
      return;
    }
    const articles = readNews();
    let image = String(body.image ?? "").trim() || "/images/dar-skyline-2.jpg";
    if (typeof body.imageData === "string" && body.imageData.startsWith("data:image/")) {
      const saved = saveImage(body.imageData);
      if (!saved) {
        send(res, 400, { error: "image" });
        return;
      }
      image = saved;
    }
    const article: StoredArticle = {
      id: crypto.randomBytes(8).toString("hex"),
      slug: slugify(en.title, articles),
      category: String(body.category ?? "announcements"),
      published: Boolean(body.published),
      author: String(body.author ?? "Envision Strategies").trim() || "Envision Strategies",
      image,
      createdAt: new Date().toISOString().slice(0, 10),
      en,
      sw: cleanCopy(body.sw),
    };
    articles.unshift(article);
    writeNews(articles);
    send(res, 201, { article });
    return;
  }

  const match = /^\/api\/admin\/news\/([a-z0-9]+)$/.exec(pathname);
  if (!match) {
    send(res, 404, { error: "not-found" });
    return;
  }
  const id = match[1];
  const articles = readNews();
  const index = articles.findIndex((item) => item.id === id);
  if (index < 0) {
    send(res, 404, { error: "not-found" });
    return;
  }

  if (method === "PUT") {
    const body = JSON.parse(await readBody(req)) as Record<string, unknown>;
    const en = cleanCopy(body.en);
    if (!en.title) {
      send(res, 400, { error: "title" });
      return;
    }
    const current = articles[index];
    let image = String(body.image ?? current.image);
    if (typeof body.imageData === "string" && body.imageData.startsWith("data:image/")) {
      const saved = saveImage(body.imageData);
      if (!saved) {
        send(res, 400, { error: "image" });
        return;
      }
      image = saved;
    }
    const next: StoredArticle = {
      ...current,
      slug: slugify(en.title, articles, current.id),
      category: String(body.category ?? current.category),
      published: Boolean(body.published),
      author: String(body.author ?? current.author).trim() || current.author,
      image,
      en,
      sw: cleanCopy(body.sw),
    };
    articles[index] = next;
    writeNews(articles);
    send(res, 200, { article: next });
    return;
  }

  if (method === "DELETE") {
    articles.splice(index, 1);
    writeNews(articles);
    send(res, 200, { ok: true });
    return;
  }

  send(res, 405, { error: "method" });
}
