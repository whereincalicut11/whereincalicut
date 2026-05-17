import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Stays', path: '/#stays' },
    { name: 'About Us', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    if (path.includes('#')) {
      const elementId = path.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 glass shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-primary-600 sm:text-2xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white shadow-md shadow-primary-500/20">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
            WhereIn<span className="font-extrabold text-slate-800">Calicut</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isHash = link.path.includes('#');
            const isActive = isHash 
              ? location.hash === link.path.substring(1) 
              : location.pathname === link.path && !location.hash;

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-medium transition-colors hover:text-primary-600 py-2 ${
                  isActive ? 'text-primary-600 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Call to Action Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 min-h-[44px]"
          >
            <Phone className="h-4 w-4 text-primary-500" />
            <span>Call Helpline</span>
          </a>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-100 bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1.5 px-4 py-4 sm:px-6">
              {navLinks.map((link) => {
                const isHash = link.path.includes('#');
                const isActive = isHash 
                  ? location.hash === link.path.substring(1) 
                  : location.pathname === link.path && !location.hash;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors min-h-[44px] ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="tel:+919876543210"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-3 font-medium text-white shadow-md shadow-primary-500/10 min-h-[44px]"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Helpline</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
