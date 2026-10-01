import { Building2, MapPin, Phone, Mail } from "lucide-react";
import { LegalPage, LegalIntro, LegalSection, LegalList } from "@/components/LegalPage";
import { BRAND } from "@/lib/brand";

const AboutUs = () => (
  <LegalPage title="About Us" subtitle={`Welcome — ${BRAND.TAGLINE}`}>
    <LegalIntro>
      <p>
        At {BRAND.COMPANY}, we believe that astrology guidance should be accessible, reliable, and
        easy to experience from anywhere. Our platform is designed to connect users with
        astrology-based insights, numerology guidance, horoscope readings, kundli-related support,
        and personalised consultation services through a simple digital experience.
      </p>
      <p>
        The platform offers astrology-focused services that help users seek guidance related to
        career, finance, relationships, marriage, health, education, family concerns, daily life
        decisions, and personal growth. Whether a user is looking for quick guidance or a detailed
        consultation, the platform provides a convenient way to explore astrological advice at
        their own pace.
      </p>
      <p>
        As an online astrology consultation service, our aim is to bridge the gap between traditional
        astrology guidance and today&apos;s digital lifestyle. Users can access astrology support
        without fixed schedules, unnecessary waiting, or location barriers — just convenient
        guidance whenever they need it.
      </p>
    </LegalIntro>

    <LegalSection title="Our Mission">
      <p>
        To make astrology guidance simple, affordable, and accessible for everyone by offering a
        digital platform where users can explore horoscope insights, numerology, kundli support,
        and expert-led consultation services in a secure and user-friendly manner.
      </p>
      <p className="mt-3">
        Join the platform today — and let us help you understand, explore, and move forward with
        more clarity.
      </p>
    </LegalSection>

    <LegalSection title="Platform Highlights">
      <LegalList
        items={[
          "Chat and consultation support",
          "Astrology guidance at your convenience",
          "Kundli, horoscope, numerology, and palmistry-related services",
          "User-friendly digital experience",
          "Secure access to astrology-based insights",
        ]}
      />
    </LegalSection>

    <LegalSection title="Company Details">
      <div className="space-y-4">
        {[
          { icon: Building2, label: "Registered Name", value: BRAND.COMPANY },
          { icon: MapPin, label: "Address", value: BRAND.CONTACT.ADDRESS },
          {
            icon: Phone,
            label: "Phone",
            value: BRAND.CONTACT.PHONE_DISPLAY,
            href: `tel:+91${BRAND.CONTACT.PHONE}`,
          },
          {
            icon: Mail,
            label: "Email",
            value: BRAND.CONTACT.EMAIL,
            href: `mailto:${BRAND.CONTACT.EMAIL}`,
          },
        ].map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-violet-200/45 text-xs uppercase tracking-widest mb-0.5">{label}</p>
              {href ? (
                <a
                  href={href}
                  className="text-violet-100 text-sm font-medium hover:text-amber-300 transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="text-violet-100 text-sm font-medium">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </LegalSection>
  </LegalPage>
);

export default AboutUs;
