# Kishlay Choudhary — Portfolio

A warm editorial / print-magazine style personal portfolio website. Built as a multi-page Next.js app with a fixed paper-tone theme, animated film grain, and a Groq-powered chatbot grounded in the site's own content.

> **"I evaluate how AI reasons, then build the systems that put it to work."**

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for animation
- **Fonts:** Fraunces (variable, wonky), Space Grotesk, JetBrains Mono
- **Chatbot:** Groq (`/api/chat` route, model fallback chain)

## Features

- Multi-page site — Home, About, Experience, Projects (+ per-project case studies), Certifications, Blog, Contact
- Single source of truth: all content lives in `src/lib/data.ts` — every page *and* the chatbot's system prompt pull from it
- Floating AI chatbot about Kishlay, grounded in the site content (ask anything, or paste a job description to check fit)
- Live IST clock (shared component: footer + mobile menu)
- Magnetic-free custom cursor (desktop-class pointers only)
- `H` keyboard shortcut navigates to `/contact` from anywhere
- Contact form wired to Formspree
- Direct resume download (`public/resume.pdf`) with a friendly default filename
- Fully responsive, `prefers-reduced-motion` aware, accessible focus states

## Getting Started

```bash
npm install
```

Create a `.env.local` at the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

(Grab one free at [console.groq.com](https://console.groq.com). Without it, the chatbot politely tells visitors it's not configured — everything else works.)

```bash
# development
npm run dev

# production
npm run build
npm start
```

## Deployment

Deploy anywhere Next.js runs (Vercel recommended). Add `GROQ_API_KEY` as an environment variable in your hosting dashboard.

## Structure

```
src/
├── app/                  # routes (App Router)
│   ├── api/chat/         # Groq chatbot endpoint
│   ├── projects/[slug]/  # per-project case study pages
│   └── ...               # page + metadata per section
├── components/           # cursor, chatbot, nav, marquee, forms, etc.
└── lib/data.ts           # ← single source of truth for ALL content
public/
├── profile.jpg
└── resume.pdf
```

---

© Kishlay Choudhary · [kishlaychoudhary.com](https://github.com/thecoderji/portfolio)
