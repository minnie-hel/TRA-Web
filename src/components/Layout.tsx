import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageTransition } from "./PageTransition";

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-green-deep focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
