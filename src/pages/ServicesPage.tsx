import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

export function ServicesPage() {
  const { t } = useI18n();
  const s = t.services;

  return (
    <>
      <Seo title={t.meta.services.title} description={t.meta.services.description} />
      <PageHero kicker={s.kicker} title={s.title} lede={s.lede} />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <h2 className="font-display text-4xl text-navy">{s.coverTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link to="/services/revenue" className="card-feature flex min-h-80 flex-col justify-between bg-navy p-8 text-white hover:bg-navy-deep">
          <div>
            <p className="font-display text-4xl text-white">01</p>
            <h2 className="mt-6 font-display text-3xl">{s.revenueTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/75">{s.revenueText}</p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              {s.revenueMore.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <span className="mt-8 text-sm text-white">{s.open}</span>
        </Link>
        <Link to="/services/sanitation" className="card-feature flex min-h-80 flex-col justify-between bg-green-deep p-8 text-white hover:bg-green">
          <div>
            <p className="font-display text-4xl text-white">02</p>
            <h2 className="mt-6 font-display text-3xl">{s.sanitationTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/80">{s.sanitationText}</p>
            <ul className="mt-5 space-y-2 text-sm text-white/85">
              {s.sanitationMore.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <span className="mt-8 text-sm text-white">{s.open}</span>
        </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="font-display text-4xl text-navy">{s.whoTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {s.who.map((item) => (
              <article key={item.title} className="card p-5">
                <h3 className="font-medium text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="font-display text-4xl text-navy">{s.howTitle}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {s.how.map((step) => (
            <li key={step.title} className="card card-soft">
              <h3 className="font-display text-2xl text-navy">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="font-display text-4xl">{s.askTitle}</h2>
          <div className="mt-8 space-y-6">
            {s.ask.map((item) => (
              <article key={item.q} className="card-panel-dark">
                <h3 className="font-display text-2xl">{item.q}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-white/75">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
