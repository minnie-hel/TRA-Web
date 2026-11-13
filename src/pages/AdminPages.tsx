import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { adminRequest, readToken, writeToken, type StoredArticle } from "../lib/news";

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("file"));
    reader.readAsDataURL(file);
  });
}

export function AdminLoginPage() {
  const { t } = useI18n();
  const a = t.admin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: String(data.get("username") ?? ""),
        password: String(data.get("password") ?? ""),
      }),
    });
    if (!response.ok) {
      setError(a.badLogin);
      return;
    }
    const body = (await response.json()) as { token: string };
    writeToken(body.token);
    navigate("/admin");
  }

  return (
    <>
      <Seo title={a.loginTitle} description={a.loginLede} />
      <section className="mx-auto max-w-md px-5 py-16">
        <h1 className="font-display text-4xl text-navy">{a.loginTitle}</h1>
        <p className="mt-3 leading-relaxed text-muted">{a.loginLede}</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4 bg-white p-6">
          <label className="block text-sm font-medium text-navy">
            {a.username}
            <input name="username" className="field mt-2" autoComplete="username" />
          </label>
          <label className="block text-sm font-medium text-navy">
            {a.password}
            <input name="password" type="password" className="field mt-2" autoComplete="current-password" />
          </label>
          {error && <p className="text-sm text-red-800">{error}</p>}
          <button type="submit" className="bg-green-deep px-5 py-3 text-sm font-medium text-white hover:bg-green">
            {a.signIn}
          </button>
        </form>
      </section>
    </>
  );
}

export function AdminListPage() {
  const { t } = useI18n();
  const a = t.admin;
  const navigate = useNavigate();
  const [articles, setArticles] = useState<StoredArticle[] | null>(null);

  useEffect(() => {
    if (!readToken()) return;
    adminRequest<{ articles: StoredArticle[] }>("/api/admin/news")
      .then((data) => setArticles(data.articles))
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  if (!readToken()) return <Navigate to="/admin/login" replace />;

  async function remove(id: string) {
    if (!window.confirm(a.confirmDelete)) return;
    await adminRequest(`/api/admin/news/${id}`, { method: "DELETE" });
    setArticles((current) => current?.filter((item) => item.id !== id) ?? null);
  }

  return (
    <>
      <Seo title={a.loginTitle} description={a.listLede} />
      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-navy">{a.loginTitle}</h1>
            <p className="mt-3 max-w-xl text-muted">{a.listLede}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/news" className="border border-navy px-4 py-2 text-sm text-navy">{a.viewSite}</Link>
            <button
              type="button"
              className="text-sm text-muted underline"
              onClick={() => {
                writeToken("");
                navigate("/admin/login");
              }}
            >
              {a.signOut}
            </button>
          </div>
        </div>
        <Link to="/admin/news/new" className="mt-8 inline-block bg-green-deep px-5 py-3 text-sm font-medium text-white hover:bg-green">
          {a.newItem}
        </Link>
        <h2 className="mt-10 font-display text-2xl text-navy">{a.listTitle}</h2>
        {articles === null ? (
          <p className="mt-4 text-muted">{a.listTitle}</p>
        ) : articles.length === 0 ? (
          <p className="mt-4 text-muted">{a.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-line border-y border-line bg-white">
            {articles.map((article) => (
              <li key={article.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
                <div>
                  <p className="font-medium text-navy">{article.en.title}</p>
                  <p className="text-xs tracking-[0.12em] text-muted uppercase">
                    {article.createdAt} · {article.published ? a.published : a.draft}
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <Link to={`/admin/news/${article.id}`} className="text-navy underline decoration-green underline-offset-4">{a.edit}</Link>
                  <button type="button" className="text-red-800" onClick={() => void remove(article.id)}>{a.delete}</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

const emptyCopy = { title: "", excerpt: "", body: "", caption: "" };

export function AdminEditPage() {
  const { id } = useParams();
  const { t } = useI18n();
  const a = t.admin;
  const navigate = useNavigate();
  const [ready, setReady] = useState(!id);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [imageData, setImageData] = useState("");
  const [form, setForm] = useState({
    category: "announcements",
    author: "Envision Strategies",
    published: false,
    image: "/images/dar-skyline-2.jpg",
    en: { ...emptyCopy },
    sw: { ...emptyCopy },
  });

  useEffect(() => {
    if (!readToken()) return;
    if (!id) return;
    adminRequest<{ articles: StoredArticle[] }>("/api/admin/news")
      .then((data) => {
        const article = data.articles.find((item) => item.id === id);
        if (!article) {
          navigate("/admin");
          return;
        }
        setForm({
          category: article.category,
          author: article.author,
          published: article.published,
          image: article.image,
          en: article.en,
          sw: article.sw.title ? article.sw : { ...emptyCopy },
        });
        setReady(true);
      })
      .catch(() => navigate("/admin/login"));
  }, [id, navigate]);

  if (!readToken()) return <Navigate to="/admin/login" replace />;

  function setLangField(language: "en" | "sw", key: keyof typeof emptyCopy, value: string) {
    setForm((current) => ({ ...current, [language]: { ...current[language], [key]: value } }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!form.en.title.trim()) {
      setError(a.requiredTitle);
      return;
    }
    const payload = { ...form, ...(imageData ? { imageData } : {}) };
    try {
      if (id) await adminRequest(`/api/admin/news/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await adminRequest("/api/admin/news", { method: "POST", body: JSON.stringify(payload) });
      setNotice(a.saved);
      window.setTimeout(() => navigate("/admin"), 700);
    } catch {
      setError(a.imageError);
    }
  }

  const categories = t.news.categories.filter((item) => item.id !== "all");

  return (
    <>
      <Seo title={a.newItem} description={a.listLede} />
      <section className="mx-auto max-w-4xl px-5 py-14">
        <Link to="/admin" className="text-sm text-navy underline decoration-green underline-offset-4">{a.back}</Link>
        <h1 className="mt-4 font-display text-4xl text-navy">{id ? a.edit : a.newItem}</h1>
        {!ready ? (
          <p className="mt-6 text-muted">{a.listTitle}</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5 bg-white p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-navy">
                {a.category}
                <select className="field mt-2" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-navy">
                {a.author}
                <input className="field mt-2" value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} />
              </label>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-navy">
                {a.titleEn}
                <input className="field mt-2" value={form.en.title} onChange={(event) => setLangField("en", "title", event.target.value)} />
              </label>
              <label className="block text-sm font-medium text-navy">
                {a.titleSw}
                <input className="field mt-2" value={form.sw.title} onChange={(event) => setLangField("sw", "title", event.target.value)} />
              </label>
              <label className="block text-sm font-medium text-navy">
                {a.excerptEn}
                <textarea className="field mt-2" rows={3} value={form.en.excerpt} onChange={(event) => setLangField("en", "excerpt", event.target.value)} />
              </label>
              <label className="block text-sm font-medium text-navy">
                {a.excerptSw}
                <textarea className="field mt-2" rows={3} value={form.sw.excerpt} onChange={(event) => setLangField("sw", "excerpt", event.target.value)} />
              </label>
              <label className="block text-sm font-medium text-navy">
                {a.bodyEn}
                <textarea className="field mt-2" rows={8} value={form.en.body} onChange={(event) => setLangField("en", "body", event.target.value)} />
              </label>
              <label className="block text-sm font-medium text-navy">
                {a.bodySw}
                <textarea className="field mt-2" rows={8} value={form.sw.body} onChange={(event) => setLangField("sw", "body", event.target.value)} />
              </label>
            </div>
            <p className="text-xs text-muted">{a.bodyHelp}</p>
            <label className="block text-sm font-medium text-navy">
              {a.image}
              <input
                className="mt-2 block text-sm"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (file.size > 1_500_000) {
                    setError(a.imageError);
                    return;
                  }
                  void fileToDataUrl(file).then(setImageData);
                }}
              />
            </label>
            <p className="text-xs text-muted">{a.imageHelp}</p>
            {form.image && <img src={form.image} alt="" className="h-36 w-full max-w-sm object-cover" />}
            <label className="flex items-center gap-3 text-sm text-navy">
              <input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} />
              {a.publish}
            </label>
            {error && <p className="text-sm text-red-800">{error}</p>}
            {notice && <p className="text-sm text-green-deep">{notice}</p>}
            <button type="submit" className="bg-navy px-5 py-3 text-sm font-medium text-white">{a.save}</button>
          </form>
        )}
      </section>
    </>
  );
}
