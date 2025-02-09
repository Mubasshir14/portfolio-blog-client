"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(
        "https://portfolio-blog-server.vercel.app/api/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const result = await response.json();
      console.log("Success:", result);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-transparent bg-base-100 py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary tracking-wide mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-secondary">
          Feel free to reach out for collaborations, queries, or anything else.
        </p>
      </div>

      <div className="w-full max-w-4xl p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-primary text-sm mb-2">
                Your Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 text-primary dark:text-gray-300 placeholder-gray-500 border-transparent focus:border-transparent focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ring-primary/50 ring-offset-1 rounded-md ring transition-all outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-primary text-sm mb-2"
              >
                Your Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 text-primary dark:text-gray-300 placeholder-gray-500 border-transparent focus:border-transparent focus:ring-2 focus:ring-blue-500 ring hover:ring-blue-500 ring-primary/50 ring-offset-1 rounded-md transition-all outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-primary text-sm mb-2"
              >
                Your Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={4}
                id="message"
                placeholder="Your Message"
                className="w-full px-4 py-3 text-primary dark:text-gray-300 placeholder-gray-500 border-transparent focus:border-transparent ring ring-offset-1 focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ring-primary/50 rounded-md transition-all outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
