const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function http(path, options={}) {
  const token = localStorage.getItem('token');
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json', ...(token? { Authorization: 'Bearer '+token }: {}) },
    ...options
  });
  let data;
  try { data = await res.json(); }
  catch { data = null; }
  if (!res.ok) {
    const detail = data?.error || data?.message || res.status + ' ' + res.statusText;
    throw new Error('Request failed: ' + detail);
  }
  return data;
}

export async function login(email, password){
  return http('/auth/login', { method:'POST', body: JSON.stringify({ email, password })});
}


export async function googleLogin(payload){
  return http('/auth/google', { method: 'POST', body: JSON.stringify(payload) });
}

export async function recommend(payload){
  return http('/gemini/recommend', { method:'POST', body: JSON.stringify(payload)});
}

export async function chat(message){
  return http('/gemini/chat', { method:'POST', body: JSON.stringify({ message })});
}

export async function getColleges(){
  return http('/gemini/colleges', { method:'GET' });
}

export async function getTimeline(){
  return http('/mistra/timeline', { method:'GET' });
}
