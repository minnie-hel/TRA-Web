import { Link, Outlet } from "react-router-dom";
import { publicUrl } from "../lib/publicUrl";
import { useI18n } from "../i18n/LanguageContext";

export function AdminFrame() {
  const { t } = useI18n();

  return (
    <div className="min-h-svh bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" aria-label={t.meta.home.title}>
            <img src={publicUrl("/brand/logo.png")} alt="" className="h-12 w-auto" />
          </Link>
          <p className="text-sm font-medium text-navy">{t.admin.loginTitle}</p>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
