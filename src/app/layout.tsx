import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Toaster } from "sonner";
import { Footer } from "@/components/shared/Footer";


export const metadata: Metadata = {
  title: "Portfolio and Blog Website",
  description:
    "A professional showcase of creative projects, technical expertise, and insightful blog posts. Featuring a curated collection of work samples, detailed case studies, and articles about web development, design, and technology.",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-primary/10 to-transparent">
        <Navbar session={session} />
        <Toaster position="top-right" />
        <div className="min-h-screen w-[90%] mx-auto">{children}</div>
        <Footer/>
      </body>
    </html>
  );
}
