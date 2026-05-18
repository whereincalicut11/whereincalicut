import { Mail, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <Link 
              to="/" 
              onClick={handleScrollToTop}
              className="flex items-center gap-2 font-heading text-lg font-bold text-white tracking-tight"
            >
              <img
                src="https://kommodo.ai/i/JZfaLV7xOIijc8m7j46n"
                alt="WhereInCalicut Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              WhereInCalicut is a premium, verified accommodation search portal designed specifically for students and IT professionals moving to Kozhikode. Direct owner listings and zero brokerage markup.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="#stays" className="hover:text-primary-400 transition-colors">Browse Stays</a>
              <a href="#about" className="hover:text-primary-400 transition-colors">About Us</a>
              <a href="#services" className="hover:text-primary-400 transition-colors">Services</a>
              <a href="#contact" className="hover:text-primary-400 transition-colors">Get Help</a>
            </div>
          </div>

          {/* Support Info */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Support Hours</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-500">
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>support@whereincalicut.com</span>
              </p>
              <p className="flex items-center gap-2 mt-1">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">100% Escrow Protection</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} WhereInCalicut. All rights reserved. Made with love for Calicut co-living.
          </p>
          <div className="flex gap-4 text-[10px] text-slate-500">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
