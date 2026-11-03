# 🌱 GreenLife — Frontend

**GreenLife** is a community-service and social-development platform where people can discover, create, and participate in community events. The frontend provides a responsive and user-friendly interface for connecting volunteers and organizing meaningful community initiatives.

## 🚀 Live Demo

_Add your deployed frontend URL here._

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework and App Router |
| [React 19](https://react.dev/) | Building interactive user interfaces |
| [TypeScript](https://www.typescriptlang.org/) | Type safety and better development experience |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling and responsive design |
| [shadcn/ui](https://ui.shadcn.com/) | Reusable UI components |
| [Lucide React](https://lucide.dev/) | Icons |
| [Google Identity Services](https://developers.google.com/identity) | Google authentication |
| [React OAuth Google](https://www.npmjs.com/package/@react-oauth/google) | Google login integration |

## 💻 Development Tools

- **VS Code** — Code editor
- **Git & GitHub** — Version control and source-code management
- **ESLint** — Code quality and linting
- **npm** — Package management
- **Vercel** — Frontend deployment

## ✨ Key Features

- Responsive and modern user interface
- User registration and login
- Google authentication
- Community event discovery
- Event category filtering
- Event creation and management
- Join and leave community events
- Upcoming, active, and completed event sections
- User authentication context
- Reusable UI components
- API integration with the Express.js backend

## 📁 Project Structure

```text
greenlife_client/
├── public/
│
├── src/
│   ├── app/
│   │   ├── events/
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── events/
│   │   └── ui/
│   │
│   ├── contexts/
│   │   ├── auth-context.tsx
│   │   └── events-context.tsx
│   │
│   ├── hooks/
│   └── lib/
│       └── api.ts
│
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd greenlife_client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Replace the Google Client ID placeholder with your actual Google OAuth Client ID.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 Backend Integration

The frontend communicates with a separate Express.js backend through REST APIs.

**Backend technologies:**
- Node.js
- Express.js
- MongoDB
- Express Session
- bcryptjs
- Google OAuth token verification

The backend handles authentication, user sessions, event data, and database operations.

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build the production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌍 Deployment

The frontend can be deployed using [Vercel](https://vercel.com/).

Remember to configure the required environment variables in your Vercel project settings before deployment.

## 👨‍💻 Developer

**GreenLife — Community Service Platform**

Built with Next.js, React, TypeScript, and Tailwind CSS.

---

⭐ If you find this project interesting, feel free to explore the code and learn from it.