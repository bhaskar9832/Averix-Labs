export type Service = { slug: string; title: string; description: string; tags: string; icon: string };

export const services: Service[] = [
  {
    "slug": "product-discovery",
    "title": "Product discovery",
    "description": "User journeys, priorities, feature scope, and a pragmatic roadmap.",
    "tags": "Briefs • workflows • MVP definition",
    "icon": "◈"
  },
  {
    "slug": "web-applications",
    "title": "Web applications",
    "description": "Responsive customer portals, marketplaces, dashboards, and admin tools.",
    "tags": "Modern Frameworks • SPAs • Responsive UI",
    "icon": "⌘"
  },
  {
    "slug": "backend-apis",
    "title": "Backend & APIs",
    "description": "Role-based services, business rules, integrations, and reliable data models.",
    "tags": "Polyglot Backends • Microservices • REST/GraphQL",
    "icon": "↔"
  },
  {
    "slug": "ai-document-tools",
    "title": "AI & document tools",
    "description": "Document extraction, OCR, structured generation, and human-facing AI workflows.",
    "tags": "Any LLM • Computer Vision • Document Parsing",
    "icon": "✦"
  },
  {
    "slug": "operations-software",
    "title": "Operations software",
    "description": "Billing, stock, customer records, ledgers, reports, and process automation.",
    "tags": "SQL/NoSQL • Transactions • Analytics",
    "icon": "▦"
  },
  {
    "slug": "experience-led-sites",
    "title": "Experience-led sites",
    "description": "Distinctive interactive web experiences with content, media, and motion.",
    "tags": "Storytelling • media • interaction",
    "icon": "◉"
  }
];
