/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BlogType {
  _id: string;
  name: string;
  image: string;
  description: string;
  topic: string;
  date: string;
}

const UpdateBlog = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [blogData, setBlogData] = useState<BlogType | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://portfolio-blog-server.vercel.app/api/blogs/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setBlogData(data);

          setValue("name", data.name);
          setValue("image", data.image);
          setValue("description", data.description);
          setValue("topic", data.topic);
          setValue("date", data.date);
        } else {
          toast.error("Failed to fetch blog data");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Error fetching blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(
        `https://portfolio-blog-server.vercel.app/api/blogs/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Blog updated successfully");
        router.push("/blogs");
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-b from-primary/10 to-transparent bg-base-100">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary tracking-wide mb-4">
          Update Blog
        </h2>
        <p className="text-lg text-secondary">
          Edit the details of the blog below.
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
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                Update Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
