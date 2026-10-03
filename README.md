# INCASOFT Solutions — Company Website

> **Smart Solutions. Better Business. Stronger Future.**

The official website of **INCASOFT Solutions**, a software company that builds custom software, web and mobile apps, business automation, POS/ERP systems, cloud integrations and AI-powered solutions for growing businesses.

🌐 **Live site:** https://incaweb.vercel.app/

---

## About the Project

This is a fast, responsive, single-page website built with React and TypeScript. It presents what INCASOFT offers, the industries it serves and examples of its work, and it helps visitors get in touch or start a project.

### Highlights

- **Solutions:** 8 service areas, each with its own detail page
- **Industries:** retail, hospitality, services, education, healthcare, finance, manufacturing and logistics
- **Work / case studies:** demonstration projects with full case-study pages
- **Start a Project:** a 4-step discovery form that collects project requirements
- **Contact:** contact form, WhatsApp, phone and email, plus a floating quick-contact button
- **Dark / light theme:** follows the system setting, with an animated toggle and no flash on load
- **Animations:** particle hero background, scroll reveal effects and floating dashboard cards (Framer Motion)
- **SEO:** per-page titles and descriptions, Open Graph and Twitter tags, and Schema.org organization data
- **Accessibility:** "Skip to content" link, semantic markup and keyboard-friendly UI
- **Spam protection:** a honeypot field on the forms

---

## Tech Stack

| Area        | Technology |
|-------------|------------|
| Framework   | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool  | [Vite 7](https://vite.dev/) |
| Styling     | [Tailwind CSS 3](https://tailwindcss.com/) |
| UI          | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| Animation   | [Framer Motion](https://www.framer.com/motion/) |
| Icons       | [Lucide](https://lucide.dev/) |
| Forms       | React Hook Form + Zod |
| Theming     | next-themes |
| Hosting     | [Vercel](https://vercel.com/) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **20+**
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Incasoftsolutions/incasoft-website.git
cd incasoft-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

### Available Scripts

| Command           | Description |
|-------------------|-------------|
| `npm run dev`     | Start the dev server with hot reload (port 3000) |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint |

---

## Environment Variables (Optional)

The site works without any configuration. To turn on optional features, create a `.env.local` file in the project root:

```env
# POST endpoint for contact and discovery form submissions (JSON).
# If not set, forms open a pre-filled email to the company address instead.
VITE_CONTACT_ENDPOINT=https://your-api.example.com/leads

# Analytics provider: "ga4" or "plausible".
# If not set, analytics events are ignored.
VITE_ANALYTICS_PROVIDER=ga4
```

> ⚠️ Never put secret API keys in `VITE_` variables, because they are included in the public bundle. Keep credentials on the server that receives the form data.

---

## Project Structure

```
├── public/                 # Favicons and app icons
├── src/
│   ├── assets/             # Brand logos (light and dark)
│   ├── components/         # Shared components (Header, Footer, forms, theme toggle, ...)
│   │   └── ui/             # shadcn/ui component library
│   ├── data/               # Site content: company info, solutions, industries, projects, process
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   ├── router.tsx      # Lightweight hash router
│   │   ├── contact.ts      # Form submission (endpoint or email fallback)
│   │   ├── analytics.ts    # Analytics event tracking
│   │   └── utils.ts        # Helper utilities
│   ├── pages/              # One component per page
│   ├── sections/home/      # Home page sections (Hero, Solutions, Process, ...)
│   ├── App.tsx             # Routing and per-page SEO metadata
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles and theme colors
├── index.html              # HTML shell, meta tags and structured data
├── tailwind.config.js      # Tailwind theme configuration
└── vite.config.ts          # Vite configuration
```

---

## Pages

| Route                 | Page |
|-----------------------|------|
| `/`                   | Home |
| `/solutions`          | All solutions |
| `/solutions/:slug`    | Solution details |
| `/industries`         | Industries served |
| `/work`               | Portfolio / case studies |
| `/work/:slug`         | Case study details |
| `/about`              | About the company |
| `/insights`           | Insights / articles |
| `/contact`            | Contact page |
| `/start-a-project`    | 4-step project discovery form |

The site uses **hash-based routing** (for example `/#/solutions`), so every page works on any static host without server rewrite rules.

---

## Updating Content

Most text is kept in plain TypeScript files under `src/data/`, so content changes rarely require editing components:

| File                    | What it controls |
|-------------------------|------------------|
| `company.ts`            | Company name, tagline, phone, WhatsApp, email and social links |
| `solutions.ts`          | Services and their detail pages |
| `industries.ts`         | Industries and their related solutions |
| `projects.ts`           | Portfolio / case studies |
| `process.ts`            | The "How we work" process steps |

---

## Deployment

The site is deployed on **Vercel**.

1. Import this repository into Vercel.
2. Use these settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Add any environment variables (see above) in the Vercel project settings.

Since the build output is plain static files, it can also be hosted on Netlify, GitHub Pages, Cloudflare Pages or any other static host.

---

## Contact

**INCASOFT Solutions**

- 📧 Email: [incasoftsolutions@gmail.com](mailto:incasoftsolutions@gmail.com)
- 📞 Phone / WhatsApp: [+94 75 853 1169](https://wa.me/94758531169)
- 📘 Facebook: [IncasoftSolutions](https://www.facebook.com/IncasoftSolutions)
- 📸 Instagram: [@incasoftsolutions](https://www.instagram.com/incasoftsolutions/)

---

© INCASOFT Solutions. All rights reserved.
