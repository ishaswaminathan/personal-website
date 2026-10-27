/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about the portfolio here.
 *  Layouts read from this file, so adding an experience, project,
 *  or skill is just adding an object to the right array.
 *
 *  Anything marked TODO is a placeholder waiting for real details.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: { first: "Isha", last: "Swaminathan" },
  initials: "IS",
  url: "https://ishaswaminathan.com",
  location: "Pittsburgh, PA · Dallas, TX",
  headline: "Where Data Meets Design, Strategy, and Innovation.",
  // Words in the headline that get the animated gradient treatment
  headlineAccents: ["Data", "Strategy,", "Innovation."],
  // Hero intro: one string per paragraph
  intro: [
    "I'm a student at Carnegie Mellon studying Information Systems with a concentration in Data Analytics. I love working where data, technology, and policy meet, building systems that help people make better decisions!",
  ],
  roles: [
    "Aspiring Data Analyst",
    "Product Thinker",
    "Technology Enthusiast",
    "Creative Problem Solver",
    "Data-Driven Strategist",
  ],
  signatureTagline: "Curious by nature. Analytical by approach. Driven by impact.",
  availability: "Open to Summer 2027 internships", // TODO: confirm or edit
  portrait: "/images/portrait.jpg",
  campusPhoto: "/images/tartans.jpg",
  contact: {
    email: "isha.swaminathan.1@gmail.com",
    linkedin: "https://www.linkedin.com/in/ishaswaminathan/",
    github: "https://github.com/ishaswaminathan",
  },
};

export const about = {
  headline: ["Curiosity Drives Me.", "Data Guides Me."],
  story: [
    "I believe thoughtful technology can do real good: it can cut through complexity, close gaps in access, and give people more control over the tools they rely on every day.",
    "I'm most drawn to the point where systems meet the people who use them, and to making that experience simpler, safer, and fairer.",
    "So far that's taken me from product analytics at Tyler Technologies to accessibility research at CMU's VariAbility Lab and policy research at the A.J. Drexel Autism Institute. Each one taught me the same lesson from a different angle: the best solutions pair business thinking with technical execution.",
    "Always happy to connect, whether we share interests, you're working on something cool, or you just want to say hi!",
  ],
  pillars: [
    {
      title: "Data",
      blurb:
        "I've traced why a museum site sold so few tickets with SQL, and coded gaze recordings to see where people really look. Good data is just a well-asked question.",
    },
    {
      title: "Product",
      blurb:
        "At Tyler Technologies I sat in sprint planning, retros, and client UI/UX sessions for software used by courts nationwide. I always start with who it's for.",
    },
    {
      title: "Strategy",
      blurb:
        "From MedConnect's value chain to the funnel behind MonoMuse, I like connecting what people need to what a business needs, and backing it with evidence.",
    },
    {
      title: "Technology",
      blurb:
        "I build the things I design: three production dashboards, full websites, and agentic AI that automates real work. Shipping keeps my ideas honest.",
    },
  ],
};

export type Experience = {
  role: string;
  org: string;
  team?: string;
  location: string;
  dates: string;
  kind: "Work" | "Research";
  summary: string;
  achievements: string[];
  skills: string[];
};

export const experience: Experience[] = [
  {
    role: "Product Analyst Intern",
    org: "Tyler Technologies",
    team: "Enterprise Justice",
    location: "Plano, TX",
    dates: "May 2026 – Aug 2026",
    kind: "Work",
    summary:
      "Product analytics for court and public-safety software used by justice organizations nationwide.",
    achievements: [
      "Designed and built 3 production-grade dashboards from scratch (HTML, CSS, JavaScript), integrating 5+ enterprise tools including Jira and Confluence to track OCR and cloud-caching rollouts across 100+ clients and centralize company-wide productivity data.",
      "Coordinated across the full agile product lifecycle (sprint planning, reviews, retrospectives, and client and UI/UX sessions), facilitating product decisions for court and public-safety solutions serving justice organizations nationwide.",
    ],
    skills: ["Product Analytics", "JavaScript", "Jira", "Confluence", "Agile"],
  },
  {
    role: "Database Management Assistant",
    org: "Carnegie Mellon University",
    team: "Alumni Engagement Office",
    location: "Pittsburgh, PA",
    dates: "Apr 2026 – Present",
    kind: "Work",
    summary:
      "Keeping alumni volunteer and event data accurate, centralized, and useful for engagement.",
    achievements: [
      "Administer alumni volunteer database operations, processing interest forms and agreements to advance university engagement initiatives, and apply agentic AI to automate the task.",
      "Build and centralize event registration lists in Social Tables, executing data validation to strengthen constituent database integrity.",
      "Coordinate alumni outreach and event promotion via social media channels, analyzing audience engagement metrics to optimize communication strategies.",
    ],
    skills: [
      "DBMS",
      "Data Entry",
      "Data Validation",
      "Data Integration",
      "Data Management",
      "Records Management",
      "Microsoft Excel",
      "Attention to Detail",
      "Artificial Intelligence",
      "CRM",
      "Social Tables",
    ],
  },
  {
    role: "Orientation Counselor",
    org: "Carnegie Mellon University",
    team: "First-Year Orientation",
    location: "Pittsburgh, PA",
    dates: "Mar 2026 – Aug 2026",
    kind: "Work",
    summary: "Mentor for incoming first-year students during orientation, as part of a residential support team.",
    achievements: [
      "Guided and mentored a floor of 44 incoming first-year students through orientation as part of a residential support team, facilitating their social, emotional, and academic transition from high school to college.",
      "Planned, coordinated, and led recreational activities, icebreakers, and campus events, cultivating community and connecting students to key academic and student-life resources during their first weeks on campus.",
    ],
    skills: ["Leadership", "Mentoring", "Team Collaboration", "Peer Support"],
  },
  {
    role: "Undergraduate Researcher",
    org: "VariAbility Lab @ Carnegie Mellon",
    team: "Advisor: Dr. Andrew Begel",
    location: "Pittsburgh, PA",
    dates: "Sep 2025 – Present",
    kind: "Research",
    summary: "Studying how people interact with interfaces through video and gaze data.",
    achievements: [
      "Code, transcribe, and analyze video and gaze data of human–interface interactions, applying computational methods to identify behavioral patterns.",
      "Contributed to GRACE, a project that grounds human gaze on web UIs, accepted at COLM 2026.",
      "Leading an independent study on awareness-supporting technologies for software teams, translating qualitative findings into tool recommendations.",
    ],
    skills: [
      "Data Analysis",
      "Qualitative Research",
      "Quantitative Research",
      "Statistical Data Analysis",
      "Data Coding",
      "Behavior Analysis",
    ],
  },
  {
    role: "Research Volunteer",
    org: "A.J. Drexel Autism Institute",
    team: "Advisor: Dr. Lindsay Shea",
    location: "Philadelphia, PA",
    dates: "Jun 2024 – Dec 2024",
    kind: "Research",
    summary: "Policy research on financial literacy barriers for autistic individuals.",
    achievements: [
      "Researched financial literacy barriers for children with autism spectrum disorder and analyzed findings.",
      "Authored a published policy brief recommending evidence-based interventions.",
    ],
    skills: ["Qualitative Research", "Data Analysis", "Literature Reviews", "Policy Brief"],
  },
];

export type ProjectVisual = "museum" | "medconnect" | "gaze";

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year?: string;
  summary: string;
  role: string;
  tags: string[];
  visual: ProjectVisual;
  accent: string; // hex used for the card glow
  link: { label: string; href: string }; // where the arrow button goes
  extraLinks?: { label: string; href: string }[];
  stats?: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }[]; // verified numbers only
  statsHeading?: string; // optional caption above the stats
  afterStats?: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }[];
  afterHeading?: string;
  caseStudy: {
    challenge: string;
    approachTitle?: string; // defaults to "My Approach"
    approach: string[];
    solution: string;
    features?: { title: string; detail: string }[];
    impact: string;
    learned?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "monomuse",
    title: "MonoMuse",
    kicker: "Data-Driven Redesign · Course Project",
    year: "2026",
    summary:
      "I analyzed a museum site's session data, found why visitors weren't buying tickets, and redesigned and rebuilt it around a one-page purchase flow.",
    role: "Solo: analysis, design & development",
    tags: ["SQL Analysis", "UX Redesign", "HTML/CSS/JavaScript", "Conversion"],
    visual: "museum",
    accent: "#729ca8",
    link: {
      label: "Visit the live MonoMuse site",
      href: "https://ishaswaminathan.github.io/67250_techproject_phaseb/iswamina-final-project/index.html",
    },
    // Findings from my Phase A analysis of the original site, not results of the redesign
    statsHeading: "What the data showed about the original site",
    stats: [
      { value: 9.45, decimals: 2, suffix: "%", label: "of sessions ended in a ticket purchase" },
      { value: 30, prefix: "<", suffix: "%", label: "of visitors ever found Buy Tickets" },
      { value: 10.07, decimals: 2, label: "avg. steps to buy, vs. a 5.1-step benchmark" },
    ],
    // What the redesign changed: design facts of the new site, not measured traffic results
    afterHeading: "What the redesign changed",
    afterStats: [
      { value: 2, label: "always-visible Buy Tickets entry points, on every page" },
      { value: 1, label: "page for the whole purchase: pricing, date, and checkout" },
      { value: 4, label: "required checkout fields, with the date filled in for you" },
    ],
    caseStudy: {
      challenge:
        "Ticket sales are a museum's main revenue, yet only 9.45% of sessions on the original site ended in a purchase. Fewer than 30% of visitors ever found the Buy Tickets button, and those who did had already viewed 7.17 pages on average. Buyers took 10.07 steps to finish, nearly double the 5.1-step benchmark for a well-optimized funnel.",
      approach: [
        "Started with the data: I used SQL to analyze session data from the original site, tracing conversion, how people found the purchase button, funnel length, and where each user type dropped off.",
        "Turned the findings into three pain points: the buy button was hard to find, the funnel was too long, and no user type had a clear path to purchase. Guests dropped off most on Visit Info (866 drop-offs) and registered users on Education (274).",
        "Created a design guide (logo, a calm four-color palette, and Oswald, Lato, and Roboto type) and high-fidelity wireframes for Home, Explore, Exhibitions, Tickets, and Checkout.",
        "Built the full site in HTML, CSS, and JavaScript and deployed it on GitHub Pages.",
      ],
      solution:
        "Instead of separate paths for guests, members, and students, I built one consistent structure that puts the purchase within reach from any page and keeps the whole transaction on a single screen.",
      features: [
        { title: "Two entry points", detail: "A Buy Tickets button in a distinct color in the nav on every page, plus a call to action in the home page hero so visitors see it before scrolling." },
        { title: "One-page purchase", detail: "Pricing table, date picker, and checkout all live in one continuous view with no page reloads." },
        { title: "Availability calendar", detail: "Color-coded available and sold-out dates. Picking a date reveals a Buy Now button on the spot." },
        { title: "Four-field checkout", detail: "The date fills in automatically and a running total updates as you choose tickets." },
        { title: "Forgiving validation", detail: "Missing or invalid fields get clear inline messages, so no one loses progress or has to start over." },
        { title: "Planning info everywhere", detail: "Hours, address, and contact details in every footer, plus a map on Home, address the Visit Info drop-offs." },
      ],
      impact:
        "A live, fully working redesign that swaps a ten-step hunt for a button most visitors never found for two always-visible entry points and a one-page checkout, built to close the gap to the 5.1-step benchmark. It hasn't been tested with real visitor traffic, so this is the design and build, not a measured lift.",
      learned:
        "Starting from the data made every design decision easier to defend. The biggest win wasn't a prettier page but fixing where the purchase lives.",
    },
  },
  {
    slug: "medconnect",
    title: "MedConnect",
    kicker: "Healthcare Platform Concept · Team Project",
    summary:
      "Your care, connected: a platform that links all of a patient's providers, pulls their records into one timeline, and helps doctors coordinate care.",
    role: "Team project",
    tags: ["Product Strategy", "Healthcare", "Systems Thinking", "AI Assistant"],
    visual: "medconnect",
    accent: "#5b7a3a",
    link: { label: "Visit the MedConnect site", href: "https://sites.google.com/andrew.cmu.edu/medconnect2/home" },
    extraLinks: [{ label: "View the poster (PDF)", href: "/medconnect-poster.pdf" }],
    caseStudy: {
      challenge:
        "Healthcare data stays siloed. Patients re-explain their conditions at every visit, scheduling across providers is chaotic, referrals are confusing, and follow-up gaps lead to preventable readmissions. Many workflows still run on phone and fax.",
      approach: [
        "Mapped the problem across the whole care journey: disconnected systems, endless repetition, scheduling chaos, communication breakdowns, and missed care.",
        "Designed the solution around four moves: Connect every provider, Aggregate records into one timeline, Coordinate scheduling and care plans, and Communicate across the care team.",
        "Analyzed the value chain, competitive landscape (Epic, Cerner, Zocdoc), and who benefits, from patients and providers to health systems and society.",
        "Applied the Technology Acceptance Model and sociotechnical systems theory to plan for adoption barriers and equity from the start.",
      ],
      solution:
        "A patient-centered platform with secure single sign-on that brings appointments, records, test results, medications, and provider messages into one place.",
      features: [
        { title: "Smart appointment coordination", detail: "Aggregates appointments across providers, flags conflicts, clusters visits by location, and sends reminders." },
        { title: "Unified patient timeline", detail: "Appointments, test results, medications, and simplified doctor notes in one chronological view." },
        { title: "Cross-provider communication", detail: "Secure messaging and shared notes across the care team, with permission controls." },
        { title: "AI care assistant", detail: "A chatbot that explains next steps, answers care questions, and gives preventive reminders." },
        { title: "Referral & insurance tracking", detail: "Real-time referral status, insurance approval progress, and alerts when action is needed." },
        { title: "Equity built in", detail: "Web, mobile, and phone access plus translation, so coordinated care reaches everyone who needs it." },
      ],
      impact:
        "Our key takeaway: healthcare fragmentation isn't a UX problem, it's a systems failure. Technology alone isn't enough; success needs a cultural shift toward collaboration, with AI that augments human relationships instead of replacing them.",
    },
  },
  {
    slug: "grace",
    title: "GRACE",
    kicker: "Accessibility Research · VariAbility Lab",
    year: "2026",
    summary:
      "Gesture and Gaze Recognition for Accessible Collaborative Environments: tools that translate non-verbal visual cues into accessible descriptions.",
    role: "Undergraduate Researcher",
    tags: ["HCI", "Accessibility", "Gaze Data", "AI"],
    visual: "gaze",
    accent: "#c08a2a",
    link: { label: "Visit the GRACE project page", href: "https://cmu-variability.github.io/projects/grace.html" },
    caseStudy: {
      challenge:
        "When sighted colleagues point or look at part of a screen during a discussion, blind and low-vision teammates miss what's being referenced. Those visual cues are invisible to them.",
      approachTitle: "My Contributions",
      approach: [
        "Code, transcribe, and analyze video and gaze data of human–interface interactions.",
        "Apply computational methods to identify behavioral patterns in that data.",
      ],
      solution:
        "GRACE captures a person's gestures or gaze toward part of the screen during a conversation and infers which interface element they mean, so it can be described accessibly.",
      impact: "The work was accepted at the Conference on Language Modeling (COLM) 2026.",
    },
  },
];

export const publications = [
  {
    title: "Bridging the Gap: Enhancing Financial Literacy for Autistic Adults",
    type: "Policy Brief",
    venue: "A.J. Drexel Autism Institute · The Policy Impact Project",
    date: "Aug 2024",
    summary:
      "Why autistic adults often have lower financial literacy and independence, and what to do about it: financial education in transition planning, sensory-friendly banking, and a modernized SSI program.",
    href: "https://policyimpactproject.org/bridging/",
  },
  {
    title: "Building Financial Confidence: The Importance of Financial Literacy for Autistic Adults",
    type: "Blog Post",
    venue: "The Policy Impact Project",
    date: "Aug 2024",
    summary:
      "A public-facing companion piece on autism-friendly banking tools, practical money skills like bills and taxes, and how schools, caregivers, and policymakers can work together.",
    href: "https://policyimpactproject.org/financial-literacy-and-you/",
  },
];

export const constellation = {
  center: "My Interests",
  note: "A conceptual map of how my interests connect, not quantitative data.",
  nodes: [
    { id: "data", label: "Data Analytics", detail: "My concentration at CMU. SQL funnel analysis for MonoMuse, plus Tableau, Power BI, R, and Python." },
    { id: "product", label: "Product Management", detail: "Sprint planning, retros, and client UI/UX sessions as a Product Analyst Intern at Tyler Technologies." },
    { id: "stats", label: "Statistics", detail: "Methods for Statistics & Data Science and Multivariate Analysis, applied to gaze and behavior data." },
    { id: "prog", label: "Programming", detail: "Python, R, Java, Scala, JavaScript, and SQL. Three production dashboards and full websites built from scratch." },
    { id: "strategy", label: "Business Strategy", detail: "Value chains, competitive positioning, and adoption strategy, as in MedConnect." },
    { id: "ux", label: "User Experience", detail: "Designing Human-Centered Software, the MonoMuse redesign, and accessibility research on GRACE." },
    { id: "research", label: "Research", detail: "VariAbility Lab (GRACE) and a published policy brief with the A.J. Drexel Autism Institute." },
    { id: "lead", label: "Leadership", detail: "Facilities Director at Kappa Kappa Gamma, Orientation Counselor, and OWL Learning board member." },
  ],
  // Conceptual links between interests (ids)
  links: [
    ["data", "stats"], ["data", "prog"], ["data", "product"], ["product", "ux"],
    ["product", "strategy"], ["ux", "research"], ["research", "stats"], ["strategy", "lead"],
    ["lead", "product"], ["prog", "ux"],
  ] as [string, string][],
};

export const skills = [
  {
    category: "Programming & Development",
    blurb: "Languages I write in.",
    items: ["Python", "R", "SQL (Postgres)", "Java", "Scala", "JavaScript", "HTML/CSS", "Git/GitHub"],
  },
  {
    category: "Data & Analytics",
    blurb: "From query to insight.",
    items: [
      "Tableau",
      "Power BI",
      "SQL Server",
      "Microsoft Excel",
      "Statistical Data Analysis",
      "Multivariate Analysis",
      "Database Design (DBMS)",
      "Data Validation",
      "Data Integration",
      "Data Management",
      "Records Management",
    ],
  },
  {
    category: "Research",
    blurb: "How I find things out.",
    items: [
      "Qualitative Research",
      "Quantitative Research",
      "Data Coding",
      "Behavior Analysis",
      "Literature Reviews",
      "Policy Briefs",
    ],
  },
  {
    category: "Product & Strategy",
    blurb: "How things get decided and shipped.",
    items: ["Agile / Scrum", "Sprint Planning", "Retrospectives", "Jira", "Confluence", "Human-Centered Design", "Client & UI/UX Sessions"],
  },
  {
    category: "Tools & AI",
    blurb: "What's in the toolbox.",
    items: ["Agentic AI", "Prompt Engineering", "OpenAI API", "Anthropic Claude", "Google Gemini", "GitHub Copilot", "Salesforce", "CRM", "Social Tables", "MS Office Suite"],
  },
  {
    category: "Leadership & Collaboration",
    blurb: "Working with people.",
    items: ["Leadership", "Mentoring", "Peer Support", "Team Collaboration", "Vendor Negotiation", "Event Planning", "Inclusive Instruction", "Financial Operations"],
  },
];

export type Leadership = {
  role: string;
  org: string;
  dates?: string;
  stat?: { value: number; prefix?: string; suffix?: string; label: string };
  secondary?: { value: number; prefix?: string; suffix?: string; label: string }[];
  honors?: string[]; // shown as award badges under the title
  story?: string;
  points?: string[];
};

export const leadership: Leadership[] = [
  {
    role: "Facilities Director",
    org: "Kappa Kappa Gamma · Delta Xi Chapter",
    dates: "Oct 2025 – Present",
    stat: { value: 80, suffix: "+", label: "Members supported" },
    story:
      "I direct housing and facilities operations for the chapter: negotiating vendor contracts, resolving maintenance and safety issues, and serving as the liaison between chapter leadership, House Board, and university administrators to strengthen risk management.",
  },
  {
    role: "Orientation Counselor",
    org: "Carnegie Mellon University",
    dates: "Mar 2026 – Aug 2026",
    stat: { value: 44, label: "First-year students guided" },
    story:
      "I guided and mentored a floor of 44 incoming first-years through orientation as part of a residential support team, helping with their social, emotional, and academic transition from high school to college. I also planned and led activities, icebreakers, and campus events that built community and connected students to key academic and student-life resources.",
  },
  {
    role: "Co-Founder · Board, Treasurer & Tutor",
    org: "OWL Learning",
    dates: "2021 – Present",
    stat: { value: 50, suffix: "+", label: "Students tutored" },
    secondary: [
      { value: 4, suffix: "+", label: "Foster care communities" },
      { value: 2800, prefix: "$", suffix: "+", label: "Raised for education" },
    ],
    points: [
      "Expand academic support across 4+ foster care communities, tutoring 50+ students in individualized and advanced mathematics.",
      "Design inclusive tutoring frameworks for foster care, special-needs, and blind students, implementing adaptive methods that improve performance.",
      "Oversee financial operations as Treasurer, managing budgets and fundraising that secured $2,800+ for direct educational support.",
    ],
  },
  {
    role: "Head Social Officer & Project Manager",
    org: "Plano West Royales Varsity Drill Team",
    dates: "Aug 2022 – May 2025",
    honors: ["Director's Award, 2025", "Jazz of the Year, 2023"],
    story:
      "I was the person making sure everyone on the team felt like they belonged, and that our team showed up for the community around us.",
    points: [
      "Built a team culture people wanted to be part of: planned events, bonding activities, and initiatives that strengthened unity, boosted participation, and kept the team supportive and inclusive.",
      "Led philanthropy for children's hospitals, food banks, and foster care communities, managing budgets and coordinating outreach to make every dollar go further.",
      "Ran team communications and social media, raising our visibility and turning team events into schoolwide moments.",
      "Earned the Director's Award (2025) for outstanding leadership.",
    ],
  },
];

export const education = {
  school: "Carnegie Mellon University",
  location: "Pittsburgh, PA",
  degree: "B.S. in Information Systems",
  concentration: "Data Analytics",
  dates: "Aug 2025 – May 2029",
  gradYear: "2029",
  programUrl: "https://www.cmu.edu/information-systems/",
  honors: ["Dietrich College Dean's List, High Honors (Spring 2026)"],
  coursework: [
    "Methods for Statistics & Data Science",
    "Multivariate Analysis",
    "Introduction to Data Structures",
    "Database Design & Development",
    "Designing Human-Centered Software",
    "Information Systems Milieux",
    "Fundamentals of Programming",
    "Principles of Microeconomics",
    "Information Security, Privacy and Policy in the Age of AI",
  ],
  organizations: [
    { name: "Kappa Kappa Gamma", role: "Facilities Director" },
    { name: "IS Sphere", role: "Mentor" },
    { name: "Women in Product" },
    { name: "OpenAI Initiative", role: "Board" },
    { name: "Undergraduate Research" },
    { name: "First-Year Orientation" },
  ],
};

export const nav = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Leadership", id: "leadership" },
  { label: "Contact", id: "contact" },
];

export const fullName = `${site.name.first} ${site.name.last}`;
