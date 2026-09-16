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
    technology: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    philosophy: 'Making student housing search simple, transparent, and accessible.',
    ctaText: 'View Public Code'
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
    technology: ['Flask processing API', 'PyMuPDF + Tesseract OCR', 'Google Gemini integration', 'React / Vite web interface'],
    philosophy: 'AI is most useful when it fits a complete learning journey: ingestion, extraction, generation, and a clear interface.',
    ctaText: 'View Public Repositories'
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
    slug: 'pujakotha',
    name: 'PujaKotha',
    status: 'Active',
    category: 'Digital Experience',
    description: 'An interactive, music-led Durga Puja experience shaped around the festival’s changing days.',
    problem: 'Cultural storytelling online often feels static and lacks the immersive atmosphere of physical events.',
    solution: 'An interface that changes imagery, colour, atmosphere, and music as visitors move through Mahalaya, Saptami, Ashtami, Navami, and Dashami.',
    features: ['Day-based themes and visual states', 'Immersive hero imagery', 'Integrated YouTube music player', 'Responsive interactive interface'],
    technology: ['React', 'TypeScript', 'Vite', 'Curated content model'],
    philosophy: 'A cultural story can feel alive online when content, interaction, sound, and visuals support one coherent feeling.',
    ctaText: 'View Repository'
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
