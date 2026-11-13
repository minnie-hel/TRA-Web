import { ButtonLink } from "../components/ButtonLink";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

export function SanitationPage() {
  const { t } = useI18n();
  const s = t.sanitation;

  return (
    <>
      <Seo title={t.meta.sanitation.title} description={t.meta.sanitation.description} />
      <PageHero kicker={s.kicker} title={s.title} lede={s.lede} />
      <div className="mx-auto max-w-6xl space-y-14 px-5 py-16 md:px-8">
        <aside className="card px-5 py-5">
          <h2 className="font-display text-2xl text-navy">{s.authorityTitle}</h2>
          <p className="mt-3 leading-relaxed">{s.authority}</p>
        </aside>
        <section>
          <h2 className="font-display text-3xl text-navy">{s.roleTitle}</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {s.role.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-display text-3xl text-navy">{s.listTitle}</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {s.items.map((item, index) => (
              <div key={item.title} className="grid gap-2 py-5 md:grid-cols-12">
                <p className="font-display text-green md:col-span-1">0{index + 1}</p>
                <h3 className="font-medium text-navy md:col-span-4">{item.title}</h3>
                <p className="text-muted md:col-span-7">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/contact?topic=project">{s.cta}</ButtonLink>
            <ButtonLink to="/sustainability#report" variant="navy">
              {s.report}
            </ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
