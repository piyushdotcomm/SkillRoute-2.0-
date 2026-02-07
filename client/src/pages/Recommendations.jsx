import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, BookOpen, School, ListOrdered, ArrowRight, RotateCcw } from 'lucide-react';

export default function Recommendations() {
  const { state } = useLocation();
  let recs = state?.recs;
  if (!recs) {
    try {
      recs = JSON.parse(localStorage.getItem('career_recommendations'));
    } catch { }
  }

  if (!recs) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="p-4 rounded-full bg-primary/10 text-primary">
        <BookOpen size={48} />
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">No recommendations found</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Take the quiz to unlock your personalized career guidance and academic roadmap.
        </p>
      </div>
      <Link to="/quiz" className="btn h-11 px-8 shadow-lg shadow-primary/20">
        Start Quiz <ArrowRight size={18} className="ml-2" />
      </Link>
    </div>
  );

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-border/40">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Your Personalized Path
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Based on your profile and quiz results, here is your tailored academic and career roadmap.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/quiz" className="btn-outline h-10 px-4 text-sm gap-2">
            <RotateCcw size={16} /> Retake Quiz
          </Link>
          <Link to="/directory" className="btn h-10 px-5 text-sm shadow-sm gap-2">
            Explore Colleges <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-10">

          {/* Degree Paths */}
          <section className="space-y-6">
            <h3 className="flex items-center gap-2.5 text-xl font-semibold text-foreground">
              <BookOpen className="text-primary" size={24} />
              <span>Recommended Degree Paths</span>
            </h3>

            <div className="grid gap-5">
              {recs.recommended_degrees?.map((d, idx) => (
                <motion.div
                  key={d.name + idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{d.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{d.description}</p>
                    </div>
                    {d.average_salary_range && (
                      <div className="shrink-0 inline-flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold border border-emerald-500/20 whitespace-nowrap">
                        {d.average_salary_range}
                      </div>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 pt-4 border-t border-border/50">
                    {d.key_job_roles?.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">Job Roles</span>
                        <p className="text-sm text-muted-foreground">{d.key_job_roles.slice(0, 5).join(', ')}</p>
                      </div>
                    )}
                    <div className="space-y-3">
                      {d.government_exams?.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">Key Exams</span>
                          <p className="text-sm text-muted-foreground">{d.government_exams.join(', ')}</p>
                        </div>
                      )}
                      {d.growth_outlook && (
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">Growth</span>
                          <p className="text-sm text-muted-foreground">{d.growth_outlook}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section className="space-y-6">
            <h3 className="flex items-center gap-2.5 text-xl font-semibold text-foreground">
              <ListOrdered className="text-primary" size={24} />
              <span>Action Plan</span>
            </h3>
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/60">
              <ol className="relative space-y-6 m-0 p-0 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {recs.next_steps?.map((step, i) => (
                  <li key={i} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary shadow-sm z-10">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed pt-1.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-8">

          {/* Streams */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Target className="text-primary" size={20} />
              <span>Top Streams</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {recs.recommended_streams?.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Colleges */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <School className="text-primary" size={20} />
              <span>Suggested Colleges</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {recs.suggested_colleges?.map(c => (
                <Link
                  to={`/directory?search=${encodeURIComponent(c)}`}
                  key={c}
                  className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 hover:text-foreground transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <Link to="/directory" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                View all colleges <ArrowRight size={12} />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
