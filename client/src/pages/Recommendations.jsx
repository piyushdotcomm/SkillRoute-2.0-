import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Recommendations(){
  const { state } = useLocation();
  let recs = state?.recs;
  if (!recs) {
    // Try to load from localStorage
    try {
      recs = JSON.parse(localStorage.getItem('career_recommendations'));
    } catch {}
  }
  if (!recs) return (
    <div className="max-w-xl mx-auto text-center space-y-4">
      <p className="text-softText">No recommendations yet. Take the quiz to unlock your personalized career guidance.</p>
      <Link to="/quiz" className="btn px-6 py-3">Start Quiz</Link>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">Your Personalized Path</h2>
          <p className="text-softText text-xs md:text-sm mt-1">Generated from your quiz responses and profile context.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/quiz" className="btn-outline px-4 py-2 text-xs md:text-sm">Retake Quiz</Link>
          <Link to="/directory" className="btn px-4 py-2 text-xs md:text-sm">Explore Colleges</Link>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="h3 text-lg flex items-center gap-2"><span>🎯</span><span>Recommended Streams</span></h3>
        <div className="flex flex-wrap gap-2">{recs.recommended_streams?.map(s => <span key={s} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/30">{s}</span>)}</div>
      </section>

      <section className="space-y-4">
        <h3 className="h3 text-lg flex items-center gap-2"><span>📘</span><span>Degree Paths</span></h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recs.recommended_degrees?.map((d,idx) => (
            <motion.div key={d.name+idx} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{duration:0.35, delay: idx*0.05}} className="relative group rounded-2xl border border-border bg-surface p-5 shadow-soft hover:shadow-lg hover:border-primary/50 transition">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-bold text-sm md:text-base leading-snug flex-1">{d.name}</h4>
                <span className="text-[10px] px-2 py-1 rounded bg-accent/15 text-accent font-semibold">{d.average_salary_range || '—'}</span>
              </div>
              <p className="text-xs text-softText line-clamp-4 mb-3">{d.description}</p>
              <div className="space-y-2">
                {d.key_job_roles?.length > 0 && <p className="text-[11px]"><span className="font-semibold">Roles:</span> {d.key_job_roles.slice(0,4).join(', ')}{d.key_job_roles.length>4?'…':''}</p>}
                {d.government_exams?.length > 0 && <p className="text-[11px]"><span className="font-semibold">Gov Exams:</span> {d.government_exams.join(', ')}</p>}
                {d.growth_outlook && <p className="text-[11px]"><span className="font-semibold">Growth:</span> {d.growth_outlook}</p>}
              </div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/5 to-accent/10" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="h3 text-lg flex items-center gap-2"><span>🏫</span><span>Suggested Colleges</span></h3>
        <div className="flex flex-wrap gap-2">
          {recs.suggested_colleges?.map(c => <span key={c} className="px-3 py-1.5 rounded-lg bg-surfaceAlt border border-border text-xs font-medium hover:border-primary/50 transition">{c}</span>)}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="h3 text-lg flex items-center gap-2"><span>🪜</span><span>Next Steps</span></h3>
        <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm bg-surfaceAlt/60 rounded-xl p-4 border border-border/60">
          {recs.next_steps?.map((n,i)=>(<li key={i}>{n}</li>))}
        </ol>
      </section>
    </div>
  );
}
