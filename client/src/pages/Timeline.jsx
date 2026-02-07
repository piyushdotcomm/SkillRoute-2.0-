import React, { useEffect, useState } from 'react';
import { getTimeline } from '../services/api/gemini.js';
import { motion } from 'framer-motion';
import { Calendar, Tag, Bell, Clock } from 'lucide-react';

export default function Timeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => { setEvents(await getTimeline()); })();
  }, []);

  const upcoming = events.filter(e => new Date(e.date) > new Date()).slice(0, 3);

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Important Dates</h2>
          <p className="text-muted-foreground">Stay on top of exam schedules and application deadlines.</p>
        </div>

        <div className="relative pl-8 border-l-2 border-border/50 ml-3 space-y-10">
          {events.map((ev, idx) => (
            <motion.div
              key={ev.id || idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-4 border-primary shadow-sm" />

              <div className="card p-5 group hover:border-primary/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{ev.title}</h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                    <Calendar size={14} />
                    <span>{new Date(ev.date).toDateString()}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{ev.description}</p>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
                    <Tag size={12} />
                    <span>Tags:</span>
                  </div>
                  {ev.tags.map(t => (
                    <span key={t} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft sticky top-24">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-6">
            <Bell className="text-primary" size={20} />
            <span>Upcoming Soon</span>
          </h3>
          <div className="space-y-4">
            {upcoming.map((u, i) => (
              <div key={u.id || i} className="group relative rounded-xl bg-muted/30 p-4 border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-surface flex flex-col items-center justify-center text-center leading-none border border-border">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{new Date(u.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold text-foreground">{new Date(u.date).getDate()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{u.title}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock size={12} />
                      <span>{Math.ceil((new Date(u.date) - new Date()) / (1000 * 60 * 60 * 24))} days left</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {upcoming.length === 0 && (
              <p className="text-sm text-muted-foreground">No upcoming events soon.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
