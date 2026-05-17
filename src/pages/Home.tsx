import { useState, useMemo } from 'react';
import { Shield, Sparkles, Phone, Mail, MapPin, Send, HelpCircle } from 'lucide-react';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import StayCard from '../components/StayCard';
import { STAYS_DATA } from '../data/stays';

export default function Home() {
  // Search and filter states
  const [filters, setFilters] = useState({
    location: '',
    gender: '',
    type: '',
  });

  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleFilterChange = (key: 'location' | 'gender' | 'type', value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1);
    // Scroll to stays section smoothly
    const staysSection = document.getElementById('stays');
    if (staysSection) {
      staysSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter items reactively
  const filteredStays = useMemo(() => {
    return STAYS_DATA.filter((stay) => {
      // Location match
      if (filters.location && !stay.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      // Gender preference match
      if (filters.gender && stay.gender !== 'Any' && stay.gender !== filters.gender) {
        return false;
      }
      // Property type match
      if (filters.type && stay.type !== filters.type) {
        return false;
      }
      return true;
    });
  }, [filters, searchTrigger]); // Reactively updates on changes

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <Hero />

      {/* Search Filters Section */}
      <SearchFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onSearch={handleSearch} 
      />

      {/* Stays Section */}
      <main id="stays" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            Accommodation Hub
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Explore Available Accommodations
          </h2>
          <p className="max-w-2xl text-slate-500 text-sm sm:text-base">
            Showing {filteredStays.length} verified listings in Calicut. Adjust the filters above to find exactly what fits your preferences.
          </p>
        </div>

        {/* Listings Grid */}
        {filteredStays.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStays.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl py-16 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-4">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-slate-800 text-lg">No Accommodations Found</h3>
            <p className="text-sm text-slate-500 max-w-md mt-1">
              We couldn't find any stays that match your active filter selections. Try changing the location, gender preference, or property type.
            </p>
            <button
              onClick={() => setFilters({ location: '', gender: '', type: '' })}
              className="mt-4 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors min-h-[44px]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Services Section */}
      <section id="services" className="bg-slate-900 text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-3 mb-16">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-primary-400">
              Our Core Offerings
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose WhereInCalicut?
            </h2>
            <p className="max-w-xl text-slate-400 text-sm">
              We solve the key challenges of finding standard, reliable accommodations in Kozhikode with a transparent and secure platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white mb-5 shadow-lg shadow-primary-600/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">Smart Stay Finder</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Filter and browse easily by location, budget, gender preference, and property type to find your match within minutes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-5 shadow-lg shadow-indigo-600/20">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No middleman or brokerage fees. Directly connect with the accommodation owners via single tap Phone calls, WhatsApp, or Email.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white mb-5 shadow-lg shadow-emerald-600/20">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">100% Verified</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every listed PG, hostel, and homestay has been physically checked for quality of food, safety protocols, and robust internet access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Image columns */}
            <div className="lg:col-span-6 relative order-last lg:order-first">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-emerald-500 to-primary-500 opacity-20 blur-xl"></div>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
                  alt="Students Co-living and sharing study space"
                  className="w-full h-[320px] object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Text columns */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                About WhereInCalicut
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Connecting Students and IT Professionals to Quality Stays
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Kozhikode has rapidly evolved into an educational and technology hub, bringing together NIT Calicut, Calicut University, and thriving IT parks like Cyberpark and UL Cyberpark. 
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our platform provides a seamless digital map of high-quality, verified co-living properties. Whether you seek budget dormitories near college gates or fully catered executive PGs near Hilite City, we simplify finding your spot with complete trust.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-bold text-slate-800 text-sm">For Students</h4>
                  <p className="text-xs text-slate-500">Walkable dorms, exam study zones, healthy pocket-friendly meals.</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h4 className="font-bold text-slate-800 text-sm">For IT Professionals</h4>
                  <p className="text-xs text-slate-500">Fast WiFi co-working zones, executive suites near workspace.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-t from-slate-100 to-white border-t border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                Contact & Support
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Have Questions? Reach Out directly!
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our responsive team is here to assist you in searching for properties or listing your own Calicut stay with us.
              </p>

              {/* Direct Touch Links */}
              <div className="space-y-4 pt-4">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow hover:bg-slate-50 transition-all min-h-[44px]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Call Support</p>
                    <p className="text-sm font-bold text-slate-800">+91 98765 43210</p>
                  </div>
                </a>

                <a
                  href="mailto:support@whereincalicut.com"
                  className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow hover:bg-slate-50 transition-all min-h-[44px]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Inquiry</p>
                    <p className="text-sm font-bold text-slate-800">support@whereincalicut.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Office Address</p>
                    <p className="text-sm font-bold text-slate-800">UL Cyberpark Road, Kozhikode, KL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
                <h3 className="font-heading text-xl font-bold text-slate-800 mb-6">Send Us a Quick Message</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10 min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      placeholder="e.g. Listing query, PG booking help"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Describe your query in detail..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/10 min-h-[100px]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-md shadow-primary-500/10 hover:from-primary-700 hover:to-indigo-700 active:scale-95 transition-all min-h-[44px]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>

                  {formSubmitted && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 mt-4 text-left text-xs font-bold text-emerald-800">
                      Message sent successfully! Our helpline team will contact you within 24 hours.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
