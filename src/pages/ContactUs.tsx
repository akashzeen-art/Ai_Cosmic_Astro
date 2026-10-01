import { Link } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Phone, Mail, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { LegalSection } from "@/components/LegalPage";
import { BRAND } from "@/lib/brand";

const ContactUs = () => (
  <Layout>
    <div className="max-w-3xl mx-auto grahveda-page">
      <Link to="/" className="inline-flex items-center gap-2 grahveda-link mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="glass-card rounded-2xl border border-violet-500/25 p-6 md:p-8 mb-6">
        <h1 className="font-display text-3xl font-bold text-slate-50 mb-2">Contact Us</h1>
        <p className="text-violet-100/65 text-sm">
          We&apos;d love to hear from you. Feel free to reach out to {BRAND.COMPANY}.
        </p>
      </div>

      <LegalSection title="Get In Touch">
        <div className="space-y-5">
          {[
            { icon: Building2, label: "Company", value: BRAND.COMPANY },
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
            <div key={label} className={`flex items-${label === "Address" ? "start" : "center"} gap-4`}>
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
                  <p className="text-violet-100 text-sm">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </LegalSection>

      <div className="glass-card rounded-xl border border-violet-500/15 p-6 my-4">
        <a
          href={`mailto:${BRAND.CONTACT.EMAIL}`}
          className="w-full grahveda-btn-primary py-3 rounded-xl font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" /> Send Us a Message
        </a>
      </div>

      <div className="glass-card rounded-xl border border-amber-400/20 p-5 flex items-start gap-3">
        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-violet-100/70 text-sm">
          Need faster support? Email us at{" "}
          <a href={`mailto:${BRAND.CONTACT.EMAIL}`} className="text-amber-400 hover:underline">
            {BRAND.CONTACT.EMAIL}
          </a>{" "}
          or call{" "}
          <a href={`tel:+91${BRAND.CONTACT.PHONE}`} className="text-amber-400 hover:underline">
            {BRAND.CONTACT.PHONE_DISPLAY}
          </a>{" "}
          for the quickest response.
        </p>
      </div>
    </div>
  </Layout>
);

export default ContactUs;
