import React, { useEffect, useState } from 'react';
import { getColleges } from '../services/api/gemini.js';
import { motion } from 'framer-motion';
import { Search, MapPin, ExternalLink, GraduationCap, Building2, FileText } from 'lucide-react';

export default function Directory() {
  const [allColleges, setAllColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialColleges = async () => {
      setLoading(true);
      try {
        const colleges = await getColleges();
        setAllColleges(colleges);
        setFilteredColleges(colleges);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadInitialColleges();
  }, []);

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredColleges(allColleges);
      return;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = allColleges.filter(college =>
      college.name.toLowerCase().includes(lowercasedSearchTerm) ||
      college.district.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredColleges(filtered);
  };

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">College Directory</h2>
          <p className="text-muted-foreground">Explore top institutions and their offerings.</p>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name or district..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button onClick={handleSearch} className="btn h-11 px-6 shadow-sm">Search</button>
        </div>
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 rounded-2xl bg-muted/40 animate-pulse border border-border/40"></div>
          ))}
        </div>
      )}

      {!loading && filteredColleges.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No colleges found matching your criteria.
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((c, idx) => (
          <motion.div
            key={c.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group flex flex-col h-full bg-card rounded-2xl border border-border shadow-soft hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden"
          >
            <div className="p-6 flex-1 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {c.name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin size={14} className="shrink-0" />
                  <span>{c.district}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-primary" />
                    <span>Courses</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.courses.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-2">
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground flex items-center gap-1"><Building2 size={12} /> Facilities</span>
                    <p className="line-clamp-2">{c.facilities.join(', ')}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground flex items-center gap-1"><FileText size={12} /> Exams</span>
                    <p className="line-clamp-2">{c.exams.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={c.official_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-4 bg-muted/30 border-t border-border/50 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors group-hover:pl-7"
            >
              <span>Visit Website</span>
              <ExternalLink size={16} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
