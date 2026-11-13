import { useEffect, useState } from "react";
import type { Lang } from "../i18n/LanguageContext";

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

export type PublicArticle = {
  id: string;
  slug: string;
  category: string;
  author: string;
  image: string;
  imageAlt: string;
  dateline: string;
  title: string;
  excerpt: string;
  caption: string;
  body: string[];
};

const tokenKey = "envision-news-token";

export function readToken() {
  return sessionStorage.getItem(tokenKey) ?? "";
}

export function writeToken(token: string) {
  if (token) sessionStorage.setItem(tokenKey, token);
  else sessionStorage.removeItem(tokenKey);
}

export function localize(article: StoredArticle, lang: Lang): PublicArticle {
  const preferred = lang === "sw" && article.sw.title ? article.sw : article.en;
  const date = new Date(`${article.createdAt}T00:00:00`);
  const dateline = Number.isNaN(date.getTime())
    ? article.createdAt
    : new Intl.DateTimeFormat(lang === "sw" ? "sw" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
  return {
    id: article.id,
    slug: article.slug,
    category: article.category,
    author: article.author,
    image: article.image,
    imageAlt: preferred.caption || preferred.title,
    dateline,
    title: preferred.title,
    excerpt: preferred.excerpt,
    caption: preferred.caption,
    body: preferred.body
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean),
  };
}

export function usePublishedNews(lang: Lang) {
  const [articles, setArticles] = useState<PublicArticle[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancel = false;
    const newsUrl = import.meta.env.DEV
      ? "/api/news"
      : `${import.meta.env.BASE_URL}news.json`;
    fetch(newsUrl)
      .then((response) => {
        if (!response.ok) throw new Error("news");
        return response.json() as Promise<{ articles: StoredArticle[] }>;
      })
      .then((data) => {
        if (!cancel) setArticles(data.articles.map((item) => localize(item, lang)));
      })
      .catch(() => {
        if (!cancel) setFailed(true);
      });
    return () => {
      cancel = true;
    };
  }, [lang]);

  return { articles: articles ?? [], loading: articles === null && !failed, failed };
}

export async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = readToken();
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (response.status === 401) {
    writeToken("");
    throw new Error("unauthorized");
  }
  if (!response.ok) throw new Error("request");
  return response.json() as Promise<T>;
}
