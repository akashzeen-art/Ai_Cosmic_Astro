import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const HOUSES_EN = [
  { house: "1st house", theme: "Self-Image", ruler: "Aries" },
  { house: "2nd house", theme: "Self-Worth and Money", ruler: "Taurus" },
  { house: "3rd house", theme: "Communication", ruler: "Gemini" },
  { house: "4th house", theme: "Family, Home, Roots, Security", ruler: "Cancer" },
  { house: "5th house", theme: "Self-Expression, Creativity, Pleasure, Romance", ruler: "Leo" },
  { house: "6th house", theme: "Work, Health", ruler: "Virgo" },
  { house: "7th house", theme: "Partnership, Marriage", ruler: "Libra" },
  { house: "8th house", theme: "Transformation, Sexuality", ruler: "Scorpio" },
  { house: "9th house", theme: "Belief Systems, Higher Learning", ruler: "Sagittarius" },
  { house: "10th house", theme: "Profession, Responsibility, Reputation", ruler: "Capricorn" },
  { house: "11th house", theme: "Aspirations, Personal Goals, Groups", ruler: "Aquarius" },
  { house: "12th house", theme: "Soul Growth, Privacy, Secrets", ruler: "Pisces" },
];

const HOUSES_ES = [
  { house: "Casa 1", theme: "Autoimagen", ruler: "Aries" },
  { house: "Casa 2", theme: "Autoestima y Dinero", ruler: "Tauro" },
  { house: "Casa 3", theme: "Comunicaci\u00f3n", ruler: "G\u00e9minis" },
  { house: "Casa 4", theme: "Familia, Hogar, Ra\u00edces, Seguridad", ruler: "C\u00e1ncer" },
  { house: "Casa 5", theme: "Autoexpresi\u00f3n, Creatividad, Placer, Romance", ruler: "Leo" },
  { house: "Casa 6", theme: "Trabajo, Salud", ruler: "Virgo" },
  { house: "Casa 7", theme: "Asociaci\u00f3n, Matrimonio", ruler: "Libra" },
  { house: "Casa 8", theme: "Transformaci\u00f3n, Sexualidad", ruler: "Escorpio" },
  { house: "Casa 9", theme: "Sistemas de Creencias, Aprendizaje Superior", ruler: "Sagitario" },
  { house: "Casa 10", theme: "Profesi\u00f3n, Responsabilidad, Reputaci\u00f3n", ruler: "Capricornio" },
  { house: "Casa 11", theme: "Aspiraciones, Metas Personales, Grupos", ruler: "Acuario" },
  { house: "Casa 12", theme: "Crecimiento del Alma, Privacidad, Secretos", ruler: "Piscis" },
];

const AstrologyHouses = () => {
  const { tr, language } = useLanguage();
  const HOUSES = language === "es" ? HOUSES_ES : HOUSES_EN;

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-5xl px-4">
          <h1 className="cosmic-horoscope-title mb-6 sm:mb-10">{tr.ui.housesTitle}</h1>

          <div className="space-y-10 sm:space-y-14 md:space-y-16">
            <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14">
              <div className="order-2 text-center sm:order-1">
                <img src="/horoscope/virgo.png" alt="" className="cosmic-about-image mx-auto" draggable={false} />
              </div>
              <div className="order-1 flex flex-col sm:order-2">
                <h2 className="cosmic-subtitle">{tr.ui.housesAboutTitle}</h2>
                <div className="cosmic-basic-text mt-3 space-y-4">
                  <p>{tr.ui.housesAboutP1}</p>
                  <p>{tr.ui.housesAboutP2}</p>
                </div>
              </div>
            </div>

            <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14">
              <div className="order-1 flex flex-col">
                <h2 className="cosmic-subtitle">{tr.ui.housesRoadmapTitle}</h2>
                <div className="cosmic-basic-text mt-3 space-y-4">
                  <p>{tr.ui.housesRoadmapP1}</p>
                  <p>{tr.ui.housesRoadmapP2}</p>
                  <p className="font-medium text-[#AB8D60]">{tr.ui.housesOverview}</p>
                  <ul className="cosmic-house-list">
                    {HOUSES.map((h) => (
                      <li key={h.house}>
                        <strong>{h.house}:</strong> {h.theme} ({h.ruler})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="order-2 text-center">
                <img src="/horoscope/gemini.png" alt="" className="cosmic-about-image mx-auto" draggable={false} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AstrologyHouses;
