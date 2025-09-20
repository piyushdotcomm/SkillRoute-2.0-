import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- FIXED IMPORTS START ---
// Consolidated imports for FontAwesome 5 (fa)
import { FaGraduationCap, FaUniversity, FaRegLightbulb, FaRobot, FaCalendarAlt, FaStar, FaHandshake, FaSearch, FaClipboardList, FaComments, FaBriefcaseMedical, FaBalanceScale, FaChartLine } from 'react-icons/fa';
// Imports for FontAwesome 6 (fa6)
import { FaLaptopCode } from "react-icons/fa6";
// --- FIXED IMPORTS END ---


// Animation variants for staggered lists and grids
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Component for the alternating "How It Works" sections
const HowToStep = ({ icon: IconComponent, title, description, image, reverse = false }) => {
  const stepMotion = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { once: true, amount: 0.3 }
  };

  const content = (
    <motion.div
      className="space-y-4 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.01] bg-card"
      whileHover={{ y: -5 }} // Subtle lift on hover
    >
      <div className="flex items-center gap-4 text-primary">
        <IconComponent className="text-4xl" />
        <h3 className="h3 font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <img src={image} alt={title} className="rounded-3xl shadow-2xl w-full h-auto object-cover border border-border" />
    </motion.div>
  );

  return (
    <motion.div {...stepMotion} className="grid md:grid-cols-2 gap-12 items-center">
      {reverse ? (
        <>
          {imageContent}
          {content}
        </>
      ) : (
        <>
          {content}
          {imageContent}
        </>
      )}
    </motion.div>
  );
};


export default function Home() {
  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* ========== Hero Section ========== */}
      <section className="grid md:grid-cols-2 gap-10 items-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="h1 leading-tight">Find Your Perfect <span className="text-primary-foreground drop-shadow-md">Course & Career Path</span></h1>
          <p className="lead max-w-lg text-muted-foreground">
            A playful, AI-guided platform helping Indian students map interests to real university programs, government colleges, and future job roles. Take a quick quiz and get a tailored roadmap.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/quiz" className="btn btn-primary text-lg px-8 py-3.5 shadow-lg hover:shadow-xl transition-all">Take Quick Quiz</Link>
            <Link to="/directory" className="btn-outline px-6 py-3 rounded-2xl font-semibold border-2 border-primary-foreground hover:bg-primary-foreground/10 transition-all">Browse Colleges</Link>
          </div>
          <motion.div
            className="flex gap-3 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">AI-Powered</span>
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Govt. Colleges</span>
            <span className="badge bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Career Roadmaps</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative hidden md:block"
        >
          {/* Placeholder for an appealing hero illustration/image */}
          <img
            src="https://images.unsplash.com/photo-1596496660144-d1385cc9d264?q=80&w=1974&auto=format&fit=crop"
            alt="Students collaborating and learning with technology"
            className="rounded-3xl shadow-2xl border border-border"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-primary/10 dark:bg-primary/20 p-4 rounded-xl shadow-lg border border-primary/30"
          >
            <h3 className="font-semibold text-lg text-primary-foreground">Why CareerPath?</h3>
            <ul className="text-sm space-y-2 mt-2 text-muted-foreground">
              <li className="flex items-center gap-2">✓ AI-driven personalized insights</li>
              <li className="flex items-center gap-2">✓ Comprehensive college database</li>
              <li className="flex items-center gap-2">✓ Critical exam date tracking</li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== How It Works Section - Detailed Steps ========== */}
      <section className="space-y-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="h2 mb-4 text-primary-foreground">Your Clear Path: How to Use CareerPath</h2>
          <p className="text-muted-foreground text-lg">
            Navigating your academic future has never been easier. Here's a step-by-step guide to get the most out of our platform.
          </p>
        </motion.div>
        <HowToStep
            icon={FaRegLightbulb}
            title="1. Take the AI-Powered Quiz"
            description="Click the 'Take Quick Quiz' button to begin. Answer insightful questions about your interests, aptitudes, and career aspirations. Our intelligent AI then processes your responses to craft a highly personalized profile and recommend ideal academic paths."
            image="https://images.unsplash.com/photo-1542831371-d108990326ab?q=80&w=2070&auto=format&fit=crop" // Image for quiz taking
        />
        <HowToStep
            icon={FaUniversity}
            title="2. Explore & Filter Colleges"
            description="Dive into our extensive directory of government colleges across India. Utilize advanced search filters to narrow down institutions by name, district, program type, and facilities. Get all critical details like courses offered, eligibility, and official links in one convenient place."
            image="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop" // Image for college browsing
            reverse={true}
        />
        <HowToStep
            icon={FaGraduationCap}
            title="3. Review Your Personalized Roadmap"
            description="Post-quiz, an interactive roadmap will be generated, outlining recommended streams, specific courses, and potential career trajectories perfectly aligned with your quiz results. This living document helps you visualize your academic journey and future opportunities."
            image="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" // Image for roadmap
        />
        <HowToStep
            icon={FaRobot}
            title="4. Engage with Our AI Chatbot"
            description="Got specific questions or need instant clarifications? Our friendly AI chatbot is at your service 24/7. Whether it's about admission processes, course details, or career advice, get intelligent responses to guide your decisions. "
            image="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop" // Image for chatbot interaction
            reverse={true}
        />
         <HowToStep
            icon={FaCalendarAlt}
            title="5. Track Key Dates & Deadlines"
            description="Never miss an application deadline or exam registration again! Our integrated timeline tracker keeps you informed about crucial dates for competitive exams, university admissions, and scholarship applications, ensuring you're always prepared."
            image="https://images.unsplash.com/photo-1581090425026-b81643c72b2d?q=80&w=1974&auto=format&fit=crop" // Image for calendar/deadlines
        />
      </section>

      {/* ========== Our Core Features Section ========== */}
      <section className="py-16 bg-gradient-to-br from-background via-card to-background rounded-3xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="h2 mb-4 text-primary-foreground">Unlock Your Potential with Our Core Features</h2>
          <p className="text-muted-foreground text-lg">
            CareerPath is built with powerful tools designed to simplify your decision-making and propel your academic journey forward.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <FaRegLightbulb className="text-5xl text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">AI-Driven Quiz</h3>
            <p className="text-muted-foreground">Get accurate course and career recommendations based on your unique profile and interests.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <FaSearch className="text-5xl text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Advanced College Search</h3>
            <p className="text-muted-foreground">Explore a vast database of government colleges with intelligent filtering options by district, courses, and facilities.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <FaClipboardList className="text-5xl text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Personalized Roadmaps</h3>
            <p className="text-muted-foreground">Receive a clear, actionable plan outlining suitable streams, courses, and job roles to guide your next steps.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <FaComments className="text-5xl text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Interactive Chatbot</h3>
            <p className="text-muted-foreground">Get instant answers and guidance on admissions, career queries, and platform usage from our helpful AI.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <FaCalendarAlt className="text-5xl text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Exam & Admission Tracker</h3>
            <p className="text-muted-foreground">Stay updated with critical dates for entrance exams, application deadlines, and counseling sessions.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <FaHandshake className="text-5xl text-primary mb-4" />
            <h3 className="font-bold text-xl mb-2">Career Insights</h3>
            <p className="text-muted-foreground">Gain valuable insights into job market trends, salary expectations, and growth opportunities for various professions.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== Explore Popular Streams Section ========== */}
      <section className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="h2 mb-4 text-primary-foreground">Discover In-Demand Career Streams</h2>
          <p className="text-muted-foreground text-lg">
            Uncover the most popular and promising academic streams that lead to fulfilling career opportunities in India.
          </p>
        </motion.div>
        <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div variants={itemVariants} className="card p-5 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
                <FaLaptopCode className="text-5xl text-primary mx-auto mb-3" />
                <h4 className="font-bold text-lg">Engineering & Technology</h4>
                <p className="text-sm text-muted-foreground">Innovate and build the digital and physical infrastructure of tomorrow.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card p-5 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
                <FaBriefcaseMedical className="text-5xl text-primary mx-auto mb-3" />
                <h4 className="font-bold text-lg">Medical & Healthcare</h4>
                <p className="text-sm text-muted-foreground">Serve humanity and advance medical science to improve lives.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card p-5 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
                <FaBalanceScale className="text-5xl text-primary mx-auto mb-3" />
                <h4 className="font-bold text-lg">Commerce & Management</h4>
                <p className="text-sm text-muted-foreground">Lead businesses, manage finances, and drive economic growth.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card p-5 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
                <FaChartLine className="text-5xl text-primary mx-auto mb-3" />
                <h4 className="font-bold text-lg">Arts & Humanities</h4>
                <p className="text-sm text-muted-foreground">Explore creativity, critical thinking, and social impact through diverse disciplines.</p>
            </motion.div>
        </motion.div>
      </section>

      {/* ========== Testimonials Section ========== */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="h2 mb-4 text-primary-foreground">Hear From Our Happy Students</h2>
          <p className="text-muted-foreground text-lg">
            Real stories from students who found their perfect path with CareerPath.
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="card p-8 italic border-l-4 border-primary shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <FaStar className="text-yellow-500 text-xl mb-3" />
            <p className="text-lg text-muted-foreground leading-relaxed">"CareerPath was a lifesaver! I was so confused about what to do after 12th, but the quiz gave me options I had never even considered. The personalized roadmap was incredibly detailed and easy to follow."</p>
            <p className="font-bold not-italic text-right mt-6 text-foreground">- Priya Sharma, Aspiring Engineer</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-8 italic border-l-4 border-primary shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <FaStar className="text-yellow-500 text-xl mb-3" />
            <p className="text-lg text-muted-foreground leading-relaxed">"The government college directory with its powerful filters is a game-changer. I easily found all the top engineering colleges in my state, along with their admission deadlines. This platform saved me countless hours of research."</p>
            <p className="font-bold not-italic text-right mt-6 text-foreground">- Rohan Kapoor, Computer Science Student</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== Final CTA Section ========== */}
      <motion.section
        className="text-center bg-gradient-to-r from-primary-foreground to-primary-background border border-border p-10 md:p-16 rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="h2 mb-4 text-white drop-shadow">Ready to Discover Your Future?</h2>
        <p className="max-w-xl mx-auto mb-8 text-white/90 text-lg">
          Stop the guesswork and confusion. Get a clear, AI-driven plan that aligns with your true potential and opens doors to exciting career opportunities.
        </p>
        <Link to="/quiz" className="btn btn-secondary text-xl px-10 py-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">Start Your Free Quiz Now</Link>
      </motion.section>
    </div>
  );
}