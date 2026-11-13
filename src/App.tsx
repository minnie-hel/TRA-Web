import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminFrame } from "./components/AdminFrame";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AboutPage } from "./pages/AboutPage";
import { AdminEditPage, AdminListPage, AdminLoginPage } from "./pages/AdminPages";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ImpactPage } from "./pages/ImpactPage";
import { LegalPage } from "./pages/LegalPage";
import { NewsArticlePage } from "./pages/NewsArticlePage";
import { NewsPage } from "./pages/NewsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { RevenuePage } from "./pages/RevenuePage";
import { SanitationPage } from "./pages/SanitationPage";
import { ServicesPage } from "./pages/ServicesPage";
import { SustainabilityPage } from "./pages/SustainabilityPage";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
        <ScrollToTop />
        <Routes>
          <Route element={<AdminFrame />}>
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route path="admin" element={<AdminListPage />} />
            <Route path="admin/news/new" element={<AdminEditPage />} />
            <Route path="admin/news/:id" element={<AdminEditPage />} />
          </Route>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/revenue" element={<RevenuePage />} />
            <Route path="services/sanitation" element={<SanitationPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="impact" element={<ImpactPage />} />
            <Route path="sustainability" element={<SustainabilityPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:slug" element={<NewsArticlePage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<LegalPage kind="privacy" />} />
            <Route path="terms" element={<LegalPage kind="terms" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
