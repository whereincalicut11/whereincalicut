import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import StayDetails from './pages/StayDetails';
import Dashboard from './pages/Dashboard';

// Helper component to scroll to top on routing changes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to the hash element after a small delay
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden antialiased">
      <ScrollToTop />
      
      {/* Sticky Global Navigation */}
      {!isDashboard && <Navbar />}
      
      {/* Router Views */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay/:id" element={<StayDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Catch-all route redirecting to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Global footer details */}
      {!isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
