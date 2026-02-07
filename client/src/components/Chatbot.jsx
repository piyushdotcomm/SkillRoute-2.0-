import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { chat } from '../services/api/gemini.js';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', content: 'Hi! Ask me about courses, colleges, or career paths.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await chat(input.trim());
      const isMock = /mock/i.test(res.reply || '') || res.reply === '(Fallback) Unable to reach AI service right now; check MISTRA_API_URL DNS.';
      setMessages(m => [...m, { role: 'bot', content: res.reply || JSON.stringify(res), meta: { mock: isMock } }]);
    } catch (e) { setMessages(m => [...m, { role: 'bot', error: true, content: '⚠️ ' + e.message }]); }
    finally { setLoading(false); }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg shadow-primary/25 text-primary-foreground font-bold bg-primary flex items-center justify-center z-50 hover:bg-primary/90 transition-colors"
      >
        {open ? <X size={24} /> : <MessageCircle size={28} />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[500px] max-h-[70vh] bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-primary text-primary-foreground flex items-center gap-2 shadow-sm">
              <Bot size={20} />
              <h3 className="font-semibold text-sm">CareerPath Assistant</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={16} className="text-primary" />}
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : m.error
                        ? 'bg-destructive/10 text-destructive border border-destructive/20 rounded-tl-sm'
                        : 'bg-card border border-border rounded-tl-sm'
                    }`}>
                    {m.content}
                    {m.meta?.mock && !m.error && <span className="block mt-1 text-[10px] opacity-70 uppercase tracking-wide">Mock Response</span>}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-primary" />
                  </div>
                  <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={e => { e.preventDefault(); send(); }} className="p-3 bg-card border-t border-border flex gap-2">
              <input
                className="flex-1 px-4 py-2 rounded-xl border border-input bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
