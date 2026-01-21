# LearnSphere AI 

LearnSphere AI is an AI-powered personalized learning platform that generates custom study roadmaps, explains topics using adaptive AI tutoring, conducts quizzes, and provides smart feedback to help students learn efficiently.

Instead of providing the same content to every learner, LearnSphere AI acts like a virtual tutor that plans what to study, teaches concepts based on level, and continuously evaluates performance to guide improvement.

---

## 🚀 Features

- 🎯 Personalized AI-generated learning roadmap
- 🧠 Smart topic explanations (beginner to advanced)
- 📝 Adaptive quiz generation
- 📊 Performance feedback with strengths and weak areas
- 🔁 Continuous learning improvement loop
- ⚡ Fast AI responses using Groq API

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Next.js API Routes (Serverless)

### AI
- Groq API (LLaMA models)

### Deployment
- Vercel

---

## 📁 Project Structure

app/
├─ page.tsx
├─ layout.tsx
├─ api/
│ ├─ roadmap/route.ts
│ ├─ explain/route.ts
│ ├─ quiz/route.ts
│ └─ feedback/route.ts
components/
├─ RoadmapView.tsx
└─ LessonModal.tsx



---

## ⚙️ Environment Setup

Create a file named **`.env.local`** in the root directory:

GROQ_API_KEY=your_api_key_here



---

## ▶️ How to Run Locally
1️⃣ Install dependencies
npm install

2️⃣ Start development server
npm run dev

3️⃣ Open in browser
http://localhost:3000

🔁 Learning Flow
User enters subject, goal, and level


AI generates personalized roadmap

User selects a topic

AI explains the topic

User attempts quiz

System evaluates answers

AI provides feedback and revision guidance


⚠️ Limitations
Requires internet connection
Depends on AI model accuracy
No offline learning mode
No user authentication yet

🔮 Future Enhancements
User login and progress tracking
Teacher dashboards
Parent monitoring
Voice-based AI tutor
Multilingual support
Mobile app version

🏁 Conclusion
LearnSphere AI demonstrates how Artificial Intelligence can be used to build personalized education platforms. By combining AI-based planning, teaching, testing, and feedback, it provides an adaptive and efficient learning experience for students.


🙌 Author
Vishnu Vardhan
B.Tech Student | AI & Full Stack Developer |
