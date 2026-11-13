import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useI18n();
  const page = t[kind];
  const meta = t.meta[kind];

  return (
    <>
      <Seo title={meta.title} description={meta.description} />
      <PageHero kicker={page.kicker} title={page.title} lede={page.lede} />
      <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 md:px-8">
        {page.blocks.map((block) => (
          <section key={block.title}>
            <h2 className="font-display text-2xl text-navy">{block.title}</h2>
            <p className="mt-3 leading-relaxed">{block.text}</p>
          </section>
        ))}
      </div>
    </>
  );
}
