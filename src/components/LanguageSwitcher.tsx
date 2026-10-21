import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import type { Language } from "@/i18n";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center">
      <Globe className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-amber-300" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="h-9 appearance-none rounded-lg border border-orange-500/30 bg-orange-500/10 pl-7 pr-3 text-xs font-medium text-amber-300 transition-all duration-200 hover:bg-orange-500/20 focus:outline-none cursor-pointer"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="bg-[#1F2628] text-white">
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
