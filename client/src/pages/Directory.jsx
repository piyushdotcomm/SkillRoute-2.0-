import React, { useEffect, useState } from 'react';
 import { getColleges } from '../services/api/gemini.js';
import { motion } from 'framer-motion';

export default function Directory(){
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
      } catch(e) {
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
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold mb-1">Search College or District</label>
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="e.g. IIT or Pune" />
        </div>
        <button onClick={handleSearch} className="btn h-11">Search</button>
      </div>
      {loading && <p>Loading...</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredColleges.map(c => (
          <motion.div key={c.id} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="card space-y-2">
             <a
    href={c.official_link}
    target="_blank"
    rel="noopener noreferrer"
    // className="block card space-y-2 hover:shadow-lg transition"
  >
            <h3 className="h3 text-lg">{c.name}</h3>
            <p className="text-sm text-softText">District: {c.district}</p>
            <div className="text-xs flex flex-wrap gap-2">
              {c.courses.map(s => <span key={s} className="badge">{s}</span>)}
            </div>
            <p className="text-xs text-softText">Facilities: {c.facilities.join(', ')}</p>
            <p className="text-xs text-softText">Exams: {c.exams.join(', ')}</p>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
