import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthModal from "./AuthModal";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import type { Language } from "@/i18n";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const MENU_LINKS_EN = [
  { path: "/horoscope", label: "Horoscope" },
  { path: "/talk-to-astra", label: "Talk to Astra" },
  { path: "/about", label: "About Astrology" },
  { path: "/tarot", label: "Tarot" },
  { path: "/numerology", label: "Numerology" },
  { path: "/dreams", label: "Dream interpretation" },
  { path: "/chinese-horoscope", label: "Chinese horoscope" },
  { path: "/astrology-houses", label: "About Astrology Houses" },
  { path: "/planets", label: "Planets" },
  { path: "/palm-analysis", label: "Palm analysis" },
  { path: "/astrology", label: "Birth chart reading" },
  { path: "/downloads", label: "Downloads" },
  { path: "/about-us", label: "About Us" },
];

const MENU_LINKS_ES = [
  { path: "/horoscope", label: "Horóscopo" },
  { path: "/talk-to-astra", label: "Hablar con Astra" },
  { path: "/about", label: "Sobre Astrología" },
  { path: "/tarot", label: "Tarot" },
  { path: "/numerology", label: "Numerología" },
  { path: "/dreams", label: "Interpretación de Sueños" },
  { path: "/chinese-horoscope", label: "Horóscopo Chino" },
  { path: "/astrology-houses", label: "Casas Astrológicas" },
  { path: "/planets", label: "Planetas" },
  { path: "/palm-analysis", label: "Análisis de Palma" },
  { path: "/astrology", label: "Lectura de Carta Natal" },
  { path: "/downloads", label: "Descargas" },
  { path: "/about-us", label: "Sobre Nosotros" },
];

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="57.571"
    height="35.98"
    viewBox="0 0 57.571 35.98"
    className="cosmic-back-arrow-svg"
    aria-hidden
  >
    <path
      d="M1.06,111.472,15.453,97.079a3.6,3.6,0,1,1,5.088,5.088L12.3,110.415H53.98a3.6,3.6,0,1,1,0,7.2H12.3l8.251,8.251a3.6,3.6,0,0,1-5.088,5.088L1.066,116.558A3.589,3.589,0,0,1,1.06,111.472Z"
      transform="translate(-0.007 -96.025)"
      fill="#fff"
    />
  </svg>
);

const HamburgerIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M4 8h24M4 16h24M4 24h24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const MENU_LINKS = language === "es" ? MENU_LINKS_ES : MENU_LINKS_EN;
  const showBack = location.pathname !== "/" && !drawerOpen;

  /** Cosmic Astro: nested → parent section; section pages → home. */
  const handleBack = () => {
    const path = location.pathname;
    if (path.startsWith("/horoscope/")) {
      navigate("/horoscope");
      return;
    }
    if (path.startsWith("/numerology/")) {
      navigate("/numerology");
      return;
    }
    if (path.startsWith("/chinese-horoscope/")) {
      navigate("/chinese-horoscope");
      return;
    }
    if (path.startsWith("/planets/")) {
      navigate("/planets");
      return;
    }
    navigate("/");
  };

  const isActive = (path: string) => {
    if (path === "/horoscope") return location.pathname.startsWith("/horoscope");
    if (path === "/numerology") return location.pathname.startsWith("/numerology");
    if (path === "/chinese-horoscope")
      return location.pathname.startsWith("/chinese-horoscope");
    if (path === "/planets") return location.pathname.startsWith("/planets");
    return location.pathname === path;
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const handler = () => setIsAuthModalOpen(true);
    window.addEventListener("open-auth-modal", handler);
    return () => window.removeEventListener("open-auth-modal", handler);
  }, []);

  return (
    <>
      <header className="relative z-50 safe-area-top">
        <div className="container mx-auto px-4 pt-2 pb-1">
          <div className="relative flex items-center justify-center min-h-[56px]">
            {showBack && (
              <button
                type="button"
                onClick={handleBack}
                className="cosmic-back-arrow"
                aria-label="Go back"
              >
                <BackArrowIcon />
              </button>
            )}

            {!drawerOpen && (
              <Link
                to="/"
                className="relative z-10 mx-auto inline-flex max-w-[150px] shrink-0"
              >
                <img
                  src={BRAND.LOGO}
                  alt={BRAND.NAME}
                  className="h-auto w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </Link>
            )}

            {/* Language dropdown — visible in header when drawer is closed */}
            {!drawerOpen && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
                <Globe className="pointer-events-none absolute left-2 h-3.5 w-3.5 text-amber-300" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="h-8 appearance-none rounded-lg border border-orange-500/30 bg-orange-500/10 pl-6 pr-2 text-[11px] font-medium text-amber-300 transition-all hover:bg-orange-500/20 focus:outline-none cursor-pointer"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-[#1F2628] text-white">
                      {l.flag} {l.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={() => setDrawerOpen((o) => !o)}
              className={cn(
                "z-[60] rounded-md p-2 text-white hover:opacity-90",
                drawerOpen
                  ? "fixed right-3 top-2"
                  : "absolute right-0 top-1/2 -translate-y-1/2"
              )}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
            >
              <HamburgerIcon open={drawerOpen} />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div
          className="cosmic-nav-drawer fixed inset-0 z-[55] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="cosmic-nav-drawer-bg absolute inset-0" aria-hidden />
          <div className="cosmic-nav-drawer-stars absolute inset-0 pointer-events-none" aria-hidden />
          <div className="cosmic-nav-drawer-clouds absolute inset-0 pointer-events-none" aria-hidden />

          <div className="relative z-10 flex min-h-full flex-col pb-16 pt-2">
            <div className="mx-auto mb-8 w-full max-w-[150px] px-4 pt-2">
              <Link to="/" onClick={() => setDrawerOpen(false)}>
                <img
                  src={BRAND.LOGO}
                  alt={BRAND.NAME}
                  className="mx-auto w-full object-contain"
                />
              </Link>
            </div>

            {/* Language switcher inside drawer */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                    language === l.code
                      ? "border-amber-400/70 bg-amber-400/20 text-amber-300"
                      : "border-white/20 bg-white/5 text-white/60 hover:border-amber-400/40 hover:text-white/90"
                  )}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            <nav className="relative z-10 flex flex-1 flex-col items-center px-4 text-center">
              {MENU_LINKS.map((item) => (
                <Link
                  key={`${item.label}-${item.path}`}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={cn(
                    "cosmic-menu-btn",
                    isActive(item.path) && "is-active"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/my-account"
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      "cosmic-menu-btn",
                      location.pathname === "/my-account" && "is-active"
                    )}
                  >
                    {language === "es" ? "Mi Cuenta" : "My Account"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setDrawerOpen(false);
                    }}
                    className="cosmic-menu-btn"
                  >
                    {language === "es" ? "Cerrar Sesión" : "Logout"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="cosmic-menu-btn"
                >
                  {language === "es" ? "Iniciar Sesión" : "Login"}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
