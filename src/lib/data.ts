export type Product = {
  slug: string;
  name: string;
  status: 'Active' | 'Beta' | 'In Development' | 'Coming Soon' | 'Archived';
  category: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technology: string[];
  philosophy: string;
  ctaText: string;
  interfaceImage?: string;
  detailedFeatures?: { title: string; description: string }[];
};

export const products: Product[] = [
  {
    slug: 'rent-easy',
    name: 'Rent Easy',
    status: 'Active',
    category: 'Marketplace & Platform',
    description: 'Student accommodation platform for discovering and listing PGs, hostels, and rooms with verified details.',
    problem: 'Finding reliable student housing involves fragmented information, unverified listings, and inefficient communication between owners and students.',
    solution: 'A simple and reliable platform to discover and list student accommodations with verified details, filters, and direct communication.',
    features: ['Property Listings (Search and filter by city, type, budget)', 'Verified Information', 'Easy Communication', 'Responsive Design (Desktop and mobile)'],
    detailedFeatures: [
      { title: 'Property Listings', description: 'Search and filter accommodations by city, type, and specific budget ranges to find exactly what you need.' },
      { title: 'Verified Information', description: 'Detailed property information loaded with high-quality images and a comprehensive list of amenities.' },
      { title: 'Easy Communication', description: 'Connect with property owners seamlessly through direct messaging and contact functionalities.' },
      { title: 'Responsive Design', description: 'A fluid interface that works perfectly across both desktop workspaces and mobile devices on the go.' }
    ],
    technology: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    philosophy: 'Making student housing search simple, transparent, and accessible.',
    ctaText: 'View Public Code',
    interfaceImage: '/images/projects/renteasy.png'
  },
  {
    slug: 'studyai',
    name: 'StudyAI / AI-Tution',
    status: 'Active',
    category: 'AI & Education',
    description: 'From a PDF to a study pack that gives learners more ways to understand and practise.',
    problem: 'Course material is often trapped in long or scanned PDFs, making extraction and active learning difficult.',
    solution: 'Turns source documents into summaries, key concepts, flashcards, quiz questions, and related video discovery via an automated pipeline.',
    features: ['Digital and scanned PDF support', 'AI-generated summaries and concepts', 'Flashcards and quiz questions', 'Recommended learning videos'],
    detailedFeatures: [
      { title: 'Smart Upload & Dashboard', description: 'Upload course materials and track your performance with full stats and insights across all your quizzes and documents.' },
      { title: 'Ask AI Contextually', description: 'Ask questions directly about your uploaded PDFs and get instant, accurate answers extracted from the source material.' },
      { title: 'Interactive Flashcards', description: 'Automatically generated flashcards help you memorize key terms and concepts using spaced repetition techniques.' },
      { title: 'Mind Maps & Mock Tests', description: 'Visualize concepts with generated mind maps and test your readiness with dynamically created mock exams.' }
    ],
    technology: ['Flask processing API', 'PyMuPDF + Tesseract OCR', 'Google Gemini integration', 'React / Vite web interface'],
    philosophy: 'AI is most useful when it fits a complete learning journey: ingestion, extraction, generation, and a clear interface.',
    ctaText: 'View Public Repositories',
    interfaceImage: '/images/projects/studyai.png'
  },
  {
    slug: 'pujakotha',
    name: 'PujaKotha',
    status: 'Active',
    category: 'Digital Experience',
    description: 'An interactive, music-led Durga Puja experience shaped around the festival’s changing days.',
    problem: 'Cultural storytelling online often feels static and lacks the immersive atmosphere of physical events.',
    solution: 'An interface that changes imagery, colour, atmosphere, and music as visitors move through Mahalaya, Saptami, Ashtami, Navami, and Dashami.',
    features: ['Day-based themes and visual states', 'Immersive hero imagery', 'Integrated YouTube music player', 'Responsive interactive interface'],
    detailedFeatures: [
      { title: 'Immersive Visual Language', description: 'A full-screen experience combining Bengali storytelling, devotional imagery, music, and interaction.' },
      { title: 'Dynamic Theme Navigation', description: 'The interface presents the current Puja chapter, theme navigation, visual asset counts, and chapter progression in one frame.' },
      { title: 'Integrated Audio Experience', description: 'Seamlessly embedded music controls allow visitors to listen to the iconic Mahalaya broadcast while exploring.' },
      { title: 'Stateful Interactions', description: 'Clear actions like "Begin Journey" guide the user through different days with corresponding atmosphere changes.' }
    ],
    technology: ['React', 'TypeScript', 'Vite', 'Curated content model'],
    philosophy: 'A cultural story can feel alive online when content, interaction, sound, and visuals support one coherent feeling.',
    ctaText: 'View Repository',
    interfaceImage: '/images/projects/pujakotha.png'
  },
  {
    slug: 'gasflow',
    name: 'GasFlow',
    status: 'In Development',
    category: 'Operations Software',
    description: 'A working LPG distribution workspace that connects stock, customers, invoices, and money.',
    problem: 'Distribution teams struggle to track what was supplied, what came back, customer debts, and live stock levels across disjointed tools.',
    solution: 'Puts operational records into one connected workflow, modeling real inventory and financial states in a daily-use interface.',
    features: ['Customer and supplier records', 'Inventory and cylinder allocations', 'Purchases, sales, and returns', 'Payments, ledgers, and reports'],
    technology: ['React interface', 'Node / Express server', 'PostgreSQL', 'Transaction-level tests'],
    philosophy: 'Model real operations clearly so the business never loses track of its physical assets.',
    ctaText: 'View Public Workspace'
  },
  {
    slug: 'imme',
    name: 'imME',
    status: 'Coming Soon',
    category: 'Mobile Product',
    description: 'A mobile self-coaching experience centered on reflection, life zones, activity logs, and insight.',
    problem: 'People struggle to maintain structured personal reflection without overwhelming and bloated tracking apps.',
    solution: 'A Recognize, Address, Maintain journey where users set up a profile, check in, organize life into zones, and review progress.',
    features: ['Language and onboarding flows', 'Dashboard and zone views', 'Guided activity capture', 'Personal insights and settings'],
    technology: ['Mobile-first product structure', 'React Native / Expo', 'Provider-neutral entitlement model'],
    philosophy: 'Self-coaching should be frictionless, providing clarity rather than adding cognitive load.',
    ctaText: 'View Design Work'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
