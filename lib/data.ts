/*
 * ╔══════════════════════════════════╗
 * ║   PORTFOLIO DATA — EDIT HERE     ║
 * ║   All content lives in this file ║
 * ╚══════════════════════════════════╝
 *
 * ➕ ADD A SKILL:
 *    Find the right category in skillCategories
 *    Add: { name: "SkillName", icon: "SiIconName",
 *           color: "#hexcolor" }
 *    Icon names: react-icons.github.io/react-icons/icons/si
 *
 * ➕ ADD A PROJECT:
 *    Add object to projects array
 *    Set github: "your-repo-url"
 *    Set github: "TODO_REPO_LINK" if not ready yet
 *
 * ➕ ADD EXPERIENCE:
 *    Add object to experiences array
 *    Follows same structure as existing entries
 *
 * ✏️ UPDATE RESUME:
 *    Change personalInfo.resume to new Google Drive
 *    direct download link
 *    Format: https://drive.google.com/uc?export=download&id=FILE_ID
 *
 * ✏️ UPDATE LINKEDIN:
 *    Change personalInfo.linkedin from "#"
 *    to your actual LinkedIn URL
 *
 * 🗑️ REMOVE ANYTHING:
 *    Just delete that object from its array.
 *    The UI updates automatically.
 */

export const personalInfo = {
  name: "Kishlay Choudhary",
  initials: "KC",
  role: "AI Engineer",
  taglines: [
    "AI Engineer",
    "GenAI Engineer",
    "Agentic AI Builder",
    "LLM Builder",
    "Python Developer",
    "Backend Developer"
  ],
  bio: "Building intelligent systems with LLMs, RAG pipelines, and Agentic AI. Turning complex AI concepts into production-ready applications that actually work.",
  journey:
    "I build at the intersection of practical engineering and applied AI. My focus is simple: ship intelligent systems that are robust, fast, and useful in the real world. From LLM orchestration and RAG pipelines to backend architecture with FastAPI, I care deeply about reliability, clarity, and measurable impact. I am actively looking for opportunities where I can help teams turn ambitious AI ideas into production-ready products.",
  email: "kishlaychoudhary1233@gmail.com",
  phone: "+91-9990687453",
  whatsapp: "919990687453",
  github: "https://github.com/thecoderji",
  linkedin: "https://www.linkedin.com/in/kishlaychoudhary/",
  leetcode: "https://leetcode.com/u/thecoderji/",
  resume:
    "https://drive.google.com/file/d/1U30j0MGHaZvki34vTxZqhmYBDk5j83ZI/view?usp=sharing",
  location: "Delhi, India",
  locationShort: "Delhi",
  openTo: "Pan India · Remote",
  openToShort: "Pan India + Remote",
  available: true,
  availableText: "Actively Looking — Available Immediately"
};

export type SkillItem = {
  name: string;
  icon: string;
  color: string;
};

export const skillCategories = [
  {
    category: "Languages & Core",
    emoji: "💻",
    skills: [
      { name: "Python", icon: "SiPython", color: "#3776AB" },
      { name: "Java", icon: "SiJava", color: "#007396" },
      { name: "HTML", icon: "SiHtml5", color: "#E34F26" },
      { name: "CSS", icon: "SiCss3", color: "#1572B6" },
      { name: "DSA", icon: "SiLeetcode", color: "#FFA116" },
      { name: "System Design", icon: "SiBookstack", color: "#00ff41" }
    ]
  },
  {
    category: "AI & LLM",
    emoji: "🤖",
    skills: [
      { name: "LangChain", icon: "SiLangchain", color: "#1C3C3C" },
      { name: "LangGraph", icon: "SiLangchain", color: "#1C3C3C" },
      { name: "Groq", icon: "SiOpenai", color: "#F55036" },
      { name: "OpenAI API", icon: "SiOpenai", color: "#ffffff" },
      { name: "Gemini API", icon: "SiGoogle", color: "#4285F4" },
      { name: "Claude API", icon: "SiAnthropic", color: "#D4A27F" },
      { name: "RAG", icon: "SiLangchain", color: "#00d4ff" },
      { name: "AI Agents", icon: "SiOpenai", color: "#7c3aed" },
      { name: "LLMs", icon: "SiOpenai", color: "#ffffff" },
      { name: "GenAI", icon: "SiGoogle", color: "#4285F4" },
      { name: "MCP", icon: "SiAnthropic", color: "#D4A27F" },
      { name: "RLHF", icon: "SiOpenai", color: "#10a37f" },
      { name: "Prompt Engineering", icon: "SiOpenai", color: "#00d4ff" },
      { name: "JSON Prompting", icon: "SiJson", color: "#f5a623" }
    ]
  },
  {
    category: "Backend & APIs",
    emoji: "⚙️",
    skills: [
      { name: "FastAPI", icon: "SiFastapi", color: "#009688" },
      { name: "Streamlit", icon: "SiStreamlit", color: "#FF4B4B" },
      { name: "Pydantic", icon: "SiPydantic", color: "#E92063" },
      { name: "REST APIs", icon: "SiPostman", color: "#FF6C37" },
      { name: "Docker", icon: "SiDocker", color: "#2496ED" }
    ]
  },
  {
    category: "Vector Databases",
    emoji: "🗄️",
    skills: [
      { name: "FAISS", icon: "SiMeta", color: "#0467DF" },
      { name: "Pinecone", icon: "SiPinecone", color: "#00C4A0" },
      { name: "ChromaDB", icon: "SiDatabricks", color: "#FF3621" }
    ]
  },
  {
    category: "ML & Data",
    emoji: "📊",
    skills: [
      { name: "NumPy", icon: "SiNumpy", color: "#013243" },
      { name: "Pandas", icon: "SiPandas", color: "#150458" }
    ]
  },
  {
    category: "Dev Tools",
    emoji: "🛠️",
    skills: [
      { name: "Git", icon: "SiGit", color: "#F05032" },
      { name: "GitHub", icon: "SiGithub", color: "#ffffff" },
      { name: "VS Code", icon: "SiVisualstudiocode", color: "#007ACC" }
    ]
  },
  {
    category: "Soft Skills",
    emoji: "🤝",
    skills: [
      { name: "Leadership", icon: "SiLinear", color: "#5E6AD2" },
      { name: "Ownership", icon: "SiLinear", color: "#00d4ff" },
      { name: "Accountability", icon: "SiLinear", color: "#7c3aed" },
      { name: "Problem Solving", icon: "SiLeetcode", color: "#FFA116" },
      { name: "Team Work", icon: "SiLinear", color: "#10a37f" },
      { name: "Adaptive Learning", icon: "SiLinear", color: "#F55036" }
    ]
  }
];

export const experiences = [
  {
    role: "Research Associate - AI",
    company: "Keywords Studios",
    location: "Gurugram, Haryana",
    duration: "August 2025 – June 2026",
    type: "Full-time",
    tags: ["Multi-Agent Systems", "RLHF", "CoT", "AI Safety", "LLMOps", "Prompt Engineering"],
    bullets: [
      "Architected and optimized end-to-end LLM training pipelines targeting low latency, high throughput, and token efficiency designing structured JSON-based tool schemas to reduce token overhead and maximize model output performance.",
      "Designed hierarchical multi-agent orchestration systems coordinating specialized LLMs running in parallel on a single user task, optimizing result quality, reducing latency, and improving overall pipeline efficiency.",
      "Spearheaded RLHF and Human-in-the-Loop (HITL) training pipelines refining model behaviour through reward and loss signal feedback loops, consistently achieving the highest quality scores in the project team.",
      "Integrated Chain-of-Thought (CoT) reasoning pipelines to improve model interpretability, trace internal decision behaviour, and enhance reasoning accuracy across coding, tool-use, and multi-step task evaluations.",
      "Built real-time observation and tracking loops to monitor agent consistency, surface logical failure points, and iteratively improve model reliability across end-to-end agentic workflows.",
      "Trained and evaluated models on AI Governance and Safety Alignment principles ensuring outputs remained ethical, legally compliant, and resistant to misuse, harmful generation, and policy violations in secure deployment environments."
    ]
  },
  {
    role: "AI/ML Engineer Trainee",
    company: "Frisson Devhub",
    location: "Noida, Uttar Pradesh",
    duration: "May 2025 – June 2025",
    type: "Internship",
    tags: ["Python", "Machine Learning", "Deep Learning", "Neural Networks"],
    bullets: [
      "Gained practical exposure to Python, Machine Learning, Deep Learning, and Neural Networks through hands-on assignments and project simulations.",
      "Assisted in AI model development and deployment tasks, building a strong foundation in real-world AI workflows under professional mentorship."
    ]
  }
];

export const projects = [
  {
    title: "Context-Aware RAG Chatbot",
    badge: "RAG · PRODUCTION",
    badgeColor: "#00d4ff",
    stack: "FastAPI + Gemini API + FAISS",
    description:
      "LLM-powered context-aware RAG chatbot with a high-performance FastAPI backend for low-latency retrieval. Features a scalable ingestion pipeline for diverse file formats with advanced prompt optimization to minimize hallucinations and ensure enterprise-grade reliability.",
    tags: ["Python", "FastAPI", "LangChain", "FAISS", "Gemini API", "Pydantic"],
    github: "TODO_REPO_LINK",
    live: ""
  },
  {
    title: "Funnx.AI — AI Chat Platform",
    badge: "FULL STACK · OPEN SOURCE",
    badgeColor: "#7c3aed",
    stack: "Python + Streamlit + OpenRouter",
    description:
      "Open-source AI chat platform with multi-model support: Gemini (official API), DeepSeek (via OpenRouter), and a hybrid TryBoth mode. Features secure Google/email auth, clean dark-mode UI, toggleable Research Mode, and is fully hosted on Render using free-tier resources.",
    tags: ["Python", "Streamlit", "OpenRouter", "Gemini API", "DeepSeek", "HTML/CSS"],
    github: "https://github.com/thecoderji/FunnX.Ai",
    live: ""
  }
];

export const certifications = [
  {
    name: "Full Stack Generative & Agentic AI with Python",
    issuer: "Udemy",
    instructor: "Hitesh Choudhary & Piyush Garg",
    icon: "SiUdemy",
    color: "#A435F0",
    link: "ADD_YOUR_UDEMY_CERT_LINK_HERE"
  },
  {
    name: "Supervised Machine Learning: Regression & Classification",
    issuer: "Coursera",
    instructor: "Andrew Ng — DeepLearning.AI",
    icon: "SiCoursera",
    color: "#0056D2",
    link: "ADD_YOUR_COURSERA_CERT_LINK_HERE"
  },
  {
    name: "Python Programming Bootcamp",
    issuer: "Udemy",
    instructor: "",
    icon: "SiUdemy",
    color: "#A435F0",
    link: "ADD_YOUR_CERT_LINK_HERE"
  },
  {
    name: "Java Training",
    issuer: "Softpro India",
    instructor: "",
    icon: "SiJava",
    color: "#007396",
    link: "ADD_YOUR_CERT_LINK_HERE"
  }
];

export const education = {
  degree: "Bachelor of Technology — Computer Science & Engineering",
  college: "Mahatma Gandhi Mission's College of Engineering and Technology",
  location: "Noida, Uttar Pradesh",
  duration: "November 2021 – June 2025",
  short: "B.Tech CSE, MGM College (2021-2025)"
};

export const stats = [
  { value: 2, suffix: "+", label: "Projects Built" },
  { value: 1, suffix: " yr", label: "AI Domain Experience" },
  { value: 500, suffix: "+", label: "Hours of Learning" },
  { value: 15, suffix: "+", label: "Technologies" }
];
