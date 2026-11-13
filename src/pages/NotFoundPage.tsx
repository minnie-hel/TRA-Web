import { ButtonLink } from "../components/ButtonLink";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <>
      <Seo title={t.meta.notFound.title} description={t.meta.notFound.description} />
      <section className="mx-auto max-w-3xl px-5 py-24 md:px-8">
        <p className="font-display text-6xl text-green-deep">404</p>
        <h1 className="mt-4 font-display text-4xl text-navy">{t.notFound.title}</h1>
        <p className="mt-4 text-muted">{t.notFound.text}</p>
        <div className="mt-8">
          <ButtonLink to="/">{t.notFound.home}</ButtonLink>
        </div>
      </section>
    </>
  );
}
