import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  BookOpen,
  Award,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  BrainCircuit,
  GraduationCap,
  Briefcase,
  LineChart,
  Target
} from 'lucide-react';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { CardStack } from '../components/ui/card-stack';
import { CategoryList } from '../components/ui/category-list';
import { TextScramble } from '../components/ui/text-scramble';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. HERO SECTION WITH SCROLL ANIMATION */}
      <section className="relative bg-transparent overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center justify-center gap-8 mb-10 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-800"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                For Students (Class 10-12) & Parents
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-slate-50 leading-[0.9] text-center"
              >
                <TextScramble className="block" duration={1.2}>
                  Confusion to
                </TextScramble>
                <div className="text-blue-600 dark:text-blue-400">
                  <TextScramble className="block" duration={1.2} characterSet=". ">
                    Clarity.
                  </TextScramble>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl text-center leading-relaxed font-medum"
              >
                Stop guessing your future. Our scientific assessment analyzes your strengths to match you with the perfect stream and career path.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link to="/quiz" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-1">
                  Start Free Assessment <ArrowRight size={20} />
                </Link>
                <Link to="/directory" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 transition-all">
                  Explore Careers
                </Link>
              </motion.div>
            </div>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
            alt="SkillRoute Dashboard Preview"
            draggable={false}
            className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
          />
        </ContainerScroll>
      </section>

      {/* 2. TRUST / CREDIBILITY (Minimal) */}
      <section className="py-12 relative z-10 -mt-20 md:-mt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Students Guided", value: "10,000+" },
              { label: "Career Paths", value: "150+" },
              { label: "Colleges Listed", value: "500+" },
              { label: "Accuracy Rate", value: "94%" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Replaced with CategoryList) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        <CategoryList
          title="Your Journey to Success"
          subtitle="4 Simple Steps to Clarity"
          headerIcon={<Compass className="w-8 h-8" />}
          categories={[
            {
              id: 1,
              title: "Discover Yourself",
              subtitle: "Take our AI-powered assessment to uncover your true strengths and interests.",
              icon: <BrainCircuit className="w-8 h-8" />,
              featured: true
            },
            {
              id: 2,
              title: "Get Personalized Report",
              subtitle: "Receive a detailed analysis of your personality and aptitude.",
              icon: <LineChart className="w-8 h-8" />
            },
            {
              id: 3,
              title: "Explore Career Paths",
              subtitle: "Browse through hundreds of career options tailored just for you.",
              icon: <Briefcase className="w-8 h-8" />
            },
            {
              id: 4,
              title: "Plan Your Roadmap",
              subtitle: "Get a step-by-step guide to achieve your career goals.",
              icon: <TrendingUp className="w-8 h-8" />
            }
          ]}
        />
      </section>

      {/* 4. STREAM OVERVIEW */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Explore Academic Streams</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl">Not sure between Science, Commerce, or Arts? Here's a quick look at what each entails.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Science (PCM)", sub: "Engineering & Tech", text: "Physics, Math, Chemistry. Best for analytical minds." },
              { title: "Science (PCB)", sub: "Medical & Research", text: "Biology, Physics, Chemistry. For healthcare enthusiasts." },
              { title: "Commerce", sub: "Business & Finance", text: "Accounting, Economics, Business. For number crunchers." },
              { title: "Arts / Humanities", sub: "Creativity & Social", text: "Psychology, History, Lit. For deep thinkers." }
            ].map((stream, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="h-1 w-12 bg-blue-600 rounded-full mb-6" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{stream.title}</h3>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">{stream.sub}</div>
                <p className="text-sm text-slate-500">{stream.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
          </div>

          <div className="space-y-12">
            {[
              { icon: Compass, title: "1. Take the Assessment", desc: "Short, engaging questions about your likes, dislikes, and aptitude." },
              { icon: BrainCircuit, title: "2. AI Analysis", desc: "Our engine maps your profile against 500+ career parameters." },
              { icon: BookOpen, title: "3. View Your Roadmap", desc: "Get a detailed report with top streams, colleges, and exams." },
              { icon: Award, title: "4. Create Action Plan", desc: "Set goals and track important deadlines for admissions." },
            ].map((step, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex gap-6 md:items-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 font-bold text-xl text-slate-400">
                  {i + 1}
                </div>
                <div className="md:flex md:items-center md:gap-6 flex-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg w-fit mb-4 md:mb-0">
                    <step.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-slate-500">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES (Card Stack) */}
      {/* SUCCESS STORIES (Card Stack) */}
      {/* SUCCESS STORIES (Card Stack) */}
      <section className="py-24 px-6 bg-transparent">
        <div className="w-full max-w-[90vw] mx-auto flex flex-col items-center">
          <div className="text-center mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Success Stories</h2>
            <p className="text-slate-600 dark:text-slate-400">See how SkillRoute has helped students find their true calling.</p>
          </div>
          <CardStack
            items={[
              {
                id: 1,
                title: "Aarav Sharma",
                description: "Found my passion for Data Science after being confused between Engineering and Economics.",
                date: "July 2024",
                color: "bg-blue-100 dark:bg-blue-900"
              },
              {
                id: 2,
                title: "Priya Patel",
                description: "SkillRoute helped me discover a career in Sustainable Architecture I never knew existed.",
                date: "May 2024",
                color: "bg-emerald-100 dark:bg-emerald-900"
              },
              {
                id: 3,
                title: "Rohan Gupta",
                description: "The detailed roadmap gave me the confidence to switch from PCB to Humanities.",
                date: "March 2024",
                color: "bg-purple-100 dark:bg-purple-900"
              },
              {
                id: 4,
                title: "Ananya Singh",
                description: "I was lost, but the AI assessment pinpointed my strengths in Psychology perfectly.",
                date: "January 2024",
                color: "bg-amber-100 dark:bg-amber-900"
              },
              {
                id: 5,
                title: "Vikram Malhotra",
                description: "Clear, unbiased advice that my parents and I both agreed on. Highly recommended!",
                date: "December 2023",
                color: "bg-rose-100 dark:bg-rose-900"
              }
            ]}
            cardHeight={350}
            cardWidth={500}
            maxVisible={5}
            autoAdvance={true}
          />
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 dark:bg-blue-700 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Don't leave your future to chance.</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Join thousands of students who found their perfect stream with SkillRoute. It's free, fast, and scientific.
            </p>
            <Link to="/quiz" className="inline-flex items-center gap-2 bg-white text-blue-700 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Start Your Journey <ArrowRight size={20} />
            </Link>
          </div>

          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          </div>
        </div>
      </section>

    </div>
  );
}