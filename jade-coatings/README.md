# JADE Coatings Website

A modern, full-stack corporate website for **JADE Coatings** (a brand of Colour Max Lanka Pvt Ltd), built with **Next.js 14**, **Tailwind CSS**, **SQLite**, and **Nodemailer**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Gmail credentials (see Email Setup below).

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📧 Email Setup (Contact Form)

The contact form sends emails via Gmail SMTP using Nodemailer.

1. Go to your Google Account → **Security** → **2-Step Verification** (enable it first)
2. Go to **App passwords** → Generate a new app password for "Mail"
3. Copy the 16-character password into `.env.local`:
   ```
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop  (no spaces)
   SMTP_TO=info@colourmax.lk
   ```

> **Note**: Even without email credentials, the contact form still saves messages to the SQLite database at `data/jade-coatings.db`.

---

## 📁 Project Structure

```
jade-coatings/
├── app/
│   ├── layout.tsx           # Root layout (Nav + Footer)
│   ├── page.tsx             # Home page
│   ├── about/page.tsx       # About Us
│   ├── products/
│   │   ├── page.tsx         # Product catalog
│   │   └── [slug]/page.tsx  # Product detail
│   ├── projects/page.tsx    # Projects & Clients
│   ├── contact/page.tsx     # Contact form
│   └── api/                 # Backend API routes
│       ├── products/
│       ├── products/[slug]/
│       ├── projects/
│       └── contact/
├── components/              # Reusable UI components
├── lib/db.ts                # SQLite setup + auto-seed
├── data/                    # SQLite database (auto-created)
└── public/images/           # Static assets
```

---

## 🗄️ Database

SQLite database is automatically created at `data/jade-coatings.db` on first run and seeded with:
- **20 products** across 5 brands (WOODSHIELD, MASOGUARD, ECO-CLEANER, METASHIELD, TYRESHIELD)
- **5 landmark projects** (Shangri-La, Heritance, Jetwing, Palm Resort, Thissa)
- **7 clients** (Prime Lands, Pizza Hut, Sri Lanka Army, Amaya, El Toro, Conwood, Margosa Bay)

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | All products (optional `?division=Domestic`) |
| GET | `/api/products/:slug` | Single product by slug |
| GET | `/api/projects` | All projects and clients |
| POST | `/api/contact` | Submit contact form |

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 🎨 Colour Palette

| Name | Hex |
|------|-----|
| Jade Green | `#2E7D4F` |
| Jade Light | `#4CAF80` |
| Jade Pale | `#E8F5EE` |
| Charcoal | `#1A2E23` |
| Cream | `#FAFAF7` |
