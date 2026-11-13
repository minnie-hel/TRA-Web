import { Link } from "react-router-dom";
import { publicUrl } from "../lib/publicUrl";
import { useI18n } from "../i18n/LanguageContext";

const explore = [
  { to: "/", key: "home" },
  { to: "/services", key: "services" },
  { to: "/projects", key: "projects" },
  { to: "/news", key: "news" },
  { to: "/contact", key: "contact" },
] as const;

const company = [
  { to: "/about", key: "about" },
  { to: "/impact", key: "impact" },
  { to: "/sustainability", key: "sustainability" },
  { to: "/careers", key: "careers" },
] as const;

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-gold bg-navy-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={publicUrl("/brand/logo-mark.png")} alt="" className="h-12 w-12 shrink-0" />
            <span className="leading-tight">
              <span className="block text-lg font-semibold">Envision Strategies</span>
              <span className="block text-sm text-white/70">Company Limited</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{t.footer.office}</p>
          <Link
            to="/contact?topic=partnership"
            className="mt-6 inline-block bg-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-deep"
          >
            {t.nav.partner}
          </Link>
        </div>

        <nav aria-label={t.footer.explore}>
          <h2 className="text-sm font-semibold text-gold">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((link) => (
              <li key={link.to}>
                <Link className="text-white/85 hover:text-gold" to={link.to}>
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.company}>
          <h2 className="text-sm font-semibold text-gold">{t.footer.company}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {company.map((link) => (
              <li key={link.to}>
                <Link className="text-white/85 hover:text-gold" to={link.to}>
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-white/65 md:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {t.footer.rights}
            </p>
            <p className="flex gap-5">
              <Link className="hover:text-gold" to="/privacy">
                {t.footer.privacy}
              </Link>
              <Link className="hover:text-gold" to="/terms">
                {t.footer.terms}
              </Link>
            </p>
          </div>
          <p className="max-w-3xl leading-relaxed">{t.footer.notPortal}</p>
        </div>
      </div>
    </footer>
  );
}
