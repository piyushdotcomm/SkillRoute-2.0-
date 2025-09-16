import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const PageTransition = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
    {children}
  </motion.div>
);

function AppShell({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-surfaceAlt/80 backdrop-blur shadow-soft sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-lg md:text-xl text-primary">
          <span>🎯 CareerPath</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          <Link to="/quiz" className="hover:text-primary">Quiz</Link>
          <Link to="/directory" className="hover:text-primary">Colleges</Link>
          <Link to="/timeline" className="hover:text-primary">Timeline</Link>
          <Link to="/recs" className="hover:text-primary">Results</Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          {!user && <Link to="/login" className="btn px-4 py-2 text-xs md:text-sm">Login</Link>}
          {user && (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface shadow-inner border border-border hover:border-primary transition">
                {user.photoURL && <img src={user.photoURL} alt="avatar" className="w-7 h-7 rounded-full object-cover" />}
                <span className="text-xs md:text-sm font-semibold max-w-[120px] truncate">{user.name || user.email}</span>
              </Link>
              <button onClick={logout} className="btn-outline px-3 py-2 text-xs md:text-sm">Logout</button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 px-4 md:px-8 py-6 md:py-8 max-w-6xl w-full mx-auto">
        {children}
      </main>
      <footer className="text-center text-xs py-6 text-softText">© {new Date().getFullYear()} CareerPath Companion</footer>
      <Chatbot />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.remove('light','dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [user, setUser] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  });
  const authValue = useMemo(()=>({
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
        <AnimatePresence mode="wait">
          <AppShell>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/quiz" element={<PrivateRoute><PageTransition><Quiz /></PageTransition></PrivateRoute>} />
              <Route path="/directory" element={<PageTransition><Directory /></PageTransition>} />
              <Route path="/timeline" element={<PageTransition><Timeline /></PageTransition>} />
              <Route path="/recs" element={<PageTransition><Recommendations /></PageTransition>} />
              <Route path="/login" element={<PageTransition><LoginForm /></PageTransition>} />
              <Route path="/profile" element={<PrivateRoute><PageTransition><Profile /></PageTransition></PrivateRoute>} />
            </Routes>
          </AppShell>
        </AnimatePresence>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
