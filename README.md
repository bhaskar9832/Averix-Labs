<div align="center">
  <h1>🚀 Averix Labs</h1>
  <p><strong>A Modern Software Development Agency Platform</strong></p>
  <p>
    <a href="https://averixlabs.com">View Live Demo</a> · 
    <a href="#contact">Contact Us</a>
  </p>
</div>

<br/>

## 📖 Overview

Averix Labs is a modern, high-performance landing page and lead-generation platform for a software development agency. It showcases services ranging from scalable web applications, mobile apps, SaaS platforms to custom software solutions for businesses and startups.

Built with cutting-edge web technologies, the platform focuses on performance, accessibility, and a seamless user experience, bridging the gap between innovative ideas and powerful software.

## ⚡ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/Database:** [Aiven PostgreSQL](https://aiven.io/postgresql)

## ✨ Key Features

- **Responsive Modern UI:** Clean, intuitive interface optimized for all devices with Tailwind CSS.
- **Service Showcase:** Detailed sections for Web Dev, Mobile Apps, SaaS, E-commerce, and more.
- **Lead Generation:** Integrated contact and consultation forms saved to Aiven PostgreSQL.
- **Performance Optimized:** Utilizing Next.js 16 features like Server Components and optimized image loading.
- **Interactive Animations:** Smooth scrolling and reveal animations powered by Framer Motion.
- **SEO Ready:** Configured with optimized metadata and semantic HTML.

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhaskar9832/Averix-Labs.git
   cd Averix-Labs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn / pnpm / bun install
   ```

3. **Set up Environment Variables**
   Copy `.env.example` to `.env.local` and fill in your Aiven database credentials:
   ```bash
   cp .env.example .env.local
   ```
   *Required variables:*
   - `DATABASE_URL`
   - `DATABASE_CA_CERT`

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router (Pages & Layouts)
├── components/      # Reusable React components (ContactForm, UI elements)
├── config/          # Site configuration (site.ts with company info)
└── lib/             # Utility functions and server-side PostgreSQL connection
```

## 👨‍💻 Team

- **Bhaskar Sarkar** - Developer 
- **Sourav Sarkar** - Developer

## 📞 Contact

- **Email:** [averixlabs001@gmail.com](mailto:averixlabs001@gmail.com)
- **WhatsApp:** [+91 9832560193](https://wa.me/9832560193)
- **Location:** Jalpaiguri, West Bengal, PIN 735101

---
<div align="center">
  <sub>Built with ❤️ by the Averix Labs Team</sub>
</div>

## Running the restored contact backend

This branch saves inquiries in Aiven PostgreSQL through `/api/inquiries`.
Set `DATABASE_URL` and `DATABASE_CA_CERT` in your server host's environment,
and run `npm run db:setup` to create the inquiry and CRM tables and indexes.
Use `npm ci`, `npm run build`, and `npm start` for a full Next.js deployment
on Render or another Node.js host. Leave `BUILD_TARGET` and
`NEXT_PUBLIC_INQUIRY_API_URL` unset for this full application deployment.

For GitHub Pages, provide the public HTTPS backend endpoint in the repository
variable `NEXT_PUBLIC_INQUIRY_API_URL`, then use the frontend Pages workflow.
Database credentials remain in server environment variables or GitHub Actions
secrets `DATABASE_URL` and `DATABASE_CA_CERT`; they are excluded from the static
build. GitHub Pages cannot execute the inquiry API or access repository secrets
at runtime. The separate backend must be running before publishing the form.

The service catalog uses the six capabilities already described by this site.
Links to unavailable blog, results and Jira pages are removed or redirected to
existing portfolio pages. Analytics tracking is not enabled on this branch.

## Search visibility after deployment

Use `https://averixlabs.in` as the primary URL (or set `NEXT_PUBLIC_SITE_URL`
consistently before building). Page canonicals, sitemap entries and business
structured data share that setting. Deploy on a Next.js server host so inquiries
reach Aiven, and redirect any other domain to the primary domain in your hosting
settings. The frontend can also be exported to GitHub Pages, with a separate
backend server for Aiven.

Verify domain ownership in [Google Search Console](https://search.google.com/search-console).
If using HTML verification, set `GOOGLE_SITE_VERIFICATION` to the verification
code and rebuild. Submit `/sitemap.xml`, then inspect the home, services, contact
and portfolio pages. Configure a Google Business Profile if the business meets
Google's eligibility rules; keep the business name and contact information
consistent. No account registration or sitemap submission is performed by this
repository.

Each public page has its own title, description, canonical and social preview.
The sitemap includes all portfolio pages. Admin pages carry `noindex` metadata;
this does not provide authentication or restrict access. Organization schema
contains known business details without fabricated reviews, opening hours or
street addresses. Continue adding useful project writeups as work is delivered.
SEO changes help discovery but do not guarantee rankings.

Guidance: [Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Contact storage consistency

The CRM and public inquiry endpoint both use `DATABASE_URL` and the verified
Aiven CA configuration. `NEON_DATABASE_URL` does not override this connection.
The setup command applies all SQL files in `database/migrations/`, in order,
inside one transaction. It creates the inquiry, leads, messages, admin users,
products, activity logs and analytics session tables. It does not seed an admin
account or delete existing data.

Both contact entrypoints validate input and save a lead, its message and an
inquiry history record in one transaction. If any insert fails, all three are
rolled back. Optional Telegram notification happens only after a successful
save through the contact server action.
