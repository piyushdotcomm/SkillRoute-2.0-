import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="h1">Find Your Perfect Course & Career</h1>
          <p className="lead max-w-lg">A playful, AI-guided platform helping Indian students map interests to real university programs, government colleges, and future job roles. Take a quick quiz and get a tailored roadmap.</p>
          <div className="flex gap-4">
            <Link to="/quiz" className="btn text-lg">Take Quick Quiz</Link>
            <Link to="/directory" className="btn-outline px-6 py-3 rounded-2xl font-semibold">Browse Colleges</Link>
          </div>
          <div className="flex gap-3 pt-4">
            <span className="badge">AI-Powered</span>
            <span className="badge">Gov Colleges</span>
            <span className="badge">Roadmaps</span>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6 }} className="relative">
          <div className="card">
            <h3 className="h3 mb-4">Why CareerPath?</h3>
            <ul className="space-y-3 text-sm">
              <li>Personalized recommendations using your interests.</li>
              <li>Government college directory with filters.</li>
              <li>Timeline tracker for key exams & admission dates.</li>
              <li>Friendly chatbot for quick guidance.</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
