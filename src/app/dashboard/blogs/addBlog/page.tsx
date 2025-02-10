/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddBlog = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setValue("date", event.target.value);
  };

  const onSubmit = async (data: any) => {
    console.log({ ...data, date: selectedDate });

    const response = await fetch(
      "https://portfolio-blog-server.vercel.app/api/blogs",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, date: selectedDate }),
      }
    );

    if (response.ok) {
      toast.success("Blog Added");
      router.push("/blogs");
    } else {
      console.error("Failed to add blog");
      toast.error("Failed to add blog");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-b from-primary/10 to-transparent bg-base-100">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary tracking-wide mb-4">
          Add New Blog
        </h2>
        <p className="text-lg text-secondary">
          Fill in the details below to add a new blog.
        </p>
      </div>

      <div className="w-full max-w-4xl p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-primary text-sm mb-2">
                Blog Name
              </label>
              <input
                {...register("name", { required: "Blog Name is required" })}
                type="text"
                id="name"
                placeholder="Enter blog name"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-primary text-sm mb-2"
              >
                Image URL
              </label>
              <input
                {...register("image", { required: "Image URL is required" })}
                type="url"
                id="image"
                placeholder="Enter image URL"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-primary text-sm mb-2"
              >
                Blog Description
              </label>
              <textarea
                {...register("description", {
                  required: "Blog Description is required",
                })}
                rows={4}
                id="description"
                placeholder="Enter blog description"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="topic"
                className="block text-primary text-sm mb-2"
              >
                Topic Name
              </label>
              <input
                {...register("topic", { required: "Topic Name is required" })}
                type="text"
                id="topic"
                placeholder="Enter topic name"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-primary text-sm mb-2">
                Select Date
              </label>
              <input
                {...register("date", { required: "Date is required" })}
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                Add Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
