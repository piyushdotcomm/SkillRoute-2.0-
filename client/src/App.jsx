import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { User, LogOut, Home as HomeIcon, Briefcase, FileText, Clock } from 'lucide-react';
import { NavBar } from './components/ui/tubelight-navbar';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Directory from './pages/Directory.jsx';
import Timeline from './pages/Timeline.jsx';
import Recommendations from './pages/Recommendations.jsx';
import LoginForm from './components/LoginForm.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Chatbot from './components/Chatbot.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/Profile.jsx';
import GoogleTranslate from './components/GoogleTranslate.jsx';
import { BackgroundBeams } from './components/ui/background-beams';
import { ThemeToggleButton2 } from './components/ui/theme-toggle-buttons';
import { TapedFooter } from './components/ui/footer-taped-design';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="w-full flex-1 flex flex-col"
  >
    {children}
  </motion.div>
);

function AppShell({ children }) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Dashboard', path: '/profile', show: !!user },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Colleges', path: '/directory' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Results', path: '/recs' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 transition-colors duration-300 relative">
      {/* Top Actions */}
      <div className="fixed top-4 right-4 z-[51] flex items-center gap-4">
        <div className="opacity-80 hover:opacity-100 transition-opacity">
          <GoogleTranslate />
        </div>
        <ThemeToggleButton2 className="w-9 h-9 border border-border/50 text-foreground" />

        {!user ? (
          <Link to="/login" className="btn h-9 px-5 text-sm shadow-sm hover:shadow-md transition-all">
            Log In
          </Link>
        ) : (
          <div className="flex items-center gap-3 pl-2 border-l border-border/50">
            <Link to="/profile" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-primary/20 transition-all bg-muted">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xs">
                    {user.name?.[0] || 'U'}
                  </div>
                )}
              </div>
            </Link>
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>

      <NavBar items={[
        { name: 'Home', url: '/', icon: HomeIcon },
        { name: 'Quiz', url: '/quiz', icon: FileText },
        { name: 'Colleges', url: '/directory', icon: Briefcase },
        { name: 'Timeline', url: '/timeline', icon: Clock },
        { name: 'Results', url: '/recs', icon: FileText }
      ]} />

      <main className="flex-1 pt-24 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </main>

      <TapedFooter />
      <BackgroundBeams className="fixed inset-0 z-0 pointer-events-none" />
      <Chatbot />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  });

  const authValue = useMemo(() => ({
    user,
    setUser,
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }), [user]);

  return (
    <AuthContext.Provider value={authValue}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <AppShell>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/quiz" element={<PrivateRoute><PageTransition><Quiz /></PageTransition></PrivateRoute>} />
              <Route path="/directory" element={<PageTransition><Directory /></PageTransition>} />
              <Route path="/timeline" element={<PageTransition><Timeline /></PageTransition>} />
              <Route path="/recs" element={<PageTransition><Recommendations /></PageTransition>} />
              <Route path="/login" element={<PageTransition><LoginForm /></PageTransition>} />
              <Route path="/profile" element={<PrivateRoute><PageTransition><Profile /></PageTransition></PrivateRoute>} />
            </Routes>
          </AnimatePresence>
        </AppShell>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

