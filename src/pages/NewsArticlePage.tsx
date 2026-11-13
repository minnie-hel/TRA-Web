import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { usePublishedNews } from "../lib/news";
import { resolvePublicAssetUrl } from "../lib/publicUrl";
import { NotFoundPage } from "./NotFoundPage";

export function NewsArticlePage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const { articles, loading, failed } = usePublishedNews(lang);
  const article = articles.find((item) => item.slug === slug) ?? (failed ? t.news.articles.find((item) => item.slug === slug) : undefined);

  if (loading) {
    return <p className="mx-auto max-w-3xl px-5 py-20 text-muted">{t.news.kicker}</p>;
  }
  if (!article) return <NotFoundPage />;

  return (
    <>
      <Seo title={`${article.title} · Envision Strategies`} description={article.excerpt} />
      <article className="card card-news mx-auto my-8 max-w-5xl overflow-hidden bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
          <Link to="/news" className="text-sm text-navy underline decoration-green decoration-2 underline-offset-[6px]">
            {t.common.backNews}
          </Link>
          <p className="mt-6 text-xs tracking-[0.16em] text-muted uppercase">{article.dateline}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-navy md:text-5xl">{article.title}</h1>
          <p className="mt-4 text-sm text-muted">
            {t.news.by} {article.author}
          </p>
        </div>
        <img
          src={resolvePublicAssetUrl(article.image)}
          alt={article.imageAlt}
          className="mx-auto max-h-[32rem] w-full max-w-5xl object-cover px-5 md:px-8"
        />
        {article.caption && <p className="mx-auto max-w-3xl px-5 pt-3 text-xs text-muted md:px-8">{article.caption}</p>}
        <div className="mx-auto max-w-3xl space-y-5 px-5 py-10 text-lg leading-relaxed md:px-8">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}
