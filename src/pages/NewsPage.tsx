import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { usePublishedNews } from "../lib/news";
import { resolvePublicAssetUrl } from "../lib/publicUrl";

export function NewsPage() {
  const { t, lang } = useI18n();
  const n = t.news;
  const { articles, loading } = usePublishedNews(lang);
  const [category, setCategory] = useState("all");
  const visible = articles.filter((article) => category === "all" || article.category === category);

  return (
    <>
      <Seo title={t.meta.news.title} description={t.meta.news.description} />
      <PageHero kicker={n.kicker} title={n.title} lede={n.lede} />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="flex flex-wrap gap-2">
          {n.categories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
              className={`card-filter text-sm ${category === item.id ? "border-green-deep bg-green-deep text-white" : "border-line bg-white text-navy"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {loading ? (
          <p className="mt-10 text-muted">{n.kicker}</p>
        ) : visible.length === 0 ? (
          <p className="card mt-10 px-6 py-10 text-muted">{n.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6">
            {visible.map((article, index) => (
              <Reveal key={article.slug} as="article" delay={index * 100} className="card card-news grid md:grid-cols-5">
                <img
                  src={resolvePublicAssetUrl(article.image)}
                  alt={article.imageAlt}
                  className="h-56 w-full object-cover md:col-span-2 md:h-full"
                />
                <div className="p-6 md:col-span-3">
                  <p className="text-xs tracking-[0.14em] text-muted uppercase">{article.dateline}</p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-navy">{article.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{article.excerpt}</p>
                  <Link to={`/news/${article.slug}`} className="mt-5 inline-block text-sm text-green-deep underline decoration-green decoration-2 underline-offset-[6px]">
                    {n.read}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
