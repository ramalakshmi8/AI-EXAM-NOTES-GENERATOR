# 🚀 AI Exam Notes Generator

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![AI](https://img.shields.io/badge/AI-Gemini-blue)
![Database](https://img.shields.io/badge/Database-MongoDB-green)
![Payments](https://img.shields.io/badge/Payments-Stripe-purple)
![Deployment](https://img.shields.io/badge/Deployment-Render-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

An **AI-powered web application** that generates **exam notes, diagrams, charts, graphs, and revision material** using artificial intelligence.

The platform helps students convert topics into **structured study notes, summaries, and important questions** for efficient exam preparation.

---

# 🌐 Live Demo

Try the application here:

🔗 https://ai-exam-notes-generator-client-lwsu.onrender.com

---

# ✨ Features

## 🧠 AI Learning Tools
- Generate **AI-powered exam notes**
- Automatically create **diagrams, charts, and graphs**
- **Revision mode** for concise notes
- **Subject-wise and class-wise important questions**

## 💳 Credit-Based Usage System
- Credit-based generation system
- Usage tracking
- Pricing plans with Stripe integration

## 🔐 Authentication & Security
- Secure **JWT authentication**
- Protected backend APIs
- User account management

## 🌐 Deployment
- Fully deployed **frontend and backend**
- Hosted on **Render**

---

# 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### AI Integration
- Gemini API

### Authentication
- JWT (JSON Web Token)

### Payments
- Stripe Payment Gateway

### Deployment
- Render

---

# 🏗 System Architecture

```
User
 │
 ▼
React Frontend
 │
 ▼
Node.js / Express API
 │
 ├── Authentication (JWT)
 ├── Credit System
 ├── Stripe Payment Integration
 └── AI Requests (Gemini API)
 │
 ▼
MongoDB Database
```

---

# ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/ai-exam-notes-generator.git
cd ai-exam-notes-generator
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
STRIPE_SECRET_KEY=your_stripe_key
```

### 5️⃣ Run the Application

Start backend:

```bash
npm run dev
```

Start frontend:

```bash
npm start
```

---

# 💡 Possible Improvements

- Export notes as **PDF**
- AI-generated **flashcards**
- AI **quiz generator**
- Study progress analytics
- Mobile optimized UI

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Majjari Rama Lakshumma**

AI / ML Enthusiast  
MERN Stack Developer

---

⭐ If you like this project, consider **starring the repository**.
