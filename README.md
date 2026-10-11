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
- **Lead Generation:** Integrated contact and consultation forms saved to Aiven PostgreSQL through a server API.
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
   - `DATABASE_URL` (server only; never use a `NEXT_PUBLIC_` prefix)
   - `DATABASE_CA_CERT_PATH` or `DATABASE_CA_CERT` (Aiven CA certificate)

   Connection setup follows [Aiven’s Node.js guide](https://aiven.io/docs/products/postgresql/howto/connect-node) with certificate verification enabled.

   Download the CA certificate from Aiven and save it to `certs/aiven-ca.pem`.
   Initialize the inquiry table with `npm run db:setup`. This creates the table
   and indexes without deleting existing data. Existing Supabase records are
   not copied automatically.

   Run the backend on a server supporting the Next.js Node.js runtime. Set the
   database variables there; `DATABASE_CA_CERT` accepts PEM text with actual
   newlines or escaped `\n`. The frontend can be deployed separately to GitHub
   Pages as described below.
   Form submissions are stored in the database; email notifications are not configured.

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
└── lib/             # Utility functions and server-only PostgreSQL connection
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

## GitHub Pages frontend + existing backend server

GitHub Pages hosts the static website. A separate HTTPS backend receives contact
form requests and connects to Aiven. GitHub Actions secrets are available to
workflows, not to the running Pages website.

Repository **Actions secrets**:

- `DATABASE_URL`: Aiven PostgreSQL connection URL, including credentials.
- `DATABASE_CA_CERT`: complete Aiven CA certificate in PEM format.

Repository **Actions variables**:

- `NEXT_PUBLIC_SITE_URL`: `https://averixlabs.in`.
- `NEXT_PUBLIC_INQUIRY_API_URL`: the real HTTPS inquiry endpoint on your backend,
  such as `https://YOUR_BACKEND_DOMAIN/api/inquiries`. This URL is public.
- `GOOGLE_SITE_VERIFICATION`: optional Search Console verification code.

The Pages workflow only builds the frontend and never receives the database
secrets. `npm run build:pages` stages a clean frontend without API routes or local
`.env` files, builds HTML into `out/`, and enables unoptimized images for static
hosting. It requires a valid HTTPS `NEXT_PUBLIC_INQUIRY_API_URL`; a missing URL
fails the build rather than publishing an unusable form. The workflow assumes
the configured custom domain; set the repository Pages domain and DNS accordingly.

On the backend server, install Node.js 22+, install dependencies with `npm ci`,
and provide `DATABASE_URL`, `DATABASE_CA_CERT` and
`INQUIRY_ALLOWED_ORIGINS=https://averixlabs.in` as private runtime environment
variables. Build using `npm run build` with `BUILD_TARGET` unset, then run
`npm start` under your server's process manager behind an HTTPS reverse proxy.
Leave `NEXT_PUBLIC_INQUIRY_API_URL` unset on this backend build. The form endpoint
is `/api/inquiries`; it accepts JSON POST requests and responds to CORS preflight
requests only for configured origins and its own origin. To serve both the apex
and www domains without a redirect, include both origins, separated by commas.

The manually triggered **Set up Aiven inquiry table** workflow uses the two
GitHub database secrets to create the table and indexes without deleting data.
It does not deploy a server. SSH deployment credentials and automated backend
deployment must be configured for the actual server before production use.
Do not put database credentials into any `NEXT_PUBLIC_` variable or static asset.
