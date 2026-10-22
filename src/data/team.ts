export interface TechCategory {
  category: string;
  skills: string[];
}

export interface CareerHighlight {
  title: string;
  description: string;
}

export interface AreaOfExpertise {
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  image: string;
  github?: string;
  linkedin?: string;
  areasOfExpertise: AreaOfExpertise[];
  careerHighlights: CareerHighlight[];
  technologies: TechCategory[];
  keyStrengths: string[];
  sectionTitle?: {
    expertise?: string;
    highlights?: string;
    tech?: string;
    strengths?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "shreeparna",
    name: "Shreeparna",
    role: "Human Resources",
    tagline: "Building strong teams and nurturing a culture where people and performance thrive together.",
    image: "/images/shreeparna.jpg",
    linkedin: "https://linkedin.com",
    bio: [
      "Hi, I'm Shreeparna — the HR at Averix Labs, dedicated to building a team that's not just skilled but also driven by purpose.",
      "I manage end-to-end talent acquisition, onboarding, and people operations to ensure everyone at Averix Labs has the support and environment they need to do their best work.",
      "I believe that great products are built by great people — and my role is to find, engage, and retain the right talent while fostering a culture of collaboration and continuous growth."
    ],
    areasOfExpertise: [
      {
        title: "Talent Acquisition",
        description: "Identifying, attracting and hiring top talent that aligns with Averix Labs' culture and technical needs."
      },
      {
        title: "People Operations",
        description: "Managing HR processes, onboarding, and employee lifecycle to create a smooth and positive experience."
      },
      {
        title: "Culture & Engagement",
        description: "Fostering a collaborative, inclusive, and high-performance workplace culture."
      },
      {
        title: "Team Building",
        description: "Partnering with leads to understand team needs and build the right structures for growth."
      },
      {
        title: "Employee Relations",
        description: "Maintaining open communication channels and resolving workplace matters with empathy and professionalism."
      }
    ],
    careerHighlights: [
      {
        title: "Scaling the Averix Labs Team",
        description: "Playing a key role in growing the team by identifying and onboarding talent across engineering and product roles."
      },
      {
        title: "Building HR Foundations",
        description: "Establishing people processes and HR workflows from the ground up for a fast-moving startup environment."
      },
      {
        title: "Culture Champion",
        description: "Driving initiatives that strengthen team cohesion, communication, and shared purpose at Averix Labs."
      }
    ],
    technologies: [
      {
        category: "HR Tools",
        skills: ["LinkedIn Recruiter", "Notion", "Google Workspace"]
      },
      {
        category: "Skills",
        skills: ["Talent Sourcing", "Interviewing", "Onboarding", "Employee Relations"]
      }
    ],
    keyStrengths: [
      "Empathy-driven people leadership",
      "Strong communication & relationship building",
      "Attention to detail in hiring and operations",
      "Commitment to inclusive team culture",
      "Proactive problem solver"
    ],
    sectionTitle: {
      expertise: "Areas of Expertise",
      strengths: "What I Bring to the Team"
    }
  },
  {
    id: "ayush",
    name: "Ayush",
    role: "Product Engineer",
    tagline: "Turning ideas into scalable products that users love and businesses grow with.",
    image: "/images/ayush.png",
    github: "https://github.com/averixlabs001",
    linkedin: "https://linkedin.com",
    bio: [
      "Hi, I'm Ayush — a Product Engineer with a passion for building B2B SaaS products and helping early-stage founders turn ideas into market-ready solutions.",
      "I work closely with stakeholders to understand real user needs, design scalable architectures, and deliver clean, maintainable code that drives impact.",
      "I believe in agile execution, rapid iteration, and continuous improvement to build products that solve the right problems and create long-term value."
    ],
    areasOfExpertise: [
      {
        title: "Product Development",
        description: "End-to-end product development from idea validation to launch and scale."
      },
      {
        title: "B2B SaaS Engineering",
        description: "Building secure, scalable and feature-rich SaaS products for complex business needs."
      },
      {
        title: "Requirement & Product Discovery",
        description: "Working closely with stakeholders to define requirements and product roadmaps."
      },
      {
        title: "Clean Architecture & Code",
        description: "Writing modular, maintainable code with clean architecture and best practices."
      },
      {
        title: "Agile Delivery",
        description: "Agile methodologies, sprint planning, and continuous delivery with fast feedback loops."
      }
    ],
    careerHighlights: [
      {
        title: "Startup MVPs",
        description: "Partnered with early-stage founders to build MVPs from the ground up and validate their ideas."
      },
      {
        title: "Product Launch & Growth",
        description: "Helped launch products quickly and establish a strong technical foundation for future growth."
      },
      {
        title: "User-Centric Approach",
        description: "Focus on intuitive user experiences and solving real customer problems."
      },
      {
        title: "AI-Enhanced Products",
        description: "Integrated AI capabilities like intelligent content generation, automation and data-driven features."
      },
      {
        title: "Cross-functional Collaboration",
        description: "Collaborate with design, QA, and business teams to ship high-quality products."
      }
    ],
    technologies: [
      {
        category: "Frontend",
        skills: ["React", "Next.js", "TypeScript"]
      },
      {
        category: "Backend",
        skills: ["Node.js", "Python", "Express.js"]
      },
      {
        category: "Database",
        skills: ["PostgreSQL", "MongoDB", "MySQL"]
      },
      {
        category: "Cloud & DevOps",
        skills: ["AWS", "Docker", "Git"]
      }
    ],
    keyStrengths: [
      "Product mindset focused on user value",
      "Scalable solutions with clean and reliable code",
      "Fast execution with iterative improvements",
      "Data-informed decisions and product insights",
      "Ownership, accountability & strong communication"
    ]
  },
  {
    id: "mohit",
    name: "Mohit",
    role: "Full Stack Software Engineer",
    tagline: "Building scalable, reliable and user-focused products from idea to impact.",
    image: "/images/mohit.png",
    github: "https://github.com/averixlabs001",
    linkedin: "https://linkedin.com",
    bio: [
      "Hi, I'm Mohit — a Full Stack Software Engineer with a passion for building impactful digital products.",
      "I work across the entire software development lifecycle, from designing scalable backend services and APIs to creating intuitive and responsive frontend experiences.",
      "I follow Agile development practices, write clean and well-documented code, and adapt quickly to technologies that solve real business problems.",
      "My goal is simple: deliver reliable, maintainable and scalable solutions that create real value for businesses and users."
    ],
    areasOfExpertise: [
      {
        title: "Full Stack Development",
        description: "Building robust web applications using modern frontend and backend technologies."
      },
      {
        title: "Backend & API Design",
        description: "Designing scalable RESTful APIs and backend services with clean architecture."
      },
      {
        title: "Frontend Development",
        description: "Creating responsive, accessible and intuitive user interfaces."
      },
      {
        title: "Database & Cloud",
        description: "Working with relational databases and cloud platforms to ensure performance and reliability."
      },
      {
        title: "Agile & Collaboration",
        description: "Strong believer in agile workflows, clear communication and team collaboration."
      }
    ],
    careerHighlights: [
      {
        title: "Award-Winning EdTech Application",
        description: "Contributed to an award-winning EdTech platform that enhanced learning experiences and engagement for thousands of users."
      },
      {
        title: "International Client Experience",
        description: "Worked directly with international clients to deliver large-scale B2B products and solve complex business challenges."
      },
      {
        title: "Scalable SaaS Products",
        description: "Built and maintained scalable SaaS applications that support business growth and operational efficiency."
      },
      {
        title: "AI-Powered Development",
        description: "Leveraging AI tools to accelerate feature delivery, improve code quality, automate tasks and enhance product capabilities."
      }
    ],
    technologies: [
      {
        category: "Frontend",
        skills: ["React", "Next.js", "TypeScript"]
      },
      {
        category: "Backend",
        skills: ["Node.js", "Python", "Express.js"]
      },
      {
        category: "Database",
        skills: ["PostgreSQL", "MongoDB", "MySQL"]
      },
      {
        category: "Cloud & Tools",
        skills: ["AWS", "Docker", "Git"]
      }
    ],
    keyStrengths: [
      "Solve real problems",
      "Build with purpose",
      "Continuously learn & grow",
      "Deliver impact together"
    ],
    sectionTitle: {
      strengths: "What Drives Me"
    }
  },
  {
    id: "sourav",
    name: "Sourav",
    role: "Backend Engineer & Data Engineer",
    tagline: "Building reliable backend systems and data solutions that power critical businesses.",
    image: "/images/sourav.png",
    github: "https://github.com/sourav03561",
    linkedin: "https://linkedin.com",
    bio: [
      "Hi, I'm Sourav — a Backend Engineer with expertise in investment banking applications and data engineering.",
      "I design and build scalable backend services, robust data pipelines, and distributed systems that ensure reliability, performance, and data integrity.",
      "I believe in writing modular, maintainable code and documenting solutions thoroughly for long-term sustainability.",
      "I enjoy collaborating in Agile teams and leveraging the right technologies to deliver efficient and impactful software solutions."
    ],
    areasOfExpertise: [
      {
        title: "Backend Engineering",
        description: "Designing scalable, secure and high-performance backend services and APIs."
      },
      {
        title: "Data Engineering",
        description: "Building efficient data pipelines, ETL workflows, and data processing systems."
      },
      {
        title: "Distributed Systems",
        description: "Working with microservices, event-driven architectures, and scalable infrastructure."
      },
      {
        title: "Investment Banking Systems",
        description: "Developed mission-critical applications for trade reporting and regulatory compliance."
      },
      {
        title: "AI-Powered Solutions",
        description: "Built AI-assisted document & report analysis platforms for EdTech use cases."
      }
    ],
    careerHighlights: [
      {
        title: "Trade Reporting Applications – Goldman Sachs",
        description: "Contributed to high-impact trade reporting systems where accuracy, reliability, and compliance were mission critical."
      },
      {
        title: "EdTech Document Analysis Platform",
        description: "Developed an AI-assisted platform that helps students and professors analyze documents and reports efficiently."
      },
      {
        title: "Scalable Data Pipelines",
        description: "Designed and implemented robust ETL pipelines to process large volumes of data with reliability and performance."
      },
      {
        title: "Performance & Reliability Focused",
        description: "Optimized backend systems for performance, scalability and high availability in enterprise environments."
      },
      {
        title: "Agile Collaboration",
        description: "Active collaborator in Agile teams with a strong focus on documentation, code quality and continuous improvement."
      }
    ],
    technologies: [
      {
        category: "Languages",
        skills: ["Java", "Python", "SQL"]
      },
      {
        category: "Frameworks",
        skills: ["Spring Boot", "Flask", "Hibernate"]
      },
      {
        category: "Data & Messaging",
        skills: ["Kafka", "RabbitMQ", "Airflow"]
      },
      {
        category: "Databases",
        skills: ["PostgreSQL", "MySQL", "MongoDB"]
      },
      {
        category: "Cloud & Tools",
        skills: ["AWS", "Docker", "Git"]
      }
    ],
    keyStrengths: [
      "Strong problem-solving mindset",
      "Clean, reliable and maintainable code",
      "Data-driven approach to engineering",
      "Thorough documentation & knowledge sharing",
      "Commitment to quality and long-term impact"
    ]
  },
  {
    id: "bhaskar-sarkar",
    name: "Bhaskar Sarkar",
    role: "Backend Engineer",
    tagline: "Engineering scalable backend architectures, high-throughput microservices, and distributed systems.",
    image: "/images/bhaskar.png",
    github: "https://github.com/bhaskar9832",
    linkedin: "https://linkedin.com",
    bio: [
      "Hi, I'm Bhaskar — a Backend Engineer specializing in resilient microservices, high-performance APIs, and cloud-native solutions.",
      "I build robust application backends, handle database optimizations, and design clean system interfaces to support high-scale operations.",
      "Dedicated to clean architecture, test coverage, and continuous integration to deliver dependable production software."
    ],
    areasOfExpertise: [
      {
        title: "Backend Architecture",
        description: "Architecting modular, highly available distributed backend systems and REST/GraphQL APIs."
      },
      {
        title: "Microservices & Distributed Systems",
        description: "Designing event-driven services, messaging topologies, and decoupled service layers."
      },
      {
        title: "Database Engineering",
        description: "Data modeling, schema migrations, and indexing strategies for SQL and NoSQL engines."
      },
      {
        title: "DevOps & Cloud Deployment",
        description: "Containerization, automated CI/CD pipelines, and cloud infrastructure management."
      }
    ],
    careerHighlights: [
      {
        title: "Core Backend Infrastructure",
        description: "Spearheaded the design of core backend services powering enterprise workflows and SaaS platforms."
      },
      {
        title: "High-Throughput API Gateway",
        description: "Engineered rate-limited, cached API microservices handling concurrent client requests with minimal latency."
      },
      {
        title: "Full Product Lifecycle",
        description: "Collaborated end-to-end from technical architecture design to production monitoring and performance tuning."
      }
    ],
    technologies: [
      {
        category: "Languages",
        skills: ["Java", "JavaScript", "TypeScript", "SQL"]
      },
      {
        category: "Frameworks",
        skills: ["Spring Boot", "Node.js", "Express", "Next.js"]
      },
      {
        category: "Databases",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
      },
      {
        category: "DevOps & Tools",
        skills: ["Docker", "Git", "Linux", "REST APIs"]
      }
    ],
    keyStrengths: [
      "Robust backend engineering",
      "Scalable system design",
      "Performance optimization",
      "Reliable and testable codebases"
    ]
  }
];
