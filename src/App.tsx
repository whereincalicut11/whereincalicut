import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import StayDetails from './pages/StayDetails';

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

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden antialiased">
        <ScrollToTop />
        
        {/* Sticky Global Navigation */}
        <Navbar />
        
        {/* Router Views */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stay/:id" element={<StayDetails />} />
            {/* Catch-all route redirecting to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        {/* Global footer details */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
