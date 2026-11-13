import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useI18n, type Lang } from "../i18n/LanguageContext";
import { publicUrl } from "../lib/publicUrl";

const links = [
  { to: "/", key: "home", end: true },
  { to: "/about", key: "about", end: false },
  { to: "/services", key: "services", end: false },
  { to: "/projects", key: "projects", end: false },
  { to: "/impact", key: "impact", end: false },
  { to: "/sustainability", key: "sustainability", end: false },
  { to: "/news", key: "news", end: false },
  { to: "/careers", key: "careers", end: false },
  { to: "/contact", key: "contact", end: false },
] as const;

const langShort: Record<Lang, string> = { en: "EN", sw: "SW" };

/** Left column width so the menu lines up under the logo. */
const leadSlot = "w-11 shrink-0 sm:w-12 lg:w-14";
/** Nudge tabs back from the prior 5cm offset. */
const tabInset = "pl-2 sm:pl-[2.5cm]";
/** Side-menu company name sits slightly further right than tabs. */
const menuNameInset = "pl-3 sm:pl-[3cm]";

function LangSwitch() {
  const { t, lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-0.5 text-sm font-semibold" role="group" aria-label={t.languages.en}>
      {(["en", "sw"] as Lang[]).map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 ? <span className="px-1 text-white/35" aria-hidden="true">|</span> : null}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`px-1 py-0.5 transition-colors ${
              lang === code ? "text-gold" : "text-white/70 hover:text-white"
            }`}
          >
            <span className="md:hidden">{langShort[code]}</span>
            <span className="hidden md:inline">{t.languages[code]}</span>
          </button>
        </span>
      ))}
    </div>
  );
}

function BrandLine({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  return (
    <p
      className={`flex min-w-0 items-center gap-2 text-xs font-bold tracking-wide uppercase sm:gap-2.5 sm:text-sm md:text-base lg:text-lg ${className}`}
    >
      <span className="min-w-0 truncate">Envision Strategies Company Limited</span>
      <span className="shrink-0 text-white/40" aria-hidden="true">
        |
      </span>
      <span className="shrink-0 font-medium tracking-normal text-gold normal-case">{t.headerBar.motto}</span>
    </p>
  );
}

export function Header() {
  const { t } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const partnerHref = "/contact?topic=partnership";

  return (
    <header className="sticky top-0 z-40 w-full text-white shadow-[0_2px_12px_rgba(0,0,0,0.22)]">
      <div className="w-full bg-navy">
        <div className="flex w-full items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 md:py-2.5">
          <Link to="/" className={`${leadSlot} flex items-center justify-start`} aria-label="Envision Strategies Company Limited">
            <img src={publicUrl("/brand/logo-mark.png")} alt="" className="h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
          </Link>
          <BrandLine className="min-w-0 flex-1 pl-2 sm:pl-3" />
          <div className="flex shrink-0 items-center justify-end gap-2">
            <LangSwitch />
            <Link
              to={partnerHref}
              className="inline-flex bg-green px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white hover:bg-green-deep sm:px-3 sm:py-2 sm:text-sm lg:hidden"
            >
              {t.nav.partner}
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-navy-dark">
        <div className="flex w-full items-center gap-0 px-3 sm:px-4">
          <button
            type="button"
            className={`${leadSlot} flex h-10 items-center justify-start text-white hover:text-gold lg:h-11`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.nav.close : t.nav.open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex h-3.5 w-[18px] flex-col justify-between" aria-hidden="true">
              <span className={`block h-0.5 bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-0.5 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>

          <nav className={`hidden min-w-0 flex-1 items-center overflow-x-auto ${tabInset} lg:flex`} aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-2.5 py-2 text-base whitespace-nowrap transition-colors sm:px-3 ${
                    isActive ? "font-semibold text-gold" : "text-white hover:text-gold"
                  }`
                }
              >
                {t.nav[link.key]}
              </NavLink>
            ))}
          </nav>

          <Link
            to={partnerHref}
            className="ml-auto hidden shrink-0 bg-green px-4 py-2 text-sm font-semibold whitespace-nowrap text-white hover:bg-green-deep lg:inline-flex"
          >
            {t.nav.partner}
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/50" aria-label={t.nav.close} onClick={() => setOpen(false)} />
          <nav
            id="site-menu"
            className="absolute top-0 left-0 flex h-full w-[min(100%,20rem)] flex-col bg-navy shadow-xl"
            aria-label="Primary"
          >
            <div className="flex items-start justify-between gap-2 px-4 py-4">
              <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2">
                <img src={publicUrl("/brand/logo-mark.png")} alt="" className="h-12 w-12 shrink-0" />
                <span className={`${menuNameInset} text-xs font-semibold leading-snug text-white normal-case sm:text-sm`}>
                  Envision Strategies Company Limited
                </span>
              </Link>
              <button
                type="button"
                className="grid h-9 w-9 shrink-0 place-items-center text-xl leading-none text-white/80 hover:text-white"
                aria-label={t.nav.close}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto bg-navy-dark py-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 pr-4 text-base ${tabInset} ${isActive ? "bg-white/5 font-semibold text-gold" : "text-white/90 hover:bg-white/5"}`
                  }
                >
                  {t.nav[link.key]}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-dark px-4 py-3">
              <LangSwitch />
              <Link
                to={partnerHref}
                onClick={() => setOpen(false)}
                className="bg-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-deep"
              >
                {t.nav.partner}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
