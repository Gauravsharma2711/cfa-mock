# CFA Level I Mock Exam Portal 🎓✨

A personalized, cute, modern, and ultra-lightweight web-based mock examination portal crafted specifically for **CFA Level I candidates**.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind-inspired custom CSS design system** with full dark/light mode glassmorphism aesthetics.

---

## 🌟 Key Features

### 📖 Comprehensive Exam Content
- **6 Full Session Mocks (180 Questions Total)**:
  - **Session 1 (Mocks 1, 2 & 3)**: Ethical & Professional Standards, Quantitative Methods, Economics, Financial Statement Analysis.
  - **Session 2 (Mocks 1, 2 & 3)**: Corporate Issuers, Equity, Fixed Income, Derivatives, Alternative Investments, Portfolio Management.

### ⚡ Professional Exam Environment & Auto-Save
- **Real-Time Countdown Timer**: Live timer formatted as `HH:MM:SS` with automatic submission when time expires.
- **Untimed Practice Mode**: Practice at your own pace without timer pressure.
- **Auto-Save & Session Persistence**: LocalStorage state persistence ensures active exam progress (answers, flagged questions, current index, remaining timer) is saved automatically so you never lose progress on tab reload.
- **Question Palette Drawer**: Quick-jump 1..90 question palette with visual indicators for answered, unanswered, flagged (`🚩`), and current questions.
- **Keyboard Shortcuts Navigation**:
  - `A` / `B` / `C`: Select answer option
  - `←` / `→`: Navigate between previous and next questions
  - `F`: Toggle question flag
  - `P`: Pause / Resume timer
  - `H`: Toggle keyboard shortcuts helper banner

### 📊 Analytics & Step-by-Step Corrections
- **Automated Grading**: Instant pass/fail score evaluation based on official 70% CFA pass rate benchmark.
- **Topic-Wise Performance Analytics**: Category breakdown progress bars (Ethics, Quant, Economics, Fixed Income, etc.) highlighting candidate strengths and growth areas.
- **Search & Filter Corrections**: Filter questions by `[All]`, `[Incorrect ❌]`, `[Correct ✅]`, `[Flagged 🚩]`, `[Unanswered ⚪]`, or specific topic dropdown.
- **Detailed Solution Explanations**: Step-by-step mathematical working and conceptual rationales for all 180 questions.
- **Printable Performance Report**: Clean print-friendly view for offline study and record keeping.

### 🎨 Modern Aesthetic Design
- **Cute Pastel & Dark Mode**: Smooth glassmorphism, gradient accents, micro-animations, and theme toggling.
- **Celebration Animations**: Interactive confetti celebratory feedback when passing exams.

---

## 🏗️ Architecture & Project Structure

```
cfa-mock-exam-portal/
├── public/
│   └── data/               # Mock question datasets (mock1_ss1 to mock3_ss2 JSON files)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx      # Header bar with brand, live timer, and theme toggle
│   │   ├── Dashboard.tsx   # Portal homepage with session cards & past attempt history
│   │   ├── ExamPortal.tsx  # Exam interface with progress bar, hotkeys, & palette drawer
│   │   └── ResultsView.tsx # Score dashboard, topic analytics, search/filters & solutions
│   ├── App.tsx             # Root state controller with timer engine & localStorage sync
│   ├── types.ts            # TypeScript interface definitions
│   ├── index.css           # Modern glassmorphism CSS variable design system
│   └── main.tsx            # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle
npm run build
```

---

## ☁️ Vercel Deployment

Deploy directly to **Vercel** with zero configuration:
1. Import repository into Vercel dashboard.
2. Select **Vite** framework preset.
3. Deploy!

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5
- **Language**: TypeScript 5
- **Icons**: Lucide React
- **Animations & FX**: Canvas Confetti
- **Styling**: Pure Modular CSS with Design System Variables
