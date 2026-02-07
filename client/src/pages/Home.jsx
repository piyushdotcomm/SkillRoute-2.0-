import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Building2,
  GraduationCap,
  Bot,
  Calendar,
  Search,
  ClipboardList,
  MessageCircle,
  Briefcase,
  Laptop,
  Stethoscope,
  Scale,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const HowToStep = ({ icon: Icon, title, description, image, reverse = false }) => {
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-dense' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`bg-card p-8 rounded-3xl border border-border shadow-soft hover:shadow-lg transition-all duration-300 group ${reverse ? 'md:col-start-2' : ''}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`relative ${reverse ? 'md:col-start-1' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl -z-10" />
        <img src={image} alt={title} className="rounded-3xl shadow-xl w-full aspect-video object-cover border border-border/50 bg-muted" />
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="space-y-32 pb-20">

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh] pt-10 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Career Guidance
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Find Your Ideal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Career Path</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Map your interests to real-world opportunities. Get personalized course recommendations, college insights, and a tailored roadmap for your future.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/quiz" className="btn h-14 px-8 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Take the Quiz <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/directory" className="btn-secondary h-14 px-8 text-lg border-2 border-transparent hover:border-border transition-all">
              Explore Colleges
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-4 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> <span>Personalized Roadmap</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> <span>Government Verified</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-[2.5rem] p-8 border border-border/50 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[100px] -z-10 rounded-full" />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Students learning"
              className="rounded-3xl shadow-lg w-full h-auto"
            />

            <div className="absolute -bottom-10 -right-10 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs animate-float">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">95% Accuracy</p>
                  <p className="text-sm text-muted-foreground">in career predictions based on student profiles.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your Journey Starts Here</h2>
          <p className="text-muted-foreground text-lg">Four simple steps to clarify your future and take the first step towards success.</p>
        </div>

        <div className="space-y-24">
          <HowToStep
            icon={Bot}
            title="1. AI-Powered Assessment"
            description="Answer insightful questions about your interests, strengths, and preferences. Our advanced AI analyzes your profile to understand your unique potential."
            image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          />
          <HowToStep
            icon={GraduationCap}
            title="2. Get Matched"
            description="Receive personalized recommendations for degree streams, colleges, and career paths that perfectly align with your assessment results."
            image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
            reverse={true}
          />
          <HowToStep
            icon={Building2}
            title="3. Explore Institutions"
            description="Browse our comprehensive directory of government and top-tier colleges. Filter by location, ranking, and facilities to find your dream campus."
            image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
          />
          <HowToStep
            icon={Calendar}
            title="4. Stay on Track"
            description="Never miss a deadline. Our timeline feature keeps you updated on entrance exams, application dates, and counseling schedules."
            image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop"
            reverse={true}
          />
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 bg-muted/30 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-16 lg:px-16 rounded-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">Powerful tools designed to simplify your academic decision-making process.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Lightbulb, title: "Smart Recommendations", desc: "Tailored course and college suggestions." },
              { icon: Search, title: "Deep Search", desc: "Advanced filters to find specific colleges." },
              { icon: ClipboardList, title: "Action Plans", desc: "Step-by-step roadmap for your career." },
              { icon: MessageCircle, title: "24/7 AI Chat", desc: "Instant answers to all your queries." },
              { icon: Calendar, title: "Event Tracker", desc: "Notifications for exams and deadlines." },
              { icon: TrendingUp, title: "Market Insights", desc: "Data on salary trends and job growth." }
            ].map((item, i) => (
              <motion.div variants={itemVariants} key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Streams */}
      <section className="text-center space-y-12">
        <h2 className="text-3xl font-bold tracking-tight">Trending Career Paths</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Laptop, title: "Engineering", color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: Stethoscope, title: "Medical", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { icon: Scale, title: "Law", color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: Briefcase, title: "Management", color: "text-purple-500", bg: "bg-purple-500/10" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/5 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/10">
                <item.icon size={32} />
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-20 text-center text-primary-foreground shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold tracking-tight">Ready to Shape Your Future?</h2>
          <p className="text-primary-foreground/90 text-xl max-w-xl mx-auto">
            Join thousands of students making informed career decisions with SkillRoute's AI-powered guidance.
          </p>
          <Link to="/quiz" className="inline-flex items-center btn bg-background text-foreground hover:bg-surfaceAlt h-14 px-10 text-lg shadow-xl hover:scale-105 transition-all">
            Start Free Quiz Now <ArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </section>

    </div>
  );
}