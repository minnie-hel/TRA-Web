import { ButtonLink } from "../components/ButtonLink";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

export function RevenuePage() {
  const { t } = useI18n();
  const r = t.revenue;

  return (
    <>
      <Seo title={t.meta.revenue.title} description={t.meta.revenue.description} />
      <PageHero kicker={r.kicker} title={r.title} lede={r.lede} />
      <div className="mx-auto max-w-6xl space-y-14 px-5 py-16 md:px-8">
        <aside className="card-callout px-5 py-5">
          <h2 className="font-display text-2xl text-navy">{r.authorityTitle}</h2>
          <p className="mt-3 leading-relaxed text-navy">{r.authority}</p>
        </aside>
        <section>
          <h2 className="font-display text-3xl text-navy">{r.roleTitle}</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {r.role.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-display text-3xl text-navy">{r.listTitle}</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {r.items.map((item, index) => (
              <div key={item.title} className="grid gap-2 py-5 md:grid-cols-12">
                <p className="font-display text-green-deep md:col-span-1">0{index + 1}</p>
                <h3 className="font-medium text-navy md:col-span-4">{item.title}</h3>
                <p className="text-muted md:col-span-7">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-display text-3xl text-navy">{r.benefitTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            {r.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink to="/contact?topic=partnership">{r.cta}</ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
