import React, { useEffect, useState } from 'react';
 import { getTimeline } from '../services/api/gemini.js';
import { motion } from 'framer-motion';

export default function Timeline(){
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    (async ()=>{ setEvents(await getTimeline()); })();
  },[]);

  const upcoming = events.filter(e => new Date(e.date) > new Date()).slice(0,3);

  return (
    <div className="grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2 space-y-6">
        <h2 className="h2">Important Dates</h2>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-accent" />
          <div className="space-y-8">
            {events.map(ev => (
              <motion.div key={ev.id} initial={{opacity:0, x:30}} animate={{opacity:1, x:0}} className="relative card py-4">
                <div className="absolute -left-3 top-5 w-6 h-6 rounded-full bg-primary border-4 border-surface" />
                <h3 className="font-bold">{ev.title}</h3>
                <p className="text-xs text-softText">{new Date(ev.date).toDateString()} · {ev.type}</p>
                <p className="text-sm mt-2">{ev.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">{ev.tags.map(t=> <span key={t} className="badge">{t}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <aside className="space-y-4">
        <h3 className="h3 text-xl">Upcoming</h3>
        <div className="space-y-3">
          {upcoming.map(u => (
            <div key={u.id} className="card p-4 bg-gradient-to-br from-primary/10 to-accent/10">
              <p className="text-sm font-semibold">{u.title}</p>
              <p className="text-xs text-softText">{new Date(u.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
