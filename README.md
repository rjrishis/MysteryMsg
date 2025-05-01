# 🕵️‍♂️ Mystery - Send & Receive Anonymous Messages with AI Suggestions

Welcome to **Mystery**, a full-stack Next.js 15 application that allows users to receive anonymous messages through a unique dashboard link. With built-in AI suggestions, users can also get cheeky, friendly, or thoughtful prompt ideas when sending anonymous messages to others.

---

## ✨ Features

- ✅ User Authentication using **NextAuth**
- 🏠 Public **Home Page** and secure **Dashboard Page**
- 📩 Generate a **unique sharable link** for anonymous message collection
- 🤖 AI-generated message suggestions (friendly, cheeky, random)
- 🔒 Passwords hashed using **bcryptjs**
- 🧠 AI integrations with **OpenAI SDK**, **AI SDK**, and **Google Gen AI**
- 🎨 Styled with **Tailwind CSS** + **Radix UI** + **Lucide Icons**
- 💌 Built-in email components using **react-email**
- ⚡ Anonymous messaging system — fully private and user-friendly
- 🔗 Fully dynamic routing with **Next.js App Router**

---

## 🧰 Tech Stack

### Frontend
- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS 4**
- **React Hook Form + Zod** (form handling & validation)
- **Lucide-react**, **Radix UI** (for UI components)

### Backend
- **NextAuth v5 (beta)** for authentication
- **MongoDB + Mongoose** for data storage
- **BcryptJS** for password hashing
- **AI SDKs**: `openai`, `@ai-sdk/react`, `@google/generative-ai` for smart message suggestions

### Others
- **Axios** for API calls
- **Sonner** for beautiful toast notifications
- **Resend** and **React Email** for future-proof email workflows
- **Embla Carousel** for sliding content (if applicable)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/mystery.git
cd mystery
