import { useState, type FormEvent } from "react";
import { mainlandRegions } from "../data/regions";
import { ErrorText, FormNote, Label, SuccessPanel, isEmail } from "../components/forms";
import { PageHero } from "../components/PageHero";
import { Seo } from "../components/Seo";
import { useI18n } from "../i18n/LanguageContext";

type Errors = Partial<Record<"type" | "region" | "place" | "details" | "email" | "photo" | "consent", string>>;

export function SustainabilityPage() {
  const { t } = useI18n();
  const s = t.sustainability;
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!data.get("type")) next.type = t.common.required;
    if (!data.get("region")) next.region = t.common.required;
    if (!String(data.get("place") || "").trim()) next.place = t.common.required;
    if (!String(data.get("details") || "").trim()) next.details = t.common.required;
    const email = String(data.get("email") || "").trim();
    if (email && !isEmail(email)) next.email = t.common.email;
    const file = data.get("photo");
    if (file instanceof File && file.size > 0) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) next.photo = t.common.imageType;
      if (file.size > 5 * 1024 * 1024) next.photo = t.common.fileSize;
    }
    if (!data.get("consent")) next.consent = t.common.consent;
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  return (
    <>
      <Seo title={t.meta.sustainability.title} description={t.meta.sustainability.description} />
      <PageHero kicker={s.kicker} title={s.title} lede={s.lede} />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {s.points.map((point) => (
            <li key={point.title} className="card p-5">
              <h2 className="font-medium text-navy">{point.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
            </li>
          ))}
        </ul>

        <section id="report" className="card mt-16 scroll-mt-32 p-6 md:p-8">
          <p className="text-xs tracking-[0.18em] text-green-deep uppercase">{s.reportKicker}</p>
          <h2 className="mt-3 font-display text-3xl text-navy">{s.reportTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{s.reportLede}</p>
          <div className="mt-6">
            {done ? (
              <SuccessPanel
                title={t.common.successTitle}
                body={t.common.successBody}
                again={t.common.another}
                onAgain={() => setDone(false)}
              />
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-2 grid gap-5">
                <FormNote>{t.common.formNote}</FormNote>
                <div>
                  <Label htmlFor="type">{s.concernType}</Label>
                  <select id="type" name="type" className="field" defaultValue="">
                    <option value="" disabled>
                      {s.concernType}
                    </option>
                    {s.concerns.map((concern) => (
                      <option key={concern.value} value={concern.value}>
                        {concern.label}
                      </option>
                    ))}
                  </select>
                  <ErrorText>{errors.type}</ErrorText>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <Label htmlFor="region">{s.region}</Label>
                    <select id="region" name="region" className="field" defaultValue="">
                      <option value="" disabled>
                        {s.region}
                      </option>
                      {mainlandRegions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    <ErrorText>{errors.region}</ErrorText>
                  </div>
                  <div>
                    <Label htmlFor="place">{s.place}</Label>
                    <input id="place" name="place" className="field" />
                    <ErrorText>{errors.place}</ErrorText>
                  </div>
                </div>
                <div>
                  <Label htmlFor="details">{s.details}</Label>
                  <textarea id="details" name="details" rows={5} className="field" />
                  <ErrorText>{errors.details}</ErrorText>
                </div>
                <div>
                  <Label htmlFor="photo">{s.photo}</Label>
                  <input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="block text-sm" />
                  <p className="mt-1 text-xs text-muted">{s.photoHelp}</p>
                  <ErrorText>{errors.photo}</ErrorText>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <Label htmlFor="name">{s.name}</Label>
                    <input id="name" name="name" className="field" autoComplete="name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">{s.phone}</Label>
                    <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" />
                  </div>
                  <div>
                    <Label htmlFor="email">{s.email}</Label>
                    <input id="email" name="email" type="email" className="field" autoComplete="email" />
                    <ErrorText>{errors.email}</ErrorText>
                  </div>
                </div>
                <div>
                  <label className="flex items-start gap-3 text-sm leading-relaxed">
                    <input name="consent" type="checkbox" className="mt-1" />
                    <span>{t.common.privacyCheck}</span>
                  </label>
                  <ErrorText>{errors.consent}</ErrorText>
                </div>
                <button type="submit" className="w-fit bg-navy px-5 py-3 text-sm font-medium text-white hover:bg-navy-deep">
                  {s.send}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
