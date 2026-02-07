import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { calculateResults } from '../services/quizEngine';
import { Check, ChevronRight, ChevronLeft, Award } from 'lucide-react';

const questions = [
  {
    id: 1,
    type: 'tags',
    question: 'Which subjects do you genuinely enjoy studying?',
    description: 'Select as many as apply. Be honest about what you like, not just what you score well in.',
    options: ['Math', 'Physics', 'Chemistry', 'Biology', 'History/Civics', 'Economics', 'Computer/IT', 'Art/Design']
  },
  {
    id: 2,
    type: 'mcq',
    question: 'What kind of problems do you like solving?',
    description: 'Think about how your brain naturally works when faced with a challenge.',
    options: ['Analytical', 'Creative', 'People-oriented', 'Hands-on/Practical']
  },
  {
    id: 3,
    type: 'mcq',
    question: 'Where do you see yourself working in the future?',
    description: 'Imagine your ideal daily workspace.',
    options: ['Laboratory/Research', 'Corporate Office', 'Field/Outdoor', 'Creative Studio']
  },
  {
    id: 4,
    type: 'mcq',
    question: 'Which topic fascinates you the most?',
    description: 'If you could read a book or watch a documentary, what would it be about?',
    options: ['Logic & Numbers', 'Ethics & Philosophy', 'Business Strategy', 'Visuals & Spaces']
  },
  {
    id: 5,
    type: 'slider',
    question: 'How interested are you in Technology & Coding?',
    description: '0 means not interested at all, 10 means you love it.',
    min: 0,
    max: 10
  },
  {
    id: 6,
    type: 'slider',
    question: 'How would you rate your Creativity & Design sense?',
    description: 'Do you often come up with unique ideas or enjoy artistic tasks?',
    min: 0,
    max: 10
  },
  {
    id: 7,
    type: 'slider',
    question: 'How strong is your desire to directly help people?',
    description: 'Would you enjoy a career in healthcare, teaching, or social work?',
    min: 0,
    max: 10
  },
  {
    id: 8,
    type: 'mcq',
    question: 'What motivates you more in a career?',
    description: 'Are you looking for security, wealth, or fulfillment?',
    options: ['High Stability', 'High Risk/High Reward', 'Passion over Money']
  }
];

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const q = questions[idx];
  const progress = ((idx + 1) / questions.length) * 100;

  const handleSelect = (value) => {
    setAnswers(a => ({ ...a, [q.id]: value }));
  };

  const next = async () => {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
    } else {
      await submit();
    }
  };

  const prev = () => {
    if (idx > 0) setIdx(i => i - 1);
  };

  const toggleTag = (tag) => {
    const cur = answers[q.id] || [];
    if (cur.includes(tag)) handleSelect(cur.filter(t => t !== tag));
    else handleSelect([...cur, tag]);
  };

  const submit = async () => {
    setLoading(true);
    // Simulate a short processing delay for better UX
    setTimeout(() => {
      try {
        const result = calculateResults(answers);
        // Save to localStorage for persistence
        localStorage.setItem('career_recommendations', JSON.stringify(result));
        navigate('/recs', { state: { recs: result } });
      } catch (e) {
        console.error("Quiz Error:", e);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const isAnswered = () => {
    const ans = answers[q.id];
    if (q.type === 'tags') return ans && ans.length > 0;
    return ans !== undefined && ans !== null;
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase text-muted-foreground mb-2">
          <span>Question {idx + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      <div className="card relative overflow-hidden min-h-[400px] flex flex-col justify-between p-8 shadow-lg border-border/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 flex-1"
          >
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {q.question}
              </h2>
              {q.description && (
                <p className="text-muted-foreground text-lg">{q.description}</p>
              )}
            </div>

            <div className="pt-2">
              {q.type === 'mcq' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map(op => (
                    <button
                      key={op}
                      onClick={() => handleSelect(op)}
                      className={`p-4 rounded-xl text-left font-medium transition-all duration-200 border-2 flex items-center justify-between group ${answers[q.id] === op
                          ? 'border-primary bg-primary/5 text-primary shadow-sm'
                          : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                        }`}
                    >
                      <span>{op}</span>
                      {answers[q.id] === op && <Check size={18} className="text-primary" />}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'slider' && (
                <div className="space-y-8 py-4">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-semibold text-muted-foreground">Not Interested (0)</span>
                    <span className="text-2xl font-bold text-primary">{answers[q.id] ?? 5}</span>
                    <span className="text-sm font-semibold text-muted-foreground">Very Interested (10)</span>
                  </div>
                  <input
                    type="range"
                    min={q.min}
                    max={q.max}
                    value={answers[q.id] ?? 5}
                    onChange={e => handleSelect(Number(e.target.value))}
                    className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    {[...Array(11)].map((_, i) => (
                      <span key={i} className="w-1 h-3 bg-border rounded-full" />
                    ))}
                  </div>
                </div>
              )}

              {q.type === 'tags' && (
                <div className="flex flex-wrap gap-3">
                  {q.options.map(tag => {
                    const isSelected = answers[q.id]?.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${isSelected
                            ? 'bg-primary text-primary-foreground border-primary shadow-md transform scale-105'
                            : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted'
                          }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Actions */}
        <div className="flex justify-between items-center pt-8 mt-4 border-t border-border/40">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="btn-outline px-6 py-2.5 rounded-xl disabled:opacity-0 disabled:pointer-events-none flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={18} /> Back
          </button>

          <button
            onClick={next}
            disabled={!isAnswered() || loading}
            className="btn px-8 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : idx === questions.length - 1 ? (
              <>See Results <Award size={18} /></>
            ) : (
              <>Next <ChevronRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
