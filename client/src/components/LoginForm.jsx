import React, { useState } from 'react';
 import { googleLogin, login } from '../services/api/gemini.js';
import { googlePopup } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

export default function LoginForm(){
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center py-10">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">Unlock Your Career Direction</h1>
          <p className="text-softText text-sm md:text-base leading-relaxed">Sign in to take the adaptive quiz, generate personalized degree & stream recommendations, and chat with the AI mentor about next steps.</p>
          <ul className="text-xs md:text-sm space-y-2">
            <li className="flex items-start gap-2"><span className="text-primary">✔</span><span>Smart quiz powering tailored career suggestions.</span></li>
            <li className="flex items-start gap-2"><span className="text-primary">✔</span><span>AI guidance for colleges, exams, and growth.</span></li>
            <li className="flex items-start gap-2"><span className="text-primary">✔</span><span>Clean dashboard & dark mode ready.</span></li>
          </ul>
        </div>
        <div className="card p-8 shadow-xl border border-border/60 bg-surface/80 backdrop-blur">
          <h2 className="text-xl font-bold mb-2">Login</h2>
          <p className="text-xs text-softText mb-6">Google Sign-In only. No password required.</p>
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <button disabled={loading} onClick={async ()=>{
            setError('');
            setLoading(true);
            try {
              const { idToken, user } = await googlePopup();
              const resp = await googleLogin({ idToken, email: user.email, name: user.displayName, photoURL: user.photoURL });
              localStorage.setItem('token', resp.token);
              localStorage.setItem('user', JSON.stringify(resp.user));
              navigate('/quiz');
            } catch(e){
              console.error(e);
              setError(e.message || 'Google sign-in failed');
            } finally { setLoading(false); }
          }} className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent text-white font-semibold py-3 shadow-lg hover:shadow-primary/40 transition">
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              {loading ? 'Signing in...' : 'Continue with Google'}
            </span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-accent to-primary blur-sm" />
          </button>
          <p className="text-[10px] text-softText mt-6 leading-relaxed">By continuing you agree that basic profile info (name, email, avatar) will be used to personalize your experience.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20" aria-hidden>
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl" />
      </div>
    </div>
  );
}
