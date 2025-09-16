# CareerPath Companion

A modern, playful (Duolingo-inspired) digital guidance platform scaffold for Indian students. Frontend: **Vite + React + TailwindCSS + Framer Motion**. Backend: **Node.js + Express** (mock/in-memory + JSON files, no real DB). Includes quiz-based AI recommendations, college directory, timeline tracker, and a floating chatbot integrating with a hypothetical Mistra API.

> NOTE: This is a scaffold for rapid prototyping / hackathon usage. It contains TODOs for production hardening (validation, security, accessibility, performance).

## ✨ Features Implemented
- Light/Dark theme with toggle (persistent via localStorage) using green primary palette (#34D399 / #059669), accent purple (#7C3AED), badge yellow (#FBBF24).
- Landing page with hero + CTA (Take Quick Quiz).
- 10-question aptitude & interest quiz (MCQ, slider, tags) with animated step transitions.
- Recommendation flow POSTs `{ userProfile, quizAnswers }` to `/api/mistra/recommend` returning mock AI career suggestions.
- Course-to-Career mapping displayed as animated degree cards with salary, roles, exams, growth.
- Government Colleges Directory using `server/data/colleges.json` + district filter.
- Timeline Tracker using `server/data/timeline.json` with vertical timeline & upcoming events sidebar.
- Floating animated chatbot (bobbing FAB) opening slide-up panel; chats with `/api/mistra/chat` (mock if no API key).
- Simple auth: `/api/auth/login` returns `{ token: "fake-jwt", user: { email } }` stored in `localStorage`.
- API helper consolidating calls & token header injection.

## 🗂 Project Structure
```
root
 ├─ client/                    # Vite React app
 │   ├─ index.html
 │   ├─ package.json
 │   ├─ tailwind.config.cjs
 │   ├─ postcss.config.cjs
 │   └─ src/
 │       ├─ styles.css         # Tailwind + theme CSS vars
 │       ├─ main.jsx
 │       ├─ App.jsx            # Routing, theme provider, layout
 │       ├─ pages/
 │       │   ├─ Home.jsx
 │       │   ├─ Quiz.jsx
 │       │   ├─ Directory.jsx
 │       │   ├─ Timeline.jsx
 │       │   ├─ Recommendations.jsx
 │       ├─ components/
 │       │   ├─ ThemeToggle.jsx
 │       │   ├─ Chatbot.jsx
 │       │   ├─ LoginForm.jsx
 │       └─ services/
 │           └─ api/mistra.js  # API helper
 │
 ├─ server/
 │   ├─ index.js               # Express app entry
 │   ├─ package.json
 │   ├─ routes/
 │   │   ├─ auth.js
 │   │   └─ mistra.js
 │   ├─ utils/
 │   │   └─ callMistra.js
 │   └─ data/
 │       ├─ colleges.json
 │       └─ timeline.json
 │
 ├─ .env.example
 └─ README.md
```

## 🚀 Getting Started
### 1. Clone & Install
```powershell
# From repository root
cd server
npm install
cd ../client
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` inside `server/` (optional for mock):
```powershell
Copy-Item .env.example server/.env
```
Set `MISTRA_API_KEY` only if you have one; otherwise mock data is returned.

### 3. Run Backend
```powershell
cd server
npm run dev
```
Server: http://localhost:4000

### 4. Run Frontend
Open new terminal:
```powershell
cd client
npm run dev
```
Frontend: http://localhost:5173 (Vite default)

### 5. Access App
Visit the frontend URL. Quiz, Directory, Timeline, Chatbot should function. Recommendations & Chat use mock data if no Mistra key.

## 🔑 Authentication Flow
1. User opens Login page (`/login`).
2. Submits any email/password.
3. Backend returns static token `fake-jwt`.
4. Token stored in `localStorage` (used by API helper).
5. TODO: Replace with real JWT generation + password hashing + logout.

## 🧠 Recommendation Endpoint
`POST /api/mistra/recommend`
```json
{
  "userProfile": { "grade": "11", "location": "MH" },
  "quizAnswers": { "1": "Math", "4": 7, "10": ["Creative", "Curious"] }
}
```
Returns mock JSON (see sample below) if no API key.

## 💬 Chatbot Endpoint
`POST /api/mistra/chat` with `{ "message": "What is a good degree for AI?" }`.
Returns `{ "reply": "Mock response about: ..." }` unless real API key present.

## 🌐 Using a Real Mistra API
When you provide a valid `MISTRA_API_KEY` and `MISTRA_API_URL` in `server/.env` the backend will:
- Call the Mistra API for both `/api/mistra/recommend` and `/api/mistra/chat`.
- Attempt to parse JSON directly. If the model returns narrative text containing a JSON block, it extracts the first `{ ... }` segment.
- For recommendations you should instruct your model (system prompt already does) to output ONLY JSON matching:
```jsonc
{
  "recommended_streams": ["Engineering"],
  "recommended_degrees": [
    {
      "name": "B.Tech Computer Engineering",
      "description": "...",
      "average_salary_range": "4-12 LPA",
      "key_job_roles": ["Software Developer"],
      "government_exams": ["GATE"],
      "growth_outlook": "..."
    }
  ],
  "suggested_colleges": ["College A"],
  "next_steps": ["Step 1", "Step 2"]
}
```

### Environment Setup Example
Create `server/.env`:
```env
PORT=4000
MISTRA_API_URL=https://api.mistra.example/v1/generate
MISTRA_API_KEY=sk_live_your_real_key
```

Restart the server after adding the key. If responses are not JSON, check server logs and refine the system instruction to force strict JSON.

### Error Handling
- Timeout: 30s default (returns `Mistra request timed out`).
- Non-200: surfaces first 300 chars of response body.
- Malformed JSON: falls back to `{ raw: "...original text..." }` for recommendations, or raw text for chat.

### Improving Reliability (Optional)
Consider adding: retries with exponential backoff, JSON schema validation (Zod), structured logging, and streaming responses for the chat endpoint (SSE/WebSockets).

## 🧪 Sample Mistra JSON (Mock)
See end of this README for a full example; used by frontend to render recommendations.

## 🎨 Theming & Design System
- CSS variables for surfaces / text colors switch via `light` / `dark` class on `<html>`.
- Tailwind utilities for spacing, rounded corners (`rounded-2xl`), shadows (`shadow-lg`, custom `shadow-soft`).
- Framer Motion used for: page transitions, quiz transitions, card fade/slide, chatbot slide & bob animation.
- Buttons: scale on hover via Tailwind + motion wrappers.

## 🛡 Production Hardening TODOs
- Input validation (e.g., Zod / Joi) for all requests.
- Proper auth (JWT signing, refresh tokens, password hashing with bcrypt/argon2).
- Rate limiting & CORS tightening.
- Logging & monitoring (winston/pino + structured logs).
- Accessibility checks (ARIA labels for interactive elements, focus management for modal/chatbot panel).
- Unit/integration tests.
- Error boundaries on the React side.
- Streaming chat (Server-Sent Events or WebSockets).
- Security headers (helmet).
- College/timeline data persistence (DB: PostgreSQL / MongoDB) & admin panel.

## 🧾 License
MIT (or add your preferred license).

## 📦 Sample Mistra API Response (Mock)
```json
{
  "recommended_streams": ["Engineering", "Computer Science"],
  "recommended_degrees": [
    {
      "name": "B.Tech Computer Engineering",
      "description": "Focus on software systems, algorithms, and emerging tech.",
      "average_salary_range": "4-12 LPA",
      "key_job_roles": ["Software Developer", "Data Analyst"],
      "government_exams": ["GATE", "ISRO Scientist"],
      "growth_outlook": "High demand with AI & automation expansion."
    }
  ],
  "suggested_colleges": ["IIT Sample", "Government Engineering College A"],
  "next_steps": [
    "Strengthen math basics",
    "Practice logical reasoning",
    "Explore small coding projects"
  ]
}
```

---
Happy building! ✨
