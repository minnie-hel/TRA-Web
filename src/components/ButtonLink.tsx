import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const styles = {
  gold: "bg-green-deep px-5 py-3 text-white hover:bg-green",
  outline: "border border-white/70 px-5 py-3 text-white hover:bg-white/10",
  navy: "bg-navy px-5 py-3 text-white hover:bg-navy-deep",
  text: "text-green-deep underline decoration-green decoration-2 underline-offset-[6px] hover:text-navy",
};

export function ButtonLink({
  to,
  children,
  variant = "gold",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`btn-motion inline-flex items-center justify-center text-sm font-medium tracking-wide ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
