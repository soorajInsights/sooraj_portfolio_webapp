# Sooraj KK — Professional Portfolio Website

A personal portfolio website for **Sooraj KK** (Data Analyst | Data Engineer | ETL Developer), built with React, TypeScript, and Tailwind CSS.

---

## 🚀 Features

- **Accurate & Faithful Resume Content**: Direct reflection of real production pipelines (Ecomedes, OttixHow) and independent projects (AI Trip Planner Agent).
- **Dark Navy & Blue-to-Coral Aesthetic**: Modern UI inspired by the design brief with gradient highlights, clean typography, and accessible contrast.
- **Direct Resume Download**: Original resume PDF accessible at `/resume/Sooraj_KK_Resume.pdf` via the hero and about download buttons.
- **Third-Party Verified Certificates**: Direct links to official IBM SkillsBuild CognitiveClass and Linux Foundation Credly verification pages.
- **Centralized Data Structure**: All content is defined in `src/data/portfolioData.ts` for quick code-level updates.
- **Browser-Based Admin Editor**: Accessible at `?admin=true` or via the discreet lock link in the footer to modify, add, or delete projects, skills, certificates, and profile details directly from the browser with `localStorage` persistence and JSON export.

---

## 📁 Project Structure

```
├── public/
│   ├── images/
│   │   ├── sooraj-profile.png      # Original portrait photo
│   │   └── sooraj-profile.jpg
│   └── resume/
│       └── Sooraj_KK_Resume.pdf    # Downloadable resume PDF
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky header with scroll spy & mobile drawer
│   │   ├── Footer.tsx              # Footer with dynamic year & admin link
│   │   └── AdminEditorModal.tsx    # Protected content manager & JSON exporter
│   ├── context/
│   │   └── PortfolioContext.tsx    # State management & browser persistence
│   ├── data/
│   │   └── portfolioData.ts        # Central typed portfolio data (single source of truth)
│   ├── sections/
│   │   ├── Hero.tsx                # Hero section with portrait & CTAs
│   │   ├── About.tsx               # Bio & key metrics
│   │   ├── Skills.tsx              # 7 skill categories from resume
│   │   ├── Experience.tsx          # Orbio Solutions experience
│   │   ├── Projects.tsx            # Ecomedes, OttixHow & AI Trip Planner Agent
│   │   ├── Education.tsx           # B.Sc. in Botany, Calicut University
│   │   ├── Certificates.tsx        # IBM SkillsBuild & Linux Foundation
│   │   └── Contact.tsx             # Contact channels & email composer
│   ├── types/
│   │   └── portfolio.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── portfolioLogic.ts       # Validation & utility functions
│   │   └── portfolioLogic.test.ts  # Node test runner suite
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── README.md
```

---

## 🛠️ How to Edit Content

### Option 1: In the Code (Recommended for Version Control)
Open `src/data/portfolioData.ts`. You will find:
- Personal details (name, title, tagline, email, phone, location)
- Social links (GitHub, LinkedIn)
- Skills grouped by 7 categories
- Experience highlights
- Project cards, tags, and GitHub URLs
- Education and certificate verification URLs

### Option 2: Live in the Browser (Admin Mode)
1. Scroll to the footer and click **"Admin Editor"** (or append `?admin=true` to your browser URL).
2. Enter the admin passcode: `sooraj2025` (or your email).
3. Update any field, add/remove projects or certificates.
4. Click **"Save Changes"** to immediately update your live portfolio (stored in your browser).
5. Click **"Export JSON"** to download your edited content.

---

## 📦 Replacing Profile Photo or Resume

1. **Profile Photo**: Replace `public/images/sooraj-profile.png` with your new picture (or change the path in `portfolioData.ts`).
2. **Resume PDF**: Replace `public/resume/Sooraj_KK_Resume.pdf` with your updated PDF file.

---

## ☁️ Optional Cloud Firebase Integration

If you want changes from the Admin Editor to synchronize globally across all visitor devices:
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Cloud Firestore** and **Firebase Authentication** (Email/Password).
3. Deploy Firestore security rules allowing public read access to published portfolio data and write access only to your authorized admin user.
4. Add your Firebase keys to `.env`.

---

## 🧪 Testing

Run unit tests via Node test runner:
```bash
npx --yes tsx --test src/utils/portfolioLogic.test.ts
```

All 5 unit tests validate required fields, project filtering, mailto link generation, and URL safety.
