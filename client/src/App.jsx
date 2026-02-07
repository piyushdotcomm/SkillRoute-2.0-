import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 transition-colors duration-300">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                SkillRoute
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.filter(l => l.show !== false).map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="opacity-80 hover:opacity-100 transition-opacity">
                <GoogleTranslate />
              </div>
              <ThemeToggle />

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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <nav className="flex flex-col gap-2">
                  {navLinks.filter(l => l.show !== false).map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-3 rounded-xl text-base font-medium hover:bg-muted/50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  {!user && (
                    <Link to="/login" className="block px-4 py-3 rounded-xl text-base font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                      Log In
                    </Link>
                  )}
                </nav>
                <div className="flex items-center justify-between px-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <GoogleTranslate />
                  </div>
                  {user && (
                    <button onClick={logout} className="flex items-center gap-2 text-destructive font-medium text-sm">
                      <LogOut size={16} /> Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-24 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="py-8 border-t border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SkillRoute. All rights reserved.</p>
        </div>
      </footer>
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

