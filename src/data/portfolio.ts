/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit text in this file only; components read from it.
 *  Anything starting with "TODO" is a placeholder: the UI shows
 *  it as a disabled link / "coming soon" block until you fill it.
 * ─────────────────────────────────────────────────────────────
 */

export type Link = { label: string; href: string };

export type Experience = {
  role: string;
  org: string;
  period?: string;
  points: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  score: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  featured?: boolean;
  stack: string[];
  highlights: string[];
  /** Path under /public, e.g. "/projects/smart-campus.png". Leave undefined for a styled placeholder. */
  image?: string;
  links: { demo: string; github: string };
  caseStudy: {
    overview: string;
    problem: string;
    approach: string;
    /** Steps for the animated architecture flow. Leave empty for a diagram placeholder. */
    flow?: string[];
    /** The flow step that pauses for a human decision (drawn dashed). */
    humanStep?: string;
    challenges: string;
    learnings: string;
  };
};

export type SkillGroup = { title: string; items: string[] };
export type Certification = { title: string; issuer: string; date: string };

/** True when a value is still a placeholder. */
export const isTodo = (value?: string) => !value || value.startsWith("TODO");

export const profile = {
  name: "Mohith L A",
  shortName: "Mohith",
  role: "Full-Stack Developer",
  avatar: "/profile.jpg", // TODO: add your photo at public/profile.jpg
  resume: "/resume.pdf", // TODO: add your résumé at public/resume.pdf
  location: "Based in Karnataka, India",
  email: "mohithla24@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohith-l-a-041290293",
  github: "https://github.com/Mohith946",
  /** Used for the GitHub stats card. e.g. "Mohith946" */
  githubUsername: "Mohith946",
  /**
   * Shown if the GitHub API is unreachable at build time.
   */
  githubFallback: { repos: 12, followers: 4 },
  /** Your production URL, used for SEO. Can also be set with NEXT_PUBLIC_SITE_URL. */
  siteUrl: "https://TODO-your-domain.com",
  copyrightYear: 2026,
};

export const seo = {
  title: "Mohith L A — Full-Stack Developer",
  description:
    "Mohith L A is a full-stack developer and final-year CSE student at NMAM Institute of Technology, building AI-powered platforms, from multi-agent schedulers to real-time vision dashboards.",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  status: "Open to SDE / Full-Stack roles",
  headline: { before: "I build systems that", accent: "think", after: "and scale." },
  intro: {
    before: "I'm",
    name: "Mohith L A",
    after:
      ", a full-stack developer building AI-powered platforms, from multi-agent schedulers to real-time vision dashboards. B.Tech CSE at NMAM Institute of Technology, Nitte (2023–2027).",
  },
  nowBuilding: {
    title: "Smart Campus Agent System",
    subtitle: "LangGraph · OR-Tools · FastAPI",
  },
  stats: [
    { label: "Projects", value: "3", subtitle: "AI + full-stack" },
    { label: "CGPA", value: "8.17", subtitle: "NMAMIT, CSE" },
  ],
  workingWith: ["React", "Next.js", "Python", "FastAPI", "MongoDB", "YOLOv8"],
  marquee: [
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
    "LangGraph",
    "OR-Tools",
    "YOLOv8",
    "OpenCV",
    "WebSockets",
    "Spring Boot",
    "MongoDB",
    "PostgreSQL",
    "Tailwind",
  ],
};

export const about = {
  paragraphs: [
    "Computer Science Engineering student with hands-on experience in full-stack development and software engineering. Strong foundation in C, C++, Java, data structures, OOP, DBMS, operating systems, and computer networks, with experience building real-world projects and working with modern development frameworks.",
    "Outside of code, I enjoy video editing, cricket, gaming, and exploring emerging technologies.",
  ],
};

export const experience: Experience[] = [
  {
    role: "Full Stack Development Intern",
    org: "Thaniya Technologies",
    period: "Jun – Jul 2026",
    points: [
      "Completed a 2-month full-stack internship, building and shipping features using modern web development practices.",
      "Worked on production-style workflows: REST API design, database integration, and responsive UI implementation.",
    ],
  },
  {
    role: "Core Member",
    org: "Finite Loop Club (FLC), NMAMIT",
    points: ["Contributing to coding events, technical workshops, and problem-solving activities."],
  },
];

export const education: Education[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "NMAM Institute of Technology, Nitte",
    period: "2023 – 2027",
    score: "CGPA 8.17",
  },
  {
    degree: "PU (PCMB)",
    school: "Sri Vidhyabharathi PU College, Shivamogga",
    period: "2021 – 2023",
    score: "89.5%",
  },
];

const caseStudyTodo = "TODO: Write this section.";

export const projects: Project[] = [
  {
    slug: "smart-campus-agent-system",
    title: "Smart Campus Agent System",
    subtitle: "AI-Driven Campus Operations Platform",
    summary:
      "An AI timetable engine and multi-agent leave & substitution workflow for campus operations.",
    featured: true,
    stack: ["Python", "FastAPI", "LangGraph", "Google OR-Tools (CP-SAT)", "Next.js"],
    highlights: [
      "Built an AI timetable engine using Google OR-Tools CP-SAT (12+ hard constraints, weighted soft objectives) with a natural-language assistant that turns single-sentence requests into validated, multi-step timetable updates.",
      "Designed a human-in-the-loop leave & substitution workflow in LangGraph, where a multi-agent supervisor builds clash-free period-exchange plans and pauses for HOD approval before notifying affected teachers.",
    ],
    links: { demo: "TODO_DEMO_URL", github: "TODO_GITHUB_REPO_URL" },
    caseStudy: {
      overview:
        "A campus operations platform that combines constraint-based timetable generation with a multi-agent workflow for handling teacher leave and substitutions.",
      problem: caseStudyTodo,
      approach: caseStudyTodo,
      flow: [
        "Teacher leave request",
        "Supervisor agent",
        "Substitution planner",
        "Clash check",
        "HOD approval",
        "Notify teachers",
      ],
      humanStep: "HOD approval",
      challenges: caseStudyTodo,
      learnings: caseStudyTodo,
    },
  },
  {
    slug: "ai-surveillance-dashboard",
    title: "AI Surveillance Dashboard",
    subtitle: "Object Detection System",
    summary:
      "Real-time object detection and monitoring dashboard with low-latency WebSocket analytics.",
    stack: ["React.js", "Python", "YOLOv8", "OpenCV", "WebSockets", "Tailwind CSS"],
    highlights: [
      "Real-time AI surveillance dashboard for live object detection and monitoring using YOLOv8 and OpenCV with optimized video streaming.",
      "WebSocket-based real-time analytics dashboard for low-latency monitoring.",
    ],
    links: { demo: "TODO_DEMO_URL", github: "TODO_GITHUB_REPO_URL" },
    caseStudy: {
      overview:
        "A live monitoring dashboard that runs YOLOv8 object detection over video streams and pushes analytics to the browser over WebSockets.",
      problem: caseStudyTodo,
      approach: caseStudyTodo,
      challenges: caseStudyTodo,
      learnings: caseStudyTodo,
    },
  },
  {
    slug: "police-theft-management-system",
    title: "Police Theft Management System",
    subtitle: "MERN Incident & Recovery Platform",
    summary:
      "Incident reporting platform with automated suspect matching and QR-based property verification.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    highlights: [
      "MERN platform with JWT authentication, role-based access, and incident reporting.",
      "Automated suspect-matching engine using geospatial proximity, crime categories, and physical attributes, plus QR-code-based property verification for faster asset recovery.",
    ],
    links: { demo: "TODO_DEMO_URL", github: "TODO_GITHUB_REPO_URL" },
    caseStudy: {
      overview:
        "A MERN platform for reporting theft incidents, matching suspects, and verifying recovered property.",
      problem: caseStudyTodo,
      approach: caseStudyTodo,
      challenges: caseStudyTodo,
      learnings: caseStudyTodo,
    },
  },
];

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["Java", "Python", "C", "C++", "JavaScript", "TypeScript"] },
  { title: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "Hibernate", "Spring Data JPA"],
  },
  { title: "Databases", items: ["MySQL", "MongoDB", "Oracle", "PostgreSQL"] },
  {
    title: "AI / ML",
    items: ["YOLOv8", "OpenCV", "LangGraph", "Google OR-Tools", "Machine Learning"],
  },
  { title: "Tools", items: ["Git", "GitHub", "Maven", "Postman", "VS Code", "STS"] },
  {
    title: "Concepts",
    items: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering"],
  },
];

export const certifications: Certification[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "Aug 2025",
  },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte (Forage)", date: "Jun 2025" },
  { title: "C++ Programming (Beginner to Beyond)", issuer: "Udemy", date: "Jun 2024" },
  { title: "Complete Python Pro Bootcamp", issuer: "Udemy", date: "Jun 2024" },
];

export const contact = {
  heading: { before: "Let's build", accent: "something", after: "together." },
  blurb:
    "I'm looking for SDE and full-stack roles. If you have an opportunity or just want to talk shop, my inbox is open.",
};
