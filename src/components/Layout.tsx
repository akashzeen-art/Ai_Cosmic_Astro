import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BRAND } from "@/lib/brand";

const Footer = () => (
  <footer className="relative z-[1] mt-auto border-t border-white/10 bg-black/40 py-3.5 text-center text-[10px] text-white">
    <div className="container mx-auto px-4">
      <div className="mb-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-semibold tracking-wide">
        <Link to="/privacy-policy" className="text-white hover:text-[#AB8D60]">
          Privacy statement
        </Link>
        <span className="text-white/50">|</span>
        <Link to="/terms" className="text-white hover:text-[#AB8D60]">
          Cookie Policy
        </Link>
        <span className="text-white/50">|</span>
        <Link to="/about-us" className="text-white hover:text-[#AB8D60]">
          About Us
        </Link>
      </div>
      <p className="mb-0 text-white/75">
        Copyright © 2026 All rights reserved{" "}
        <Link to="/" className="font-bold text-white hover:text-[#AB8D60]">
          {BRAND.NAME}
        </Link>
      </p>
    </div>
  </footer>
);

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => (
  <div className={`relative flex min-h-screen flex-col ${className}`}>
    <Navbar />
    <main className="relative z-[1] flex flex-1 flex-col">{children}</main>
    <Footer />
  </div>
);

export { Footer };
export default Layout;
