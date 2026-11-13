import { useState, type FormEvent } from "react";
import { ErrorText, FormNote, Label, SuccessPanel, isEmail } from "../components/forms";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

type Errors = Partial<Record<"name" | "email" | "phone" | "area" | "message" | "cv" | "consent", string>>;

export function CareersPage() {
  const { t } = useI18n();
  const c = t.careers;
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") || "").trim()) next.name = t.common.required;
    if (!isEmail(String(data.get("email") || ""))) next.email = t.common.email;
    if (!String(data.get("phone") || "").trim()) next.phone = t.common.required;
    if (!data.get("area")) next.area = t.common.required;
    if (!String(data.get("message") || "").trim()) next.message = t.common.required;
    const file = data.get("cv");
    if (!(file instanceof File) || file.size === 0) {
      next.cv = t.common.required;
    } else {
      const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const namedOk = /\.(pdf|docx?)$/i.test(file.name);
      if (!allowed.includes(file.type) && !namedOk) next.cv = t.common.fileType;
      if (file.size > 5 * 1024 * 1024) next.cv = t.common.fileSize;
    }
    if (!data.get("consent")) next.consent = t.common.consent;
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  return (
    <>
      <Seo title={t.meta.careers.title} description={t.meta.careers.description} />
      <PageHero kicker={c.kicker} title={c.title} lede={c.lede} />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <section className="card px-6 py-8">
          <h2 className="font-display text-3xl text-navy">{c.noneTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{c.noneText}</p>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-3xl text-navy">{c.pathsTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.paths.map((path) => (
              <article key={path.title} className="card card-step p-5">
                <h3 className="font-medium text-navy">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{path.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="card mt-14 p-6 md:p-8">
          <h2 className="font-display text-3xl text-navy">{c.formTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{c.formLede}</p>
          <div className="mt-6">
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
                    <Label htmlFor="email">{c.email}</Label>
                    <input id="email" name="email" type="email" className="field" autoComplete="email" />
                    <ErrorText>{errors.email}</ErrorText>
                  </div>
                  <div>
                    <Label htmlFor="phone">{c.phone}</Label>
                    <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" />
                    <ErrorText>{errors.phone}</ErrorText>
                  </div>
                  <div>
                    <Label htmlFor="area">{c.area}</Label>
                    <select id="area" name="area" className="field" defaultValue="">
                      <option value="" disabled>
                        {c.areaPlaceholder}
                      </option>
                      {c.paths.map((path) => (
                        <option key={path.title} value={path.title}>
                          {path.title}
                        </option>
                      ))}
                    </select>
                    <ErrorText>{errors.area}</ErrorText>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">{c.message}</Label>
                  <textarea id="message" name="message" rows={4} className="field" />
                  <ErrorText>{errors.message}</ErrorText>
                </div>
                <div>
                  <Label htmlFor="cv">{c.cv}</Label>
                  <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf" className="block text-sm" />
                  <p className="mt-1 text-xs text-muted">{c.cvHelp}</p>
                  <ErrorText>{errors.cv}</ErrorText>
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
        </section>
      </div>
    </>
  );
}
