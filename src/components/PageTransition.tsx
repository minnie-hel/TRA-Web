import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const id = window.requestAnimationFrame(() => setShow(true));
    return () => window.cancelAnimationFrame(id);
  }, [location.pathname, location.search]);

  return <div className={`page-enter ${show ? "page-enter--active" : ""}`}>{children}</div>;
}
