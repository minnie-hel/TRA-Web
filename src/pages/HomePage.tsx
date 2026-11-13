import { Link } from "react-router-dom";
import { publicUrl, resolvePublicAssetUrl } from "../lib/publicUrl";
import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { usePublishedNews } from "../lib/news";

export function HomePage() {
  const { t, lang } = useI18n();
  const h = t.home;
  const { articles } = usePublishedNews(lang);
  const article = articles[0] ?? t.news.articles[0];

  return (
    <>
      <Seo title={t.meta.home.title} description={t.meta.home.description} />
      <section className="relative min-h-[32rem] overflow-hidden bg-navy text-white md:min-h-[36rem]">
        <img
          src={publicUrl("/images/dar-sea.jpg")}
          alt="Skyline of Dar es Salaam seen from the sea"
          className="hero-kenburns absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy/90 to-navy/25" />
        <div className="relative mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-end px-5 py-12 md:min-h-[36rem] md:px-8">
          <p className="motion-in motion-in--delay-1 text-sm font-medium text-white/70">{h.kicker}</p>
          <h1 className="motion-in motion-in--delay-2 mt-2 max-w-3xl font-display text-3xl leading-tight text-balance md:text-5xl">
            {h.title}
          </h1>
          <p className="motion-in motion-in--delay-3 mt-5 max-w-xl text-lg leading-relaxed text-white/80">{h.lede}</p>
          <div className="motion-in motion-in--delay-4 mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/services">{h.services}</ButtonLink>
            <ButtonLink to="/contact?topic=partnership" variant="outline">
              {h.partner}
            </ButtonLink>
          </div>
          <dl className="motion-in motion-in--delay-5 mt-12 grid gap-4 border-t border-white/20 pt-6 sm:grid-cols-3">
            {h.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm font-medium text-white/70">{fact.label}</dt>
                <dd className="mt-1 text-sm text-white/85">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Reveal>
        <p className="border-b border-line bg-[#e7f4ec] px-5 py-4 text-center text-sm leading-relaxed text-navy md:px-8">
          {h.notice}
        </p>
      </Reveal>

      <Reveal as="section" className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-sm font-semibold text-green-deep">{h.whoKicker}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy text-balance">{h.whoTitle}</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink/90">
            {h.whoBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink to="/about" variant="text">
              {h.whoLink}
            </ButtonLink>
          </div>
        </div>
        <figure className="lg:col-span-6">
          <img
            src={publicUrl("/images/dar-skyline-2.jpg")}
            alt=""
            className="h-72 w-full object-cover md:h-96"
          />
          <figcaption className="mt-3 text-xs leading-relaxed text-muted">{t.common.illustrative}</figcaption>
          <blockquote className="mt-6 border-l-2 border-green pl-5">
            <p className="font-display text-xl leading-snug text-navy">{h.quote}</p>
            <footer className="mt-3 text-xs tracking-[0.14em] text-muted uppercase">{h.quoteFrom}</footer>
          </blockquote>
        </figure>
      </Reveal>

      <Reveal as="section" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <p className="text-sm font-semibold text-green-deep">{h.servicesKicker}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-navy">{h.servicesTitle}</h2>
          <p className="mt-4 max-w-2xl text-muted">{h.servicesLede}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal as="article" delay={0} className="card-feature flex min-h-80 flex-col justify-between bg-navy p-8 text-white">
              <div>
                <p className="font-display text-3xl text-white">{h.revenueIndex}</p>
                <h3 className="mt-6 font-display text-3xl">{h.revenueTitle}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-white/75">{h.revenueText}</p>
              </div>
              <Link to="/services/revenue" className="mt-8 text-sm text-white underline decoration-white/40 underline-offset-4">
                {h.revenueLink}
              </Link>
            </Reveal>
            <Reveal as="article" delay={120} className="card-feature flex min-h-80 flex-col justify-between bg-green-deep p-8 text-white">
              <div>
                <p className="font-display text-3xl text-white">{h.sanitationIndex}</p>
                <h3 className="mt-6 font-display text-3xl">{h.sanitationTitle}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-white/80">{h.sanitationText}</p>
              </div>
              <Link to="/services/sanitation" className="mt-8 text-sm text-white underline decoration-white/40 underline-offset-4">
                {h.sanitationLink}
              </Link>
            </Reveal>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <p className="text-sm font-semibold text-green-deep">{h.approachKicker}</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-navy">{h.approachTitle}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {h.steps.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 90} className="card card-step">
              <p className="font-display text-3xl text-navy">0{index + 1}</p>
              <h3 className="mt-3 font-medium text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <p className="text-sm font-semibold text-white/70">{h.impactKicker}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight">{h.impactTitle}</h2>
          <p className="mt-4 max-w-2xl text-white/75">{h.impactLede}</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {h.metrics.map((metric, index) => (
              <Reveal key={metric} delay={index * 80}>
                <div className="card-metric-dark">
                  <p className="font-display text-4xl text-white">—</p>
                  <p className="mt-3 text-sm tracking-wide text-white/85">{metric}</p>
                  <p className="mt-1 text-xs tracking-[0.14em] text-white/50 uppercase">{t.common.pending}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink to="/impact" variant="outline">
              {t.nav.impact}
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-green-deep">{h.projectsKicker}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy">{h.projectsTitle}</h2>
          <p className="mt-4 leading-relaxed text-muted">{h.projectsText}</p>
          <div className="mt-6">
            <ButtonLink to="/projects" variant="navy">
              {h.projectsLink}
            </ButtonLink>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-green-deep">{h.youthKicker}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy">{h.youthTitle}</h2>
          <p className="mt-4 leading-relaxed text-muted">{h.youthText}</p>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {h.youthPaths.map((path) => (
              <li key={path} className="card card-chip text-navy">
                {path}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ButtonLink to="/careers" variant="text">
              {h.youthLink}
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <p className="text-sm font-semibold text-green-deep">{h.partnersKicker}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-navy">{h.partnersTitle}</h2>
          <p className="mt-4 max-w-2xl text-muted">{h.partnersText}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {h.partnerTypes.map((type) => (
              <li key={type} className="card card-dashed px-4 py-6 text-sm text-navy">
                <span className="block text-[11px] tracking-[0.16em] text-muted uppercase">{t.common.notPublished}</span>
                <span className="mt-2 block font-medium">{type}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-green-deep">{h.newsKicker}</p>
            <h2 className="mt-3 font-display text-3xl text-navy">{h.newsTitle}</h2>
          </div>
          <ButtonLink to="/news" variant="text">
            {h.newsLink}
          </ButtonLink>
        </div>
        <article className="card card-news mt-8 grid md:grid-cols-5">
          <img
            src={resolvePublicAssetUrl(article.image)}
            alt={article.imageAlt ?? ""}
            className="h-64 w-full object-cover md:col-span-2 md:h-full"
          />
          <div className="p-6 md:col-span-3 md:p-8">
            <p className="text-xs tracking-[0.14em] text-muted uppercase">{article.dateline}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-navy">{article.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{article.excerpt}</p>
            <div className="mt-6">
              <ButtonLink to={`/news/${article.slug}`} variant="text">
                {t.news.read}
              </ButtonLink>
            </div>
          </div>
        </article>
      </Reveal>

      <Reveal as="section" className="bg-green-deep text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="font-display text-3xl">{h.ctaTitle}</h2>
            <p className="mt-3 max-w-xl text-white/80">{h.ctaText}</p>
          </div>
          <ButtonLink to="/contact?topic=partnership">{h.ctaButton}</ButtonLink>
        </div>
      </Reveal>
    </>
  );
}
