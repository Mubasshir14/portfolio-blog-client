"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  NotebookPen,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation"; // To detect active route

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed lg:static w-64 ${
          isOpen
            ? "bg-base-100"
            : "bg-gradient-to-b from-primary/10 to-transparent"
        } p-4 mt-4 transition-all duration-300 z-50 ${
          isOpen ? "left-0" : "-left-64"
        } lg:left-0 lg:w-[20%] h-screen`}
      >
        <div className="mb-8 flex justify-between items-center lg:block">
          <Link
            href="/dashboard"
            className="relative group text-xl text-primary px-4 tracking-tight font-extrabold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient text-center"
          >
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
          </Link>

          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2 text-secondary">
          <SidebarLink
            href="/dashboard/projects/addProject"
            icon={<Plus size={20} />}
            text="Add Project"
          />
          <SidebarLink
            href="/dashboard/projects/manageProject"
            icon={<Settings size={20} />}
            text="Manage Project"
          />
          <SidebarLink
            href="/dashboard/blogs/addBlog"
            icon={<NotebookPen size={20} />}
            text="Add Blog"
          />
          <SidebarLink
            href="/dashboard/blogs/manageBlog"
            icon={<LayoutDashboard size={20} />}
            text="Manage Blog"
          />
          <SidebarLink
            href="/dashboard/messages"
            icon={<MessagesSquare size={20} />}
            text="Messages"
          />
        </nav>
      </div>

      {/* Content area */}
      <div className="w-full lg:w-[80%] p-4 overflow-auto">
        <button
          className="lg:hidden p-2 fixed top-13 left-4 bg-primary text-white rounded-full shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const SidebarLink = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      key={href}
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        isActive ? "shadow-xl shadow-secondary/40" : "hover:bg-gray-500/40 text-secondary"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Sidebar;
