"use client";

import { useState, useEffect, useRef } from "react";
import { Share2, Mail, MessageCircle, Send, Link } from "lucide-react";
import { toast } from "sonner";

type CopyButtonProps = {
  url: string;
};

const ShareButton = ({ url }: CopyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const shareOptions = [
    {
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    },
    {
      icon: <Send className="w-6 h-6 text-blue-500" />,
      link: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    },
    {
      icon: <Mail className="w-6 h-6 text-red-500" />,
      link: `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-white/90 shadow-lg hover:shadow-xl dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
      >
        <Share2 className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-10 bg-base-100 dark:bg-gray-800 shadow-lg rounded-full p-2 flex space-x-2">
          {shareOptions.map((option, index) => (
            <a
              key={index}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {option.icon}
            </a>
          ))}

          <button
            onClick={copyToClipboard}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Link className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
