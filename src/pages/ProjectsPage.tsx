import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

export function ProjectsPage() {
  const { t } = useI18n();
  const p = t.projects;

  return (
    <>
      <Seo title={t.meta.projects.title} description={t.meta.projects.description} />
      <PageHero kicker={p.kicker} title={p.title} lede={p.lede} />
      <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 md:px-8">
        <section>
          <h2 className="font-display text-3xl text-navy">{p.explainTitle}</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {p.explain.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="card-callout px-6 py-8">
          <h2 className="font-display text-3xl text-navy">{p.emptyTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-navy">{p.emptyText}</p>
        </section>
        <section>
          <h2 className="font-display text-3xl text-navy">{p.profileTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {p.profile.map((item, index) => (
              <li key={item} className="card flex gap-4 px-4 py-4">
                <span className="font-display text-green-deep">0{index + 1}</span>
                <span className="text-navy">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
