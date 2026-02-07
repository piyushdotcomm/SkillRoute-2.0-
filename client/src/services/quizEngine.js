
// Career Pathways Data Configuration
const CAREER_DATA = {
    "Science (PCM)": {
        streams: ["Engineering", "Architecture", "Data Science", "Aviation", "Defense"],
        description: "Focus on Physics, Chemistry, and Mathematics. Ideal for analytical minds who love problem-solving, technology, and understanding how the physical world works.",
        careers: ["Software Engineer", "Civil Engineer", "Data Scientist", "Architect", "Pilot", "Mathematician"],
        degrees: [
            {
                name: "B.Tech / B.E. (Computer Science, Mechanical, Civil, etc.)",
                description: "The standard pathway for engineering careers. Offers specialization in various technical fields.",
                average_salary_range: "₹4L - ₹20L P.A.",
                key_job_roles: ["Software Developer", "System Architect", "Network Engineer"],
                government_exams: ["IES", "GATE", "SSC JE", "ISRO/DRDO Exams"],
                growth_outlook: "High demand, especially in Tech and Infrastructure."
            },
            {
                name: "B.Arch (Bachelor of Architecture)",
                description: "Focuses on the art and science of designing buildings and structures.",
                average_salary_range: "₹3L - ₹15L P.A.",
                key_job_roles: ["Architect", "Interior Designer", "Urban Planner"],
                government_exams: ["CPWD Architect", "Town Planning Exams"],
                growth_outlook: "Steady growth with urbanization."
            }
        ],
        exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "MHT-CET", "NDA"],
        colleges: ["IITs (Bombay, Delhi, Madras)", "NITs", "BITS Pilani", "IIITs", "VIT Vellore", "COEP Pune"],
        skills: ["Problem Solving", "Mathematical Aptitude", "Coding/Logic", "Analytical Thinking"]
    },
    "Science (PCB)": {
        streams: ["Medicine", "Allied Health", "Biotechnology", "Psychology", "Environmental Science"],
        description: "Focus on Physics, Chemistry, and Biology. Perfect for those passionate about healthcare, living organisms, and research.",
        careers: ["Doctor (MBBS)", "Dentist", "Pharmacist", "Biotechnologist", "Forensic Scientist", "Nurse"],
        degrees: [
            {
                name: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
                description: "The primary medical degree for becoming a doctor.",
                average_salary_range: "₹6L - ₹25L P.A.",
                key_job_roles: ["Physician", "Surgeon", "Medical Officer"],
                government_exams: ["CMS (UPSC)", "Medical Officer Exams"],
                growth_outlook: "Evergreen field with high respect and stability."
            },
            {
                name: "B.Sc (Biotechnology / Microbiology)",
                description: "Focuses on the biological sciences and their application in technology and healthcare.",
                average_salary_range: "₹3L - ₹10L P.A.",
                key_job_roles: ["Research Associate", "Lab Technician", "Quality Control"],
                government_exams: ["CSIR NET", "ICMR JRF"],
                growth_outlook: "Rapidly growing in research and pharma sectors."
            }
        ],
        exams: ["NEET", "AIIMS Nursing", "CUET (for B.Sc)", "IISER Aptitude Test"],
        colleges: ["AIIMS New Delhi", "CMC Vellore", "JIPMER", "BHU", "Manipal University"],
        skills: ["Empathy", "Observation", "Scientific Analysis", "Patience"]
    },
    "Commerce": {
        streams: ["Accounting", "Finance", "Business Management", "Economics", "Banking"],
        description: "Focus on business, trade, and financial systems. Suited for those who like numbers, management, economy, and entrepreneurship.",
        careers: ["Chartered Accountant", "Investment Banker", "Financial Analyst", "Marketing Manager", "Entrepreneur"],
        degrees: [
            {
                name: "B.Com (Hons)",
                description: "A strong foundation in accounting, economics, and business law.",
                average_salary_range: "₹3L - ₹8L P.A.",
                key_job_roles: ["Accountant", "Financial Analyst", "Tax Consultant"],
                government_exams: ["RBI Grade B", "SBI PO", "IBPS PO", "SSC CGL"],
                growth_outlook: "Stable demand in all corporate sectors."
            },
            {
                name: "BBA (Bachelor of Business Administration)",
                description: "Prepares students for management roles and entrepreneurship.",
                average_salary_range: "₹3L - ₹10L P.A.",
                key_job_roles: ["HR Executive", "Marketing Executive", "Business Analyst"],
                government_exams: ["UPSC", "Management Trainee (PSUs)"],
                growth_outlook: "High growth potential with MBA."
            },
            {
                name: "CA / CS / CMA (Professional Courses)",
                description: "Prestigious professional certifications for accounting and company laws.",
                average_salary_range: "₹7L - ₹30L P.A.",
                key_job_roles: ["Auditor", "Company Secretary", "Cost Accountant"],
                government_exams: ["Often hired directly by PSUs"],
                growth_outlook: "Very high stability and income potential."
            }
        ],
        exams: ["CUET", "IPMAT", "CA Foundation", "CSFC", "NPAT"],
        colleges: ["SRCC Delhi", "St. Xaviers Mumbai", "NMIMS", "IIM Indore (Integrated)", "Christ University"],
        skills: ["Financial Literacy", "Data Analysis", "Communication", "Management"]
    },
    "Arts / Humanities": {
        streams: ["Law", "Public Administration", "Psychology", "Journalism", "Design", "Liberal Arts"],
        description: "Focus on human society, culture, and creative expression. Ideal for creative thinkers, communicators, and those interested in social change.",
        careers: ["Lawyer", "Civil Servant (IAS/IPS)", "Journalist", "Psychologist", "Graphic Designer", "Policy Makers"],
        degrees: [
            {
                name: "B.A. LL.B (Integrated Law)",
                description: "Five-year integrated course for legal practice.",
                average_salary_range: "₹5L - ₹15L P.A.",
                key_job_roles: ["Corporate Lawyer", "Litigator", "Legal Advisor"],
                government_exams: ["Judiciary Exams", "UPSC (Law Optional)", "JAG Entry (Defense)"],
                growth_outlook: "Growing specialization in Corporate and IP Law."
            },
            {
                name: "B.A. Psychology / Sociology",
                description: "Study of human behavior and society.",
                average_salary_range: "₹3L - ₹8L P.A.",
                key_job_roles: ["Counselor", "Social Worker", "HR Specialist"],
                government_exams: ["UPSC", "State PSC"],
                growth_outlook: "Rising awareness of mental health is boosting demand."
            },
            {
                name: "Batchler of Journalism & Mass Comm (BJMC)",
                description: "For careers in media, news, and digital content.",
                average_salary_range: "₹3L - ₹10L P.A.",
                key_job_roles: ["Reporter", "Editor", "Content Strategist"],
                government_exams: ["IIS (Indian Information Service)"],
                growth_outlook: "Digital media is expanding rapidly."
            }
        ],
        exams: ["CLAT", "AILET", "CUET", "NIFT Entrance", "NID DAT"],
        colleges: ["NLSIU Bangalore", "TISS Mumbai", "NIFT Delhi", "Lady Shri Ram College", "Miranda House", "JNU"],
        skills: ["Critical Thinking", "Communication", "Creativity", "Empathy", "Research"]
    },
    "Vocational / Skill-Based": {
        streams: ["IT & Software", "Digital Arts", "Hospitality", "Technical Trades"],
        description: "Practical, skill-focused pathways that prioritize hands-on expertise over traditional theory. Great for quick entry into the workforce.",
        careers: ["Web Developer", "Graphic Designer", "Hotel Manager", "Digital Marketer", "Network Technician"],
        degrees: [
            {
                name: "B.Voc (Bachelor of Vocation)",
                description: "Degree program with heavy emphasis on practical skills.",
                average_salary_range: "₹3L - ₹8L P.A.",
                key_job_roles: ["Skill Specialist", "Supervisor", "Technician"],
                government_exams: ["Skill-specific PSU tests", "Railways"],
                growth_outlook: "Govt push for 'Skill India' is creating opportunities."
            },
            {
                name: "Diploma in Engineering / Design",
                description: "Shorter duration, specialized technical training.",
                average_salary_range: "₹2.5L - ₹6L P.A.",
                key_job_roles: ["Junior Engineer", "Designer", "Support Specialist"],
                government_exams: ["SSC JE", "Loco Pilot"],
                growth_outlook: "Steady demand for skilled technicians."
            }
        ],
        exams: ["Polytechnic Entrances", "NCHMCT JEE (Hotel Mgmt)", "Design Aptitude Tests"],
        colleges: ["IHM Pusa", "Government Polytechnics", "National Skill Training Institutes"],
        skills: ["Practical Application", "Technical Proficiency", "Adaptability", "Creativity"]
    }
};

/**
 * Scoring logic based on answer weights
 * @param {Object} answers - Key-value pair of questionId: outputValue
 * @returns {Object} - Calculated result with detailed mappings
 */
export function calculateResults(answers) {
    // Initialize scores
    const scores = {
        "Science (PCM)": 0,
        "Science (PCB)": 0,
        "Commerce": 0,
        "Arts / Humanities": 0,
        "Vocational / Skill-Based": 0
    };

    // --- 1. Academic Strengths ---
    // Q1: Favorite Subject mapping
    const subMap = answers[1] || [];
    if (subMap.includes("Math")) { scores["Science (PCM)"] += 4; scores["Commerce"] += 2; }
    if (subMap.includes("Physics")) { scores["Science (PCM)"] += 4; scores["Science (PCB)"] += 2; }
    if (subMap.includes("Chemistry")) { scores["Science (PCM)"] += 3; scores["Science (PCB)"] += 4; }
    if (subMap.includes("Biology")) { scores["Science (PCB)"] += 5; }
    if (subMap.includes("History/Civics")) { scores["Arts / Humanities"] += 4; }
    if (subMap.includes("Economics")) { scores["Commerce"] += 4; scores["Arts / Humanities"] += 1; }
    if (subMap.includes("Computer/IT")) { scores["Science (PCM)"] += 3; scores["Vocational / Skill-Based"] += 3; }
    if (subMap.includes("Art/Design")) { scores["Arts / Humanities"] += 3; scores["Vocational / Skill-Based"] += 3; }

    // --- 2. Skill Inclination ---
    // Q2: Values: 'Analytical', 'Creative', 'People-oriented', 'Mechanical'
    const style = answers[2];
    if (style === "Analytical") { scores["Science (PCM)"] += 3; scores["Commerce"] += 2; }
    if (style === "Creative") { scores["Arts / Humanities"] += 3; scores["Vocational / Skill-Based"] += 3; }
    if (style === "People-oriented") { scores["Arts / Humanities"] += 3; scores["Commerce"] += 1; scores["Science (PCB)"] += 2; }
    if (style === "Hands-on/Practical") { scores["Vocational / Skill-Based"] += 4; scores["Science (PCB)"] += 2; scores["Science (PCM)"] += 2; }

    // --- 3. Work Environment ---
    // Q3: Environment preferences
    const env = answers[3];
    if (env === "Laboratory/Research") { scores["Science (PCM)"] += 2; scores["Science (PCB)"] += 4; }
    if (env === "Corporate Office") { scores["Commerce"] += 4; scores["Science (PCM)"] += 1; }
    if (env === "Field/Outdoor") { scores["Arts / Humanities"] += 2; scores["Vocational / Skill-Based"] += 2; }
    if (env === "Creative Studio") { scores["Arts / Humanities"] += 3; scores["Vocational / Skill-Based"] += 3; }

    // --- 4. Problem Solving Style ---
    // Q4: 'Logic & Numbers', 'Ethics & Philosophy', 'Business Strategy', 'Visuals & Spaces'
    const prob = answers[4];
    if (prob === "Logic & Numbers") { scores["Science (PCM)"] += 3; scores["Commerce"] += 3; }
    if (prob === "Ethics & Philosophy") { scores["Arts / Humanities"] += 4; }
    if (prob === "Business Strategy") { scores["Commerce"] += 5; }
    if (prob === "Visuals & Spaces") { scores["Arts / Humanities"] += 2; scores["Vocational / Skill-Based"] += 3; scores["Science (PCM)"] += 1; }

    // --- 5. Complexity Handling (Slider) ---
    // Q5: Interest in Technology (0-10)
    const techScore = answers[5] || 5;
    if (techScore > 7) { scores["Science (PCM)"] += 3; scores["Vocational / Skill-Based"] += 2; }

    // --- 6. Creativity (Slider) ---
    // Q6: Self-rated creativity (0-10)
    const creativeScore = answers[6] || 5;
    if (creativeScore > 7) { scores["Arts / Humanities"] += 3; scores["Vocational / Skill-Based"] += 2; }

    // --- 7. Social / Helping (Slider) ---
    // Q7: Desire to help people directly (0-10)
    const helpScore = answers[7] || 5;
    if (helpScore > 7) { scores["Science (PCB)"] += 3; scores["Arts / Humanities"] += 2; }

    // --- 8. Financial Motivation ---
    // Q8: 'High Stability', 'High Risk/High Reward', 'Passion over Money'
    const risk = answers[8];
    if (risk === "High Risk/High Reward") { scores["Commerce"] += 3; scores["Vocational / Skill-Based"] += 1; }
    if (risk === "High Stability") { scores["Science (PCB)"] += 2; scores["Science (PCM)"] += 2; scores["Commerce"] += 1; }
    if (risk === "Passion over Money") { scores["Arts / Humanities"] += 3; scores["Vocational / Skill-Based"] += 2; }

    // --- Determine Winner ---
    // Sort streams by score descending
    const sortedStreams = Object.entries(scores)
        .sort(([, a], [, b]) => b - a);

    // Pick top 2
    const topStream = sortedStreams[0][0];
    const secondStream = sortedStreams[1][0];

    const primaryData = CAREER_DATA[topStream];
    const secondaryData = CAREER_DATA[secondStream];

    // Construct recommendations object
    // Combining data from top 2 appropriately
    let recommendedDegrees = [...primaryData.degrees];
    if (sortedStreams[1][1] > (sortedStreams[0][1] * 0.8)) {
        // If second place is close (within 80% of top score), add its degrees too
        recommendedDegrees = [...recommendedDegrees, ...secondaryData.degrees];
    }

    return {
        recommended_streams: [topStream, secondStream],
        recommended_degrees: recommendedDegrees,
        suggested_colleges: [...new Set([...primaryData.colleges, ...secondaryData.colleges])].slice(0, 8),
        next_steps: [
            `Focus on improving skills in ${primaryData.skills.join(", ")}.`,
            `Research more about ${primaryData.degrees[0].name} and its scope.`,
            `Look up the syllabus for ${primaryData.exams[0]} to understand the preparation needed.`,
            `Talk to a counselor or senior who opted for ${topStream}.`
        ]
    };
}
