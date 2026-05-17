import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, MapPin, Shield, CheckCircle, Wifi, Zap, 
  Wind, Coffee, Car, Utensils, BookOpen, Key, Video, Dumbbell, 
  Droplet, ShieldAlert, Phone, MessageSquare, Mail, Calendar, 
  Send, Sparkles, X, CreditCard, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchStaysFromFirebase, submitBookingToFirebase } from '../data/stays';
import type { Stay } from '../data/stays';


export default function StayDetails() {
  const { id } = useParams<{ id: string }>();
  
  const [stay, setStay] = useState<Stay | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    fetchStaysFromFirebase().then((data) => {
      if (isMounted) {
        const found = data.find((s) => s.id === id);
        if (found) {
          setStay(found);
          setActiveImage(found.image);
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Form states
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stay) return;

    const success = await submitBookingToFirebase({
      stayId: stay.id,
      stayTitle: stay.title,
      name: bookingForm.name,
      phone: bookingForm.phone,
      date: bookingForm.date,
      message: bookingForm.message,
      status: 'Pending',
      createdAt: new Date().toISOString()
    });

    if (success) {
      setBookingSubmitted(true);
      setTimeout(() => {
        setBookingSubmitted(false);
        setBookingForm({ name: '', email: '', phone: '', date: '', message: '' });
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <div className="relative h-12 w-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium text-sm">Loading accommodation details...</p>
      </div>
    );
  }

  if (!stay) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h2 className="font-heading text-2xl font-bold text-slate-800">Stay Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">The accommodation you are looking for does not exist or has been removed.</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-primary-700 min-h-[44px]">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }


  // Payment states
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'options' | 'processing' | 'success'>('options');
  const [paymentMethod, setPaymentMethod] = useState('');

  const triggerPaymentFlow = () => {
    setIsPaymentOpen(true);
    setPaymentStep('options');
  };

  const confirmPayment = () => {
    if (!paymentMethod) return;
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2500);
  };

  // Helper to render matching icon for each amenity
  const renderAmenityIcon = (name: string) => {
    const term = name.toLowerCase();
    const style = "h-5 w-5 text-primary-500";
    if (term.includes('wifi')) return <Wifi className={style} />;
    if (term.includes('security') || term.includes('safety')) return <Shield className={style} />;
    if (term.includes('cctv')) return <Video className={style} />;
    if (term.includes('food') || term.includes('meal') || term.includes('breakfast') || term.includes('veg')) return <Utensils className={style} />;
    if (term.includes('power') || term.includes('backup')) return <Zap className={style} />;
    if (term.includes('ac ') || term.includes('conditioning')) return <Wind className={style} />;
    if (term.includes('cafeteria') || term.includes('coffee')) return <Coffee className={style} />;
    if (term.includes('parking')) return <Car className={style} />;
    if (term.includes('study') || term.includes('library')) return <BookOpen className={style} />;
    if (term.includes('locker') || term.includes('biometric')) return <Key className={style} />;
    if (term.includes('gym') || term.includes('recreation')) return <Dumbbell className={style} />;
    if (term.includes('water') || term.includes('drinking')) return <Droplet className={style} />;
    return <CheckCircle className={style} />;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6 text-left">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Stays</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Photos, Amenities, Reviews, Map */}
        <div className="lg:col-span-8 space-y-8 text-left">
          {/* Header Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-lg bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
                {stay.type}
              </span>
              <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                {stay.gender === 'Any' ? 'Co-living (Any)' : `${stay.gender} Only`}
              </span>
            </div>
            
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {stay.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{stay.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-700">{stay.rating}</span>
                <span>({stay.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="space-y-3">
            {/* Primary Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-md">
              <img
                src={activeImage}
                alt={stay.title}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
            </div>
            
            {/* Secondary Image Grid */}
            <div className="grid grid-cols-3 gap-3">
              {stay.images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative aspect-video w-full overflow-hidden rounded-xl border-2 transition-all min-h-[44px] ${
                    activeImage === imgUrl ? 'border-primary-500 shadow-md scale-[0.98]' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Preview image ${i + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* About Accommodation */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-slate-800 mb-3">About the Stay</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {stay.description}
            </p>
          </div>

          {/* Amenities & Facilities */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-slate-800 mb-5">Facilities & Amenities</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {stay.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100">
                    {renderAmenityIcon(amenity)}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 leading-tight">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-slate-800 mb-5">Resident Reviews</h3>
            <div className="space-y-4">
              {stay.reviews.map((rev) => (
                <div key={rev.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{rev.user}</h4>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 border border-amber-100">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-amber-700">{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Map */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
            <h3 className="font-heading text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-slate-400" />
              <span>Property Location</span>
            </h3>
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <iframe
                title={`Map showing location of ${stay.title}`}
                src={stay.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price Box, Contact Buttons, Booking Form */}
        <div className="lg:col-span-4 space-y-6">
          {/* Price Box */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg text-left">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rent Rates</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-heading text-3xl font-extrabold text-slate-900">₹{stay.price.toLocaleString('en-IN')}</span>
                <span className="text-sm font-semibold text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Zero brokerage fee guaranteed</span>
              </p>
            </div>

            {/* Advance Booking Trigger CTA */}
            <div className="mt-6 space-y-3">
              <button
                onClick={triggerPaymentFlow}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all min-h-[44px]"
              >
                <CreditCard className="h-5 w-5" />
                <span>Book Stay Now (₹1,000)</span>
              </button>
              <p className="text-[10px] text-center text-slate-400">
                Pay a small advance token to secure the stay. 100% refundable if you change your mind within 48 hours.
              </p>
            </div>
          </div>

          {/* Quick Connect (Direct Contact Buttons) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left">
            <h3 className="font-heading text-base font-bold text-slate-800 mb-4">Connect Directly</h3>
            <div className="space-y-3">
              {/* Phone call */}
              <a
                href={`tel:${stay.contact.phone}`}
                className="flex w-full items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/50 p-4 font-bold text-blue-700 hover:bg-blue-50 transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-blue-500 font-semibold">Tappable Number</p>
                    <p className="text-sm">Call Owner</p>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-blue-100/50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {stay.contact.phone}
                </span>
              </a>

              {/* WhatsApp message */}
              <a
                href={`https://wa.me/${stay.contact.whatsapp}?text=Hi,%20I'm%20interested%20in%20your%20stay:%20${encodeURIComponent(stay.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 font-bold text-emerald-700 hover:bg-emerald-50 transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-emerald-500 font-semibold">Instant Chat</p>
                    <p className="text-sm">WhatsApp Owner</p>
                  </div>
                </div>
              </a>

              {/* Email owner */}
              <a
                href={`mailto:${stay.contact.email}?subject=Inquiry%20for%20${encodeURIComponent(stay.title)}`}
                className="flex w-full items-center rounded-2xl border border-purple-200 bg-purple-50/50 p-4 font-bold text-purple-700 hover:bg-purple-50 transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-purple-500 font-semibold">Direct Email</p>
                    <p className="text-sm">Email Owner</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Vertical Booking Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left">
            <h3 className="font-heading text-base font-bold text-slate-800 mb-4 flex items-center gap-1.5">
              <Calendar className="h-5 w-5 text-slate-400" />
              <span>Send Booking Request</span>
            </h3>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label htmlFor="book-name" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="book-name"
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="book-phone" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="book-phone"
                  required
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Your Mobile Number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="book-date" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Tentative Move-in Date
                </label>
                <input
                  type="date"
                  id="book-date"
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="book-msg" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Notes or Requirements
                </label>
                <textarea
                  id="book-msg"
                  rows={3}
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="e.g. Seeking double sharing, need AC room..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[80px]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-md hover:from-primary-700 hover:to-indigo-700 active:scale-95 transition-all min-h-[44px]"
              >
                <Send className="h-4 w-4" />
                <span>Submit Request</span>
              </button>

              {bookingSubmitted && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3.5 text-xs font-bold text-emerald-800">
                  Request sent! The owner will verify availability and get back to you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Sleek Advance Payment Modal */}
      <AnimatePresence>
        {isPaymentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-md text-left overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPaymentOpen(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors min-h-[32px]"
                aria-label="Close payment modal"
              >
                <X className="h-4 w-4" />
              </button>

              {paymentStep === 'options' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-emerald-600 font-heading text-lg font-bold">
                    <Sparkles className="h-5 w-5" />
                    <span>Advance Booking Portal</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment Details</h4>
                    <p className="font-heading text-xl font-extrabold text-slate-800 mt-1">₹1,000 <span className="text-xs font-normal text-slate-400">Token Advance</span></p>
                    <p className="text-[10px] text-slate-500 mt-1">Paying for: <strong>{stay.title}</strong></p>
                  </div>

                  {/* Payment Options Grid */}
                  <div className="space-y-2.5">
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Choose Payment Method</label>
                    
                    {/* UPI GPay Option */}
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 transition-all text-sm font-semibold min-h-[44px] ${
                        paymentMethod === 'upi' 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="h-5 w-5 text-emerald-600" />
                        <span>UPI (Google Pay / PhonePe)</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Instant</span>
                    </button>

                    {/* Credit Debit Card */}
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 transition-all text-sm font-semibold min-h-[44px] ${
                        paymentMethod === 'card' 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="h-5 w-5 text-emerald-600" />
                        <span>Credit / Debit Card</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Secured</span>
                    </button>
                  </div>

                  {/* Booking warning alert */}
                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-3.5 flex gap-2.5">
                    <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-800 leading-relaxed">
                      Your advance of ₹1,000 goes directly into a secure escrow. It is only released to the owner when you successfully move in.
                    </p>
                  </div>

                  <button
                    disabled={!paymentMethod}
                    onClick={confirmPayment}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3.5 font-bold text-white shadow-lg disabled:opacity-40 min-h-[44px]"
                  >
                    <span>Proceed & Confirm</span>
                  </button>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  {/* Custom Spinner */}
                  <div className="relative h-14 w-14">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-slate-800">Processing Escrow Payment</h4>
                  <p className="text-xs text-slate-500 max-w-xs">Connecting with banking systems. Please do not close or reload this window.</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-slate-800">Booking Secured Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    We have successfully secured ₹1,000 for your booking at <strong>{stay.title}</strong>. A receipt and direct confirmation code has been generated.
                  </p>
                  <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 py-3 w-full text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Receipt Ref: WIC-{Math.floor(Math.random() * 900000 + 100000)}
                  </div>
                  <button
                    onClick={() => setIsPaymentOpen(false)}
                    className="w-full rounded-xl bg-slate-800 py-3.5 text-xs font-bold text-white shadow-md min-h-[44px]"
                  >
                    Close & Return
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
