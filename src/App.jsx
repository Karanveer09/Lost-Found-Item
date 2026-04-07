import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import CampusPage from './pages/CampusPage';
import HostelPage from './pages/HostelPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import HelpSupportPage from './pages/HelpSupportPage';
import ProfileSetup from './pages/ProfileSetup';
import ItemDetailPage from './pages/ItemDetailPage';
import logoImg from './assets/Logo.jpg';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading, hasProfile } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!hasProfile) return <Navigate to="/setup-profile" replace />;
  return children;
};

const AuthRoute = ({ children }) => {
  const { user, loading, hasProfile } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (user) {
    if (!hasProfile) return <Navigate to="/setup-profile" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
};

const SetupRoute = ({ children }) => {
  const { user, loading, hasProfile } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (hasProfile) return <Navigate to="/" replace />;
  return children;
};

const AppLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="app-container">
      {/* Mobile-only header for internal pages */}
      <div className="mobile-header">
        <button 
          className="menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <div className="mobile-brand-logo">
          <img src={logoImg} alt="logo" className="mobile-logo-img" />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="main-content">
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

const LandingLayout = ({ children }) => (
  <div className="landing-layout">
    <Navbar />
    <div className="landing-content">{children}</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(10px)',
          }
        }} />
        <Routes>
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/setup-profile" element={<SetupRoute><ProfileSetup /></SetupRoute>} />
          
          <Route path="/" element={<ProtectedRoute><LandingLayout><LandingPage /></LandingLayout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
          <Route path="/campus" element={<ProtectedRoute><AppLayout><CampusPage /></AppLayout></ProtectedRoute>} />
          <Route path="/hostel" element={<ProtectedRoute><AppLayout><HostelPage /></AppLayout></ProtectedRoute>} />
          <Route path="/item/:id" element={<ProtectedRoute><AppLayout><ItemDetailPage /></AppLayout></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><AppLayout><ChatPage /></AppLayout></ProtectedRoute>} />
          <Route path="/chat/:chatId" element={<ProtectedRoute><AppLayout><ChatPage /></AppLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><AppLayout><HelpSupportPage /></AppLayout></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
