import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ErrorText, FormNote, Label, SuccessPanel, isEmail } from "../components/forms";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

const topics = ["general", "partnership", "project", "career"] as const;

type Errors = Partial<Record<"name" | "email" | "topic" | "message" | "consent", string>>;

export function ContactPage() {
  const { t } = useI18n();
  const c = t.contact;
  const [params] = useSearchParams();
  const requested = params.get("topic");
  const initial = topics.find((topic) => topic === requested) ?? "general";
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [topic, setTopic] = useState<string>(initial);

  useEffect(() => {
    setTopic(initial);
  }, [initial]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") || "").trim()) next.name = t.common.required;
    if (!isEmail(String(data.get("email") || ""))) next.email = t.common.email;
    if (!data.get("topic")) next.topic = t.common.required;
    if (!String(data.get("message") || "").trim()) next.message = t.common.required;
    if (!data.get("consent")) next.consent = t.common.consent;
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  return (
    <>
      <Seo title={t.meta.contact.title} description={t.meta.contact.description} />
      <PageHero kicker={c.kicker} title={c.title} lede={c.lede} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-12">
        <aside className="card-feature bg-navy p-6 text-white lg:col-span-4">
          <p className="text-xs tracking-[0.18em] text-white/70 uppercase">{c.officeTitle}</p>
          <p className="mt-4 font-display text-4xl">{c.office}</p>
          <p className="mt-2 text-white/75">{c.country}</p>
          <p className="mt-6 text-sm leading-relaxed text-white/70">{c.missing}</p>
          <p className="mt-6 border-t border-white/15 pt-6 text-sm leading-relaxed text-white/70">{c.shareNote}</p>
        </aside>
        <div className="card p-6 md:p-8 lg:col-span-8">
          {done ? (
            <SuccessPanel title={t.common.successTitle} body={t.common.successBody} again={t.common.another} onAgain={() => setDone(false)} />
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5">
              <FormNote>{t.common.formNote}</FormNote>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">{c.name}</Label>
                  <input id="name" name="name" className="field" autoComplete="name" />
                  <ErrorText>{errors.name}</ErrorText>
                </div>
                <div>
                  <Label htmlFor="organisation">
                    {c.organisation} <span className="font-normal text-muted">({c.optional})</span>
                  </Label>
                  <input id="organisation" name="organisation" className="field" autoComplete="organization" />
                </div>
                <div>
                  <Label htmlFor="email">{c.email}</Label>
                  <input id="email" name="email" type="email" className="field" autoComplete="email" />
                  <ErrorText>{errors.email}</ErrorText>
                </div>
                <div>
                  <Label htmlFor="phone">
                    {c.phone} <span className="font-normal text-muted">({c.optional})</span>
                  </Label>
                  <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" />
                </div>
              </div>
              <div>
                <Label htmlFor="topic">{c.topic}</Label>
                <select
                  id="topic"
                  name="topic"
                  className="field"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                >
                  {c.topics.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ErrorText>{errors.topic}</ErrorText>
                {topic === "career" && (
                  <p className="mt-2 text-sm text-muted">
                    {c.careerNote}{" "}
                    <Link to="/careers" className="text-navy underline decoration-green underline-offset-4">
                      {t.nav.careers}
                    </Link>
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="message">{c.message}</Label>
                <textarea id="message" name="message" rows={6} className="field" />
                <ErrorText>{errors.message}</ErrorText>
              </div>
              <div>
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input name="consent" type="checkbox" className="mt-1" />
                  <span>{t.common.privacyCheck}</span>
                </label>
                <ErrorText>{errors.consent}</ErrorText>
              </div>
              <button type="submit" className="w-fit bg-green-deep px-5 py-3 text-sm font-medium text-white hover:bg-green">
                {c.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
