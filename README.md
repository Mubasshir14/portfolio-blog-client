
# Portfolio and Blog Website - Frontend
## 🌍 Live Link  
🔗 [Website](https://personal-portfolio-blog-nu.vercel.app) 

## Description

This is a personal portfolio and blog website built with Next.js and TypeScript. It features project showcases, blog management, authentication, and a user-friendly dashboard.

## Features of This Project
- **Home Page:** Portfolio introduction, skills, projects, and resume download.
- **Projects:** List with detailed project pages.
- **Blog:** Fetches and displays blog posts dynamically.
- **Contact:** Form to submit messages.
- **Dashboard:** Authentication, blog, project, and message management.
- **Dark Mode:** User preference toggle.
- **SEO Optimization:** SSR & SSG implemented for better performance.

## Tech Stack
- **Next.js (React Framework)** for building the frontend.
- **TypeScript** for strong typing and better developer experience.
- **Tailwind CSS & DaisyUI** for styling.
- **MongoDB** for data storage and management.
- **NextAuth** for authentication.
- **Framer Motion** for animations.


## Prerequisites
Ensure you have the following installed:
- **npm** or **yarn**
## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:
   ```bash
       GITHUB_ID=<GITHUB AUTH ID>
       GITHUB_SECRET=<GITHUB AUTH SECRET>
       GOOGLE_ID=<GITHUB GOOGLE ID>
       GOOGLE_SECRET=<GITHUB GOOGLE SECRET>
       NEXTAUTH_SECRET=<NEXT AUTH SECRET>
       NEXTAUTH_URL=https:<FRONTEND LINK>
       BACKEND_URL=https:<BACKEND LINK>
   ```

## Scripts

- **Start Development Server:**

  ```bash
  npm run dev
  ```

- **Build for Production:**

  ```bash
  npm run build
  ```

- **Start Production Server:**

  ```bash
  npm run start
  ```

## Folder Structure

```bash
PERSONAL-PORTFOLIO/
│── .next/
│── .vercel/
│── node_modules/
│── public/
│── src/
│   ├── app/
│   │   ├── api/
│   │   ├── blogs/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── projects/
│   │   ├── register/
│   │   ├── error.tsx
│   │   ├── favicon.png
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   ├── assets/
│   ├── components/
│   ├── lib/
│   │   ├── utils.ts
│   ├── utils/
│── .env
│── .gitignore
│── eslint.config.mjs
│── next-env.d.ts
│── next.config.ts
```
```
