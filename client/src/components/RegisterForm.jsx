import React, { useState } from 'react';
import { register } from '../services/api/gemini.js';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterForm(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 chars');
    try {
      setLoading(true);
      const res = await register(name, email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/quiz');
    } catch(e){
      setError(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="h2 mb-4">Create Account</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Confirm Password</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button disabled={loading} className="btn w-full">{loading? 'Creating...' : 'Register'}</button>
      </form>
      <p className="text-xs text-softText mt-4">Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link></p>
    </div>
  );
}
