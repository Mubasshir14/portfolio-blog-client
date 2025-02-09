"use client";
import React, { useEffect, useState } from "react";

type Message = {
  name: string;
  email: string;
  message: string;
};

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://portfolio-blog-server.vercel.app/api/message"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className="border p-4 mb-2 rounded-md shadow">
            <p>
              <strong>Name:</strong> {message.name}
            </p>
            <p>
              <strong>Email:</strong> {message.email}
            </p>
            <p>
              <strong>Message:</strong> {message.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
