import souravImg from "../../public/images/sourav.png";
import bhaskarImg from "../../public/images/bhaskar.png";

export const siteConfig = {
  name: "Averix Labs",
  description: "Averix Labs builds custom software, web applications, SaaS platforms and AI tools for startups and businesses in India. Discuss your project with our team.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://averixlabs.in").replace(/\/+$/, ""),
  email: "averixlabs001@gmail.com",
  phone: "9832560193",
  whatsapp: "919832560193",
  address: "India",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com/averixlabs001",
    linkedin: "https://linkedin.com",
  },
  team: [
    {
      name: "Sourav Sarkar",
      role: "Senior Backend Engineer",
      description: "Python services, APIs, React applications, databases, and AI-assisted tools.",
      image: souravImg,
      github: "https://github.com/sourav03561"
    },
    {
      name: "Bhaskar Sarkar",
      role: "Backend Engineer",
      description: "React, Node.js, Java, and Spring Boot.",
      image: bhaskarImg,
      github: "https://github.com/bhaskar9832"
    }
  ]
}
