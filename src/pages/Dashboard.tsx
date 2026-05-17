import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, LayoutDashboard, Plus, Edit2, Trash2, Mail, 
  MapPin, LogOut, ArrowRight, HelpCircle, Eye, 
  X, Check, AlertCircle, RefreshCw, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fetchStaysFromFirebase, addStayToFirebase, 
  updateStayInFirebase, deleteStayFromFirebase, 
  fetchInquiriesFromFirebase, fetchBookingsFromFirebase,
  uploadImageToFirebase
} from '../data/stays';
import type { Stay } from '../data/stays';

export default function Dashboard() {
  const navigate = useNavigate();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [stays, setStays] = useState<Stay[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'cms' | 'inquiries'>('cms');
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStay, setEditingStay] = useState<Stay | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  // Image Upload States
  const [uploadingPrimary, setUploadingPrimary] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState([false, false, false]);

  // Handle primary thumbnail image upload
  const handlePrimaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPrimary(true);
    try {
      const url = await uploadImageToFirebase(file);
      setStayForm(prev => ({ ...prev, image: url }));
    } catch (error) {
      console.error('Error uploading primary image:', error);
    } finally {
      setUploadingPrimary(false);
    }
  };

  // Handle gallery image upload for specific index
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingGallery(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
    try {
      const url = await uploadImageToFirebase(file);
      setStayForm(prev => {
        const updatedImages = [...prev.images];
        updatedImages[index] = url;
        return { ...prev, images: updatedImages };
      });
    } catch (error) {
      console.error(`Error uploading gallery image at slot ${index + 1}:`, error);
    } finally {
      setUploadingGallery(prev => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    }
  };

  // Form Fields for Add/Edit Stay
  const [stayForm, setStayForm] = useState({
    title: '',
    type: 'PG' as Stay['type'],
    gender: 'Any' as Stay['gender'],
    price: 4500,
    rating: 4.8,
    reviewsCount: 15,
    location: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: 'High-Speed Wi-Fi, CCTV Security, AC Rooms, Daily Meals, Power Backup, Laundry, Biometric Lock',
    phone: '',
    whatsapp: '',
    email: '',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.7845620172583!2d75.83602127590494!3d11.277395049811226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b6300000001%3A0xc3fa9ad3e8b0fb60!2sUL%20Cyberpark!5e0!3m2!1sen!2sin!4v1715945561332!5m2!1sen!2sin'
  });

  // Verify Session on Mount
  useEffect(() => {
    const adminSession = sessionStorage.getItem('wic_admin_auth');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
      loadDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch all CMS data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const allStays = await fetchStaysFromFirebase();
      const allInquiries = await fetchInquiriesFromFirebase();
      const allBookings = await fetchBookingsFromFirebase();

      // Combine both sources
      const combinedInquiries = [
        ...allInquiries.map((inq: any) => ({
          ...inq,
          type: 'General',
          badgeText: inq.subject || 'General Inquiry'
        })),
        ...allBookings.map((b: any) => ({
          id: b.id,
          name: b.name,
          email: b.phone ? `Phone: ${b.phone}` : 'No phone provided',
          subject: `Booking Request`,
          message: `Interested in: ${b.stayTitle || 'Hostel/PG'}\nTentative Move-in: ${b.date || 'Not specified'}\n\nClient notes:\n"${b.message || 'None'}"`,
          createdAt: b.createdAt || new Date().toISOString(),
          type: 'Booking',
          badgeText: `Booking Request: ${b.stayTitle || 'Stay'}`
        }))
      ];

      // Sort by createdAt descending
      combinedInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setStays(allStays);
      setInquiries(combinedInquiries);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@whereincalicut.com' && loginForm.password === 'CalicutAdmin2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('wic_admin_auth', 'true');
      setLoginError('');
      loadDashboardData();
    } else {
      setLoginError('Invalid admin email or password.');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wic_admin_auth');
  };

  // Add Stay Button Trigger
  const triggerAddStay = () => {
    setEditingStay(null);
    setStayForm({
      title: '',
      type: 'PG',
      gender: 'Any',
      price: 5000,
      rating: 4.7,
      reviewsCount: 12,
      location: 'Kozhikode, ',
      description: '',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: 'High-Speed Wi-Fi, CCTV Security, AC Rooms, Daily Meals, Power Backup, Laundry, Biometric Lock',
      phone: '+91 ',
      whatsapp: '+91 ',
      email: '',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.7845620172583!2d75.83602127590494!3d11.277395049811226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b6300000001%3A0xc3fa9ad3e8b0fb60!2sUL%20Cyberpark!5e0!3m2!1sen!2sin!4v1715945561332!5m2!1sen!2sin'
    });
    setIsFormModalOpen(true);
  };

  // Edit Stay Button Trigger
  const triggerEditStay = (stay: Stay) => {
    setEditingStay(stay);
    setStayForm({
      title: stay.title,
      type: stay.type,
      gender: stay.gender,
      price: stay.price,
      rating: stay.rating,
      reviewsCount: stay.reviewsCount,
      location: stay.location,
      description: stay.description,
      image: stay.image,
      images: stay.images,
      amenities: stay.amenities.join(', '),
      phone: stay.contact.phone,
      whatsapp: stay.contact.whatsapp,
      email: stay.contact.email,
      mapUrl: stay.mapUrl
    });
    setIsFormModalOpen(true);
  };

  // Form Submit Handler (Create or Update)
  const handleStayFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formattedStay: Stay = {
      id: editingStay ? editingStay.id : `stay-${Date.now()}`,
      title: stayForm.title,
      type: stayForm.type,
      gender: stayForm.gender,
      price: Number(stayForm.price),
      rating: Number(stayForm.rating),
      reviewsCount: Number(stayForm.reviewsCount),
      location: stayForm.location,
      description: stayForm.description,
      image: stayForm.image,
      images: stayForm.images,
      amenities: stayForm.amenities.split(',').map(a => a.trim()).filter(Boolean),
      contact: {
        phone: stayForm.phone,
        whatsapp: stayForm.whatsapp,
        email: stayForm.email
      },
      mapUrl: stayForm.mapUrl,
      reviews: editingStay ? editingStay.reviews : [
        { id: '1', user: 'Resident Admin', rating: 5, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), comment: 'Very clean rooms and safe neighborhood.' }
      ]
    };

    let success = false;
    if (editingStay) {
      success = await updateStayInFirebase(editingStay.id, formattedStay);
    } else {
      success = await addStayToFirebase(formattedStay);
    }

    if (success) {
      setIsFormModalOpen(false);
      loadDashboardData();
    } else {
      alert('Failed to save stay details. Check console or connection.');
      setLoading(false);
    }
  };

  // Delete Stay Handler
  const handleDeleteStay = async (stayId: string) => {
    if (window.confirm('Are you absolutely sure you want to delete this listing? This action is permanent.')) {
      setLoading(true);
      const success = await deleteStayFromFirebase(stayId);
      if (success) {
        loadDashboardData();
      } else {
        alert('Failed to delete stay listing.');
        setLoading(false);
      }
    }
  };

  // Render Login Portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Backdrop Blobs */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl animate-pulse delay-700"></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center px-4">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 text-xs mb-6 transition-colors"
          >
            <span>&larr; Return to Homepage</span>
          </button>
          
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white shadow-xl mx-auto mb-4">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-white tracking-tight">
            Admin Console
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Secure portal for WhereInCalicut management
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
            <form onSubmit={handleLoginSubmit} className="space-y-6 text-left">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Admin Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@whereincalicut.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Secure Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 min-h-[44px]"
                />
              </div>

              {loginError && (
                <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 flex gap-2 text-rose-400 text-xs font-semibold items-center">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-3 font-bold text-white shadow-lg hover:from-primary-700 hover:to-indigo-700 active:scale-[0.98] transition-all min-h-[44px]"
              >
                <span>Authorize & Login</span>
              </button>
            </form>
            
            <div className="mt-6 border-t border-slate-800 pt-6 text-center">
              <p className="text-[10px] text-slate-500 leading-normal">
                This console uses Cloud Firestore database rules. Unauthorized entry attempts are audited and blocked.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Full Admin Panel
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Glass Header */}
      <header className="sticky top-0 z-40 bg-white/80 border-b border-slate-200 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white shadow-md">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-extrabold text-slate-900 leading-tight">Admin CMS</h1>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">WhereInCalicut Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <span>View Site</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="flex h-9 w-9 sm:h-auto sm:w-auto items-center justify-center sm:gap-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 px-3 py-2 text-xs font-bold hover:bg-rose-100 transition-colors min-h-[36px]"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Navigation Tabs and Refresh Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex rounded-2xl bg-slate-200/60 p-1.5 border border-slate-200 max-w-sm">
            <button
              onClick={() => setActiveTab('cms')}
              className={`flex-1 rounded-xl px-5 py-2.5 text-xs font-bold transition-all min-h-[40px] flex items-center justify-center gap-2 ${
                activeTab === 'cms' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Hostels & PGs</span>
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-extrabold text-slate-500">{stays.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 rounded-xl px-5 py-2.5 text-xs font-bold transition-all min-h-[40px] flex items-center justify-center gap-2 ${
                activeTab === 'inquiries' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Inquiries Inbox</span>
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-extrabold text-slate-500">{inquiries.length}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-colors"
              title="Refresh database"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {activeTab === 'cms' && (
              <button
                onClick={triggerAddStay}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-primary-500/10 hover:from-primary-700 hover:to-indigo-700 active:scale-[0.98] transition-all min-h-[44px]"
              >
                <Plus className="h-4 w-4" />
                <span>Add Hostel / PG</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Views */}
        {loading && stays.length === 0 ? (
          <div className="py-24 text-center">
            <div className="relative h-12 w-12 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-500 text-sm font-semibold">Syncing with Firestore Database...</p>
          </div>
        ) : (
          <div>
            {activeTab === 'cms' ? (
              /* Hostels/PG CMS Tab */
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Gender Preference</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Rent Price</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stays.map((stay) => (
                        <tr key={stay.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={stay.image}
                                alt={stay.title}
                                className="h-10 w-16 object-cover rounded-lg border border-slate-200"
                              />
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">{stay.title}</h4>
                                <p className="text-[10px] text-slate-400 flex items-center gap-0.5 mt-0.5">
                                  <MapPin className="h-3 w-3" />
                                  <span>{stay.location}</span>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            <span className="rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 font-bold">
                              {stay.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            <span className={`rounded-lg border px-2 py-0.5 font-bold ${
                              stay.gender === 'Male' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                              stay.gender === 'Female' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                              'bg-slate-50 text-slate-700 border-slate-100'
                            }`}>
                              {stay.gender === 'Any' ? 'Co-living (Any)' : `${stay.gender} Only`}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-extrabold text-slate-800">
                              ₹{stay.price.toLocaleString('en-IN')}
                              <span className="text-[10px] font-normal text-slate-400">/mo</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => triggerEditStay(stay)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                title="Edit stay properties"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteStay(stay.id)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                title="Delete stay listing"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {stays.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-16 text-center text-slate-400">
                            <HelpCircle className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                            <h4 className="text-sm font-bold text-slate-600">No Listings in Database</h4>
                            <p className="text-xs text-slate-400 mt-1">Seeding will automatically trigger upon visitor loading.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Inquiries Inbox Tab */
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id}
                    className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${
                          inq.type === 'Booking' 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                            : 'bg-primary-50 border-primary-100 text-primary-700'
                        }`}>
                          {inq.badgeText || 'General Inquiry'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(inq.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                      </div>
                      
                      <h4 className="font-heading text-base font-extrabold text-slate-800 leading-tight">
                        {inq.name}
                      </h4>
                      
                      <p className="text-xs text-slate-500 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span>{inq.email}</span>
                        </span>
                      </p>

                      <p className="text-sm text-slate-600 line-clamp-2 max-w-3xl italic mt-3 bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                        "{inq.message}"
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm self-start min-h-[44px]"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Read Message</span>
                    </button>
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-400">
                    <HelpCircle className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                    <h4 className="text-sm font-bold text-slate-600">Inbox is Empty</h4>
                    <p className="text-xs text-slate-400 mt-1">All contact messages submitted by visitors will show up here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Slide-over Form Modal (Add / Edit Stay) */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="border-b border-slate-100 p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-lg font-extrabold text-slate-900">
                    {editingStay ? 'Edit Hostel / PG Listing' : 'Add New Hostel or PG'}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {editingStay ? `Editing ID: ${editingStay.id}` : 'Create a brand new database record'}
                  </p>
                </div>
                <button
                  onClick={() => setIsFormModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors min-h-[36px]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form Content Scrollable */}
              <form onSubmit={handleStayFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
                
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Property Title / Name
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={stayForm.title}
                    onChange={(e) => setStayForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Cyberpark Premium Boys Hostel"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                  />
                </div>

                {/* Grid Type / Gender / Price */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Property Type
                    </label>
                    <select
                      id="type"
                      value={stayForm.type}
                      onChange={(e) => setStayForm(prev => ({ ...prev, type: e.target.value as Stay['type'] }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                    >
                      <option value="PG">PG (Paying Guest)</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Gender Preference
                    </label>
                    <select
                      id="gender"
                      value={stayForm.gender}
                      onChange={(e) => setStayForm(prev => ({ ...prev, gender: e.target.value as Stay['gender'] }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                    >
                      <option value="Any">Co-living (Any)</option>
                      <option value="Male">Male Only</option>
                      <option value="Female">Female Only</option>
                      <option value="Family">Family Only</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Monthly Rent (INR)
                    </label>
                    <input
                      id="price"
                      type="number"
                      required
                      value={stayForm.price}
                      onChange={(e) => setStayForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      placeholder="4500"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Exact Location / Neighborhood
                  </label>
                  <input
                    id="location"
                    type="text"
                    required
                    value={stayForm.location}
                    onChange={(e) => setStayForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Kozhikode, Palazhi (near Cyberpark)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="desc" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Detailed Description (Rooms, Policies, Food details)
                  </label>
                  <textarea
                    id="desc"
                    required
                    rows={4}
                    value={stayForm.description}
                    onChange={(e) => setStayForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide full description about double sharing availability, single room AC pricing, study table features, meal timings..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[100px]"
                  ></textarea>
                      {/* Primary Image Upload & Thumbnail URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200/80 p-4 rounded-2xl bg-slate-50/50">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Thumbnail Image (Primary File Upload)
                    </label>
                    <div className="flex items-center gap-3">
                      {stayForm.image && (
                        <img 
                          src={stayForm.image} 
                          alt="Thumbnail preview" 
                          className="h-14 w-20 object-cover rounded-lg border border-slate-200 bg-white" 
                        />
                      )}
                      <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-xl p-3 cursor-pointer bg-white hover:bg-slate-50 hover:border-primary-500 transition-all text-center">
                        <Upload className={`h-5 w-5 text-slate-400 ${uploadingPrimary ? 'animate-bounce' : ''}`} />
                        <span className="text-[10px] font-bold text-slate-600 mt-1">
                          {uploadingPrimary ? 'Uploading...' : 'Choose Thumbnail File'}
                        </span>
                        <input type="file" accept="image/*" onChange={handlePrimaryUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Or Paste Thumbnail URL
                    </label>
                    <input
                      id="image"
                      type="text"
                      required
                      value={stayForm.image}
                      onChange={(e) => setStayForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Gallery Upload & URLs */}
                <div className="border border-slate-200/80 p-4 rounded-2xl bg-slate-50/50 space-y-4">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Stay Gallery Images (Upload up to 3)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {stayForm.images.map((imgUrl, idx) => (
                      <div key={idx} className="space-y-2 border border-slate-100 p-2 rounded-xl bg-white">
                        <div className="relative h-20 w-full rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                          {imgUrl ? (
                            <img src={imgUrl} alt={`Gallery Slot ${idx + 1}`} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-slate-300">
                              <HelpCircle className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        
                        <label className="flex items-center justify-center gap-1.5 border border-dashed border-slate-300 rounded-lg py-1.5 cursor-pointer hover:bg-slate-50 hover:border-primary-500 transition-all text-center">
                          <Upload className={`h-3 w-3 text-slate-400 ${uploadingGallery[idx] ? 'animate-bounce' : ''}`} />
                          <span className="text-[9px] font-bold text-slate-600">
                            {uploadingGallery[idx] ? 'Uploading...' : `Upload Photo ${idx + 1}`}
                          </span>
                          <input type="file" accept="image/*" onChange={(e) => handleGalleryUpload(e, idx)} className="hidden" />
                        </label>
                        
                        <input
                          type="text"
                          required
                          value={imgUrl}
                          onChange={(e) => setStayForm(prev => {
                            const copy = [...prev.images];
                            copy[idx] = e.target.value;
                            return { ...prev, images: copy };
                          })}
                          placeholder={`Image ${idx + 1} URL`}
                          className="w-full rounded-lg border border-slate-200 px-2 py-1 text-[9px] text-slate-600 outline-none focus:border-primary-500 bg-slate-50"
                        />
                      </div>
                    ))}
                  </div>
                </div>            </div>

                {/* Amenities Comma-separated */}
                <div>
                  <label htmlFor="amenities" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Amenities (Comma Separated)
                  </label>
                  <input
                    id="amenities"
                    type="text"
                    required
                    value={stayForm.amenities}
                    onChange={(e) => setStayForm(prev => ({ ...prev, amenities: e.target.value }))}
                    placeholder="e.g. Free Wi-Fi, Daily Meals, CCTV, AC Rooms"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                  />
                </div>

                {/* Contact phone, whatsapp, email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Owner Contact Phone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      required
                      value={stayForm.phone}
                      onChange={(e) => setStayForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      id="whatsapp"
                      type="text"
                      required
                      value={stayForm.whatsapp}
                      onChange={(e) => setStayForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="9876543210"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Direct Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={stayForm.email}
                      onChange={(e) => setStayForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="owner@calicutstays.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Google Maps Embed URL */}
                <div>
                  <label htmlFor="mapUrl" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Google Maps embed iframe source URL
                  </label>
                  <input
                    id="mapUrl"
                    type="text"
                    required
                    value={stayForm.mapUrl}
                    onChange={(e) => setStayForm(prev => ({ ...prev, mapUrl: e.target.value }))}
                    placeholder="https://www.google.com/maps/embed?..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-primary-500 focus:bg-white min-h-[44px]"
                  />
                </div>

                {/* Footer Modal Action Buttons */}
                <div className="border-t border-slate-100 pt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:from-primary-700 hover:to-indigo-700 active:scale-[0.98] transition-all min-h-[44px]"
                  >
                    <Check className="h-4 w-4" />
                    <span>{editingStay ? 'Save Changes' : 'Create Listing'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inquiry Detail Backdrop Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl backdrop-blur-md text-left z-10 overflow-hidden"
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors min-h-[32px]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div>
                  <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${
                    selectedInquiry.type === 'Booking' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                      : 'bg-primary-50 border-primary-100 text-primary-700'
                  }`}>
                    {selectedInquiry.badgeText || 'General Inquiry'}
                  </span>
                  <h3 className="font-heading text-xl font-extrabold text-slate-900 mt-2">
                    {selectedInquiry.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Received on {new Date(selectedInquiry.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <p className="text-xs text-slate-500">
                    <strong>Email Address:</strong> <a href={`mailto:${selectedInquiry.email}`} className="text-primary-600 hover:underline">{selectedInquiry.email}</a>
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Body</p>
                  <p className="text-slate-700 text-sm italic leading-relaxed whitespace-pre-wrap">
                    "{selectedInquiry.message}"
                  </p>
                </div>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="w-full rounded-xl bg-slate-800 py-3.5 text-xs font-bold text-white shadow-md hover:bg-slate-900 min-h-[44px]"
                >
                  Close Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
