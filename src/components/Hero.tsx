import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const handleScrollToStays = () => {
    const staysSection = document.getElementById('stays');
    if (staysSection) {
      staysSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-slate-50 to-slate-100 py-16 sm:py-24">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] sm:left-1/3">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-indigo-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-100/80 px-3 py-1 text-xs font-semibold text-primary-700 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Calicut's Best Accommodation Finder</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
            >
              Find Your Perfect{' '}
              <span className="block mt-1 bg-gradient-to-r from-primary-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Home Away From Home
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl text-base text-slate-600 sm:text-lg md:text-xl font-normal leading-relaxed"
            >
              Discover premium PG accommodations, secure student hostels, shared dormitories, and scenic beach homestays in Kozhikode. Direct owner contact, verified listings, and zero middleman markup.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <button
                onClick={handleScrollToStays}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-primary-600/25 hover:from-primary-700 hover:to-indigo-700 active:scale-95 transition-all min-h-[44px]"
              >
                <Search className="h-5 w-5" />
                <span>Browse Stays</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleScrollToAbout}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-95 transition-all min-h-[44px]"
              >
                <span>Learn More</span>
              </button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80"
            >
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-600">50+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Verified Stays</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-600">1.2k+</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Happy Residents</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-600">0%</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Brokerage Fees</p>
              </div>
            </motion.div>
          </div>

          {/* Premium Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
              {/* Decorative behind card */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-primary-600 to-indigo-500 opacity-20 blur-xl"></div>
              
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Co-living Room"
                  className="w-full h-[320px] sm:h-[380px] object-cover rounded-2xl"
                />
                
                {/* Floating details badge */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 backdrop-blur-md p-4 border border-white/20 shadow-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-sm">Premium Co-living Spaces</h3>
                    <p className="text-xs text-slate-500">Near Cyberpark & NIT Calicut</p>
                  </div>
                  <div className="bg-primary-600 text-white rounded-lg px-2 py-1 text-xs font-bold">
                    From ₹3,500/mo
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
