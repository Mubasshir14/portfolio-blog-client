import type { Metadata } from "next";
import AboutMe from "@/components/shared/AboutMe";
import Blogs from "@/components/shared/Blogs";
import HeroSection from "@/components/shared/HeroSection";
import Project from "@/components/shared/Project";
import Skills from "@/components/shared/Skills";

export const metadata: Metadata = {
  title: "Portfolio and Blog Website",
  description:
    "Professional frontend developer specializing in React, Next.js, and modern web technologies. View my portfolio, projects, and blog posts.",
  keywords: [
    "frontend developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "UI/UX designer",
    "portfolio",
    "Mubasshir",
  ],
  openGraph: {
    title: "Portfolio and Blog Website",
    description:
      "Professional frontend developer specializing in React, Next.js, and modern web technologies.",
    url: "https://johndoe.com",
    siteName: "Mubasshir Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mubasshir - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubasshir | Frontend Developer",
    description:
      "Professional frontend developer specializing in React, Next.js, and modern web technologies.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Mubasshir" }],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-screen-xl mx-auto px-4">
          <section id="hero" className="">
            <HeroSection />
          </section>

          <section id="about" className="">
            <AboutMe />
          </section>

          <section id="skills" className="">
            <Skills />
          </section>

          <section id="projects" className="">
            <Project />
          </section>

          <section id="blog" className="">
            <Blogs />
          </section>
        </div>
      </div>
    </main>
  );
}
