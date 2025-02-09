import React from "react";
import Link from "next/link";
import { Plus, NotebookPen, LayoutDashboard, MessagesSquare, Settings } from "lucide-react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex ">
      {/* Static Sidebar */}
      <div className="w-[20%] h-screen bg-gradient-to-b from-primary/10 to-transparent  p-4">
        <div className="mb-8">
          <h1 className="text-xl text-primary font-bold px-4">Dashboard</h1>
        </div>

        <nav className="space-y-2 text-secondary">
          <SidebarLink href="/dashboard/projects/addProject" icon={<Plus size={20} />} text="Add Project" />
          <SidebarLink href="/dashboard/projects/manageProject" icon={<Settings size={20} />} text="Manage Project" />
          <SidebarLink href="/dashboard/blogs/addBlog" icon={<NotebookPen size={20} />} text="Add Blog" />
          <SidebarLink href="/dashboard/blogs/manageBlog" icon={<LayoutDashboard size={20} />} text="Manage Blog" />
          <SidebarLink href="/dashboard/messages" icon={<MessagesSquare size={20} />} text="Messages" />
        </nav>
      </div>

      <div className="w-[80%] p-4 overflow-auto">{children}</div>
    </div>
  );
};


const SidebarLink = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3  hover:bg-slate-700 rounded-lg transition-colors duration-200"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Sidebar;
