import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";
import { publicUrl } from "../lib/publicUrl";

export function AboutPage() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <>
      <Seo title={t.meta.about.title} description={t.meta.about.description} />
      <PageHero kicker={a.kicker} title={a.title} lede={a.lede} />
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-8 md:grid-cols-3 md:px-8">
          {a.pillars.map((pillar) => (
            <article key={pillar.title} className="card card-step">
              <h2 className="font-display text-2xl text-navy">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
      <nav className="border-b border-line bg-paper" aria-label={a.toc}>
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 md:px-8">
          {a.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="card card-chip shrink-0 text-sm text-navy">
              {section.label}
            </a>
          ))}
        </div>
      </nav>
      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 md:px-8">
        <section id="overview" className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-navy">{a.overviewTitle}</h2>
            <div className="mt-5 space-y-4 leading-relaxed">
              {a.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <figure>
            <img src={publicUrl("/images/dar-skyline-2.jpg")} alt="" className="h-80 w-full object-cover" />
            <figcaption className="mt-2 text-xs text-muted">{t.common.illustrative}</figcaption>
          </figure>
        </section>

        <section id="establishment">
          <h2 className="font-display text-4xl text-navy">{a.establishmentTitle}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {a.facts.map((fact) => (
              <article key={fact.label} className="card p-5">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">{fact.label}</p>
                <p className="mt-2 text-navy">{fact.value}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{a.capitalNote}</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article id="vision" className="card-feature bg-navy p-8 text-white">
            <h2 className="font-display text-3xl">{a.visionTitle}</h2>
            <p className="mt-4 font-display text-2xl leading-snug">{a.vision}</p>
            <p className="mt-4 text-xs tracking-[0.14em] text-white/65 uppercase">{a.visionNote}</p>
          </article>
          <article id="mission" className="card-feature bg-green-deep p-8 text-white">
            <h2 className="font-display text-3xl">{a.missionTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed">{a.mission}</p>
            <p className="mt-4 text-xs tracking-[0.14em] text-white/75 uppercase">{a.missionNote}</p>
          </article>
        </section>

        <section id="values">
          <h2 className="font-display text-4xl text-navy">{a.valuesTitle}</h2>
          <p className="mt-3 text-sm text-muted">{a.valuesNote}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.values.map((value, index) => (
              <li key={value.title} className="card p-5">
                <p className="font-display text-green-deep">0{index + 1}</p>
                <h3 className="mt-2 font-medium text-navy">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="objectives" className="bg-white p-6 md:p-8">
          <h2 className="font-display text-4xl text-navy">{a.objectivesTitle}</h2>
          <p className="mt-3 text-sm text-muted">{a.objectivesNote}</p>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {a.objectives.map((objective, index) => (
              <li key={objective} className="card flex gap-4 p-4">
                <span className="font-display text-2xl text-green-deep">0{index + 1}</span>
                <span className="pt-1">{objective}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted">{a.boilerplate}</p>
        </section>

        <section id="leadership">
          <h2 className="font-display text-4xl text-navy">{a.leadershipTitle}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed">{a.leadershipIntro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {a.offices.map((office) => (
              <article key={office.title} className="card card-accent-navy p-5">
                <h3 className="font-display text-2xl text-navy">{office.title}</h3>
                <p className="mt-2 text-xs tracking-[0.14em] text-muted uppercase">{t.common.notPublished}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{office.text}</p>
              </article>
            ))}
          </div>
          <h3 className="mt-10 font-display text-3xl text-navy">{a.boardTitle}</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {a.board.map((item) => (
              <li key={item} className="card px-4 py-3 text-sm leading-relaxed">{item}</li>
            ))}
          </ul>
        </section>

        <section id="governance" className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-navy">{a.governanceTitle}</h2>
            <ul className="mt-4 space-y-3">
              {a.governance.map((item) => (
                <li key={item} className="border-l-2 border-green pl-4 leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
          <div id="ppp">
            <h2 className="font-display text-4xl text-navy">{a.pppTitle}</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              {a.ppp.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
