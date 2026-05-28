# Small Business Website Template

A clean, dark-themed, production-ready website template for small businesses. Built with vanilla HTML, CSS, and JS — no framework required. Designed to be edited in VS Code with Claude and deployed to Vercel in minutes.

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/WebsiteTemplate.git
cd WebsiteTemplate

# 2. Open in VS Code
code .

# 3. Preview locally
# Just open index.html in your browser, or use the Live Server VS Code extension.

# 4. Deploy to Vercel
npx vercel
```

---

## ✏️ Customising with Claude in VS Code

Open the project in VS Code and use Claude (via the Anthropic extension or Claude Code) to customise. Example prompts:

- *"Replace all `<!-- BUSINESS_NAME -->` placeholders with 'Studio Noir'"*
- *"Change the accent color to #e84393 (hot pink)"*
- *"Add a fifth service card for 'Video Production'"*
- *"Make the hero headline 'Award-winning design. Built to last.'"*
- *"Add an FAQ section between testimonials and contact"*

---

## 🗂 File Structure

```
WebsiteTemplate/
├── index.html              # Main page — all sections here
├── css/
│   └── style.css           # All styles + design tokens
├── js/
│   └── main.js             # Nav, scroll reveal, form handling
├── assets/
│   ├── images/             # Add your images here
│   │   ├── hero.jpg
│   │   ├── about.jpg
│   │   ├── work-1.jpg
│   │   ├── work-2.jpg
│   │   ├── work-3.jpg
│   │   └── client-1.jpg    # (testimonial avatars)
│   └── icons/
│       └── favicon.svg     # Edit or replace
├── api/
│   └── contact.example.js  # Rename to contact.js to enable email
├── vercel.json             # Vercel routing + security headers
└── README.md
```

---

## 🎨 Design Tokens

All visual settings live at the top of `css/style.css` as CSS variables. Change once, updates everywhere:

```css
:root {
  --color-bg:      #0f0f0d;   /* Page background */
  --color-accent:  #c8a96e;   /* Brand colour — CHANGE THIS */
  --color-accent-2:#4a6741;   /* Secondary accent */
  --font-display:  'Playfair Display', Georgia, serif;
  --font-body:     'DM Sans', system-ui, sans-serif;
}
```

---

## 📝 Placeholder Reference

Search & replace these in `index.html`:

| Placeholder | Example |
|---|---|
| `<!-- BUSINESS_NAME -->` | Studio Noir |
| `<!-- BUSINESS_TYPE -->` | Creative Agency |
| `<!-- BUSINESS_TAGLINE -->` | Bold design for bold brands |
| `<!-- HERO_HEADLINE_LINE1 -->` | Bold design |
| `<!-- HERO_HEADLINE_LINE2 -->` | for bold brands |
| `<!-- HERO_SUBTEXT -->` | We help small businesses stand out... |
| `<!-- HERO_CTA_PRIMARY -->` | Start a project |
| `<!-- SERVICE_1_TITLE -->` | Brand Identity |
| `<!-- SERVICE_1_DESC -->` | From logo to full brand system... |
| `<!-- STAT_1_NUM -->` | 120+ |
| `<!-- STAT_1_LABEL -->` | Projects delivered |
| `<!-- FOUNDED_YEAR -->` | 2019 |
| `<!-- ABOUT_HEADING -->` | Craft over shortcuts |
| `<!-- ABOUT_PARAGRAPH_1 -->` | We started because... |
| `<!-- CONTACT_EMAIL -->` | hello@yourbusiness.com |
| `<!-- CONTACT_PHONE -->` | +1 (555) 000-0000 |
| `<!-- CONTACT_ADDRESS -->` | Oslo, Norway |
| `<!-- SOCIAL_INSTAGRAM -->` | https://instagram.com/... |

---

## 📬 Contact Form Setup

### Option A — Formspree (Easiest, free tier available)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → copy the endpoint URL
3. In `js/main.js`, set:
   ```js
   const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_ID';
   ```

### Option B — Vercel Serverless Function
1. Rename `api/contact.example.js` → `api/contact.js`
2. Run `npm install nodemailer`
3. Add environment variables in Vercel dashboard:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`
4. In `js/main.js`, set:
   ```js
   const FORM_ENDPOINT = '/api/contact';
   ```

---

## 🌐 Deploying to Vercel

### Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Via GitHub (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy — done!

Every `git push` to `main` will auto-deploy.

---

## 📸 Images

Drop your images into `assets/images/`. Recommended sizes:

| File | Size | Notes |
|---|---|---|
| `hero.jpg` | 800×1000px | Portrait orientation |
| `about.jpg` | 600×800px | Portrait orientation |
| `work-1.jpg` | 600×800px | Large portfolio item |
| `work-2.jpg` | 600×450px | |
| `work-3.jpg` | 600×450px | |
| `client-*.jpg` | 100×100px | Testimonial avatars |

Images without a matching file gracefully show a placeholder colour.

---

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on icon buttons
- `prefers-reduced-motion` respected (all animations disabled)
- Keyboard-navigable mobile menu
- Sufficient colour contrast ratios

---

## 📄 License

MIT — use freely for client projects.
