import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { chat } from '../services/api/gemini.js';

export default function Chatbot(){
  const [open,setOpen] = useState(false);
  const [messages,setMessages] = useState([{ role:'bot', content:'Hi! Ask me about courses, colleges or careers. 💬' }]);
  const [input,setInput] = useState('');
  const [loading,setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[messages, open]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role:'user', content: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await chat(input.trim());
      const isMock = /mock/i.test(res.reply || '') || res.reply === '(Fallback) Unable to reach AI service right now; check MISTRA_API_URL DNS.';
      setMessages(m => [...m, { role:'bot', content: res.reply || JSON.stringify(res), meta: { mock: isMock } }]);
    } catch(e) { setMessages(m => [...m, { role:'bot', error:true, content: '⚠️ ' + e.message }]); }
    finally { setLoading(false); }
  };

  return (
    <>
      <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} onClick={()=>setOpen(o=>!o)} className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl text-white font-bold bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center animate-bob z-50">
        💬
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:60 }} transition={{ duration:0.35 }} className="fixed bottom-28 right-6 w-80 max-h-[60vh] bg-surfaceAlt rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 z-50">
            <div className="px-4 py-3 font-semibold bg-gradient-to-r from-primary/20 to-accent/20">CareerPath Chat</div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((m,i)=>(
                <div key={i} className={`px-3 py-2 rounded-xl max-w-[85%] whitespace-pre-wrap ${m.role==='user'?'ml-auto bg-primary text-white': m.error ? 'bg-red-500/10 border border-red-400 text-red-600 dark:text-red-300' : 'bg-surface shadow'}`}>
                  {m.content}
                  {m.meta?.mock && !m.error && <span className="block mt-1 text-[10px] uppercase tracking-wide text-softText">Mock / Fallback</span>}
                </div>
              ))}
              {loading && <div className="text-xs text-softText">Thinking...</div>}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={e=>{e.preventDefault(); send();}} className="p-3 flex gap-2 border-t border-gray-200 dark:border-gray-700">
              <input className="flex-1" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a question" />
              <button type="submit" className="btn px-4 py-2 text-sm">Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
