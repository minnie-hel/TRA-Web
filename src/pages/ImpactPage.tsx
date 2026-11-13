import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

export function ImpactPage() {
  const { t } = useI18n();
  const i = t.impact;

  return (
    <>
      <Seo title={t.meta.impact.title} description={t.meta.impact.description} />
      <PageHero kicker={i.kicker} title={i.title} lede={i.lede} />
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
          {t.home.metrics.map((metric) => (
            <div key={metric} className="card-metric-dark">
              <p className="font-display text-5xl text-white">—</p>
              <p className="mt-3 text-sm">{metric}</p>
              <p className="mt-1 text-xs tracking-[0.14em] text-white/50 uppercase">{t.common.pending}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 md:px-8">
        <section>
          <h2 className="font-display text-4xl text-navy">{i.forTitle}</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {i.forPeople.map((person) => (
              <article key={person.title} className="card card-soft">
                <h3 className="font-display text-2xl text-navy">{person.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          {i.areas.map((area, index) => (
            <article key={area.title} className="card card-accent-green p-6">
              <p className="font-display text-green-deep">0{index + 1}</p>
              <h2 className="mt-3 font-display text-3xl text-navy">{area.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{area.text}</p>
            </article>
          ))}
        </section>
        <section>
          <h2 className="font-display text-4xl text-navy">{i.placeTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {i.places.map((place) => (
              <article key={place.title} className="card p-5">
                <h3 className="font-medium text-navy">{place.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{place.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-2">
          <article className="card-feature bg-navy px-6 py-8 text-white">
            <h2 className="font-display text-3xl">{i.reportsTitle}</h2>
            <p className="mt-3 leading-relaxed text-white/75">{i.reportsText}</p>
          </article>
          <article className="card card-soft px-6 py-8">
            <h2 className="font-display text-3xl text-navy">{i.methodTitle}</h2>
            <ol className="mt-4 space-y-3">
              {i.method.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-display text-green-deep">0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>
        </section>
        <p>
          <Link to="/careers" className="text-green-deep underline decoration-green decoration-2 underline-offset-[6px]">
            {t.home.youthLink}
          </Link>
        </p>
      </div>
    </>
  );
}
