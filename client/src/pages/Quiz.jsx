import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
 import { recommend } from '../services/api/gemini.js';
import { useNavigate } from 'react-router-dom';

const questions = [
  { id: 1, type: 'mcq', question: 'Which subject do you enjoy the most?', options: ['Math', 'Biology', 'History', 'Computer'] },
  { id: 2, type: 'mcq', question: 'Preferred learning style?', options: ['Hands-on', 'Reading', 'Visual', 'Audio'] },
  { id: 3, type: 'mcq', question: 'Do you like solving logical problems?', options: ['Love it', 'Sometimes', 'Not much'] },
  { id: 4, type: 'slider', question: 'Rate your interest in technology', min: 0, max: 10 },
  { id: 5, type: 'slider', question: 'Rate your creativity', min: 0, max: 10 },
  { id: 6, type: 'mcq', question: 'Which environment appeals?', options: ['Labs', 'Office', 'Outdoors', 'Classroom'] },
  { id: 7, type: 'mcq', question: 'Comfort with public speaking?', options: ['High', 'Medium', 'Low'] },
  { id: 8, type: 'mcq', question: 'Interest in government exams?', options: ['Yes', 'Maybe', 'No'] },
  { id: 9, type: 'mcq', question: 'Do you prefer teamwork?', options: ['Yes', 'Sometimes', 'Solo'] },
  { id: 10, type: 'tags', question: 'Select personality traits', options: ['Curious','Analytical','Creative','Empathetic','Leader'] }
];

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const q = questions[idx];
  const progress = ((idx) / questions.length) * 100;

  const handleSelect = (value) => {
    setAnswers(a => ({ ...a, [q.id]: value }));
  };

  const next = async () => {
    if (idx < questions.length - 1) setIdx(i => i + 1);
    else await submit();
  };

  const toggleTag = (tag) => {
    const cur = answers[q.id] || [];
    if (cur.includes(tag)) handleSelect(cur.filter(t => t !== tag));
    else handleSelect([...cur, tag]);
  };

  const submit = async () => {
    setLoading(true);
    try {
      const recs = await recommend({ userProfile: { grade: '11', location: 'MH' }, quizAnswers: answers });
      // Save to localStorage for persistence
      localStorage.setItem('career_recommendations', JSON.stringify(recs));
      navigate('/recs', { state: { recs } });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="card relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-primary" style={{ width: progress + '%' }} />
        <h2 className="h2 mb-4">Quick Aptitude & Interest Quiz</h2>
        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }} className="space-y-4">
            <p className="font-semibold">{q.question}</p>
            {q.type === 'mcq' && (
              <div className="grid grid-cols-2 gap-3">
                {q.options.map(op => (
                  <button key={op} onClick={() => handleSelect(op)} className={`p-3 rounded-xl border text-sm font-medium transition ${answers[q.id]===op ? 'bg-primary text-white border-primary-dark' : 'bg-surfaceAlt border-gray-300 dark:border-gray-600 hover:border-primary'}`}>{op}</button>
                ))}
              </div>
            )}
            {q.type === 'slider' && (
              <div>
                <input type="range" min={q.min} max={q.max} value={answers[q.id] ?? ((q.min+q.max)/2)} onChange={e=>handleSelect(Number(e.target.value))} className="w-full" />
                <div className="text-sm text-softText">Value: {answers[q.id] ?? ((q.min+q.max)/2)}</div>
              </div>
            )}
            {q.type === 'tags' && (
              <div className="flex flex-wrap gap-2">
                {q.options.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`px-4 py-2 rounded-full text-xs font-semibold border ${answers[q.id]?.includes(tag) ? 'bg-accent text-white border-accent' : 'border-gray-300 dark:border-gray-600 hover:border-accent'}`}>{tag}</button>
                ))}
              </div>
            )}
            <div className="flex justify-between pt-4">
              <button disabled={idx===0} onClick={()=>setIdx(i=>i-1)} className="btn-outline px-5 py-2 rounded-2xl disabled:opacity-40">Back</button>
              <button onClick={next} disabled={loading} className="btn px-6 py-2 rounded-2xl">{idx === questions.length -1 ? (loading? 'Submitting...' : 'See Recommendations') : 'Next'}</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
