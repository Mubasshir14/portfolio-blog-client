"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogType {
  _id: string;
  name: string;
  image: string;
  description: string;
  topic: string;
  date: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://portfolio-blog-server.vercel.app/api/blogs", {
            cache: "force-cache"
          }
        );
        const data: BlogType[] = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <div className="text-center mb-12">
        <h2 className="lg:text-4xl md:text-2xl text-primary font-extrabold bg-clip-text bg-gradient-to-b from-primary/10 to-transparent tracking-tight">
          My Blogs
        </h2>
        <p className="text-secondary font-semibold mt-2">
          Insights and articles on web development and more
        </p>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {blogs.slice(0, 3).map((blog) => (
          <div
            key={blog._id}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-b from-primary/10 to-transparent bg-opacity-90 ring ring-primary/50 ring-offset-2 hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={blog.image}
              alt={blog.name}
              height={500}
              width={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-primary">
                {blog.name}
              </h3>
              <p className="text-sm text-secondary mt-2">
                {blog.description.slice(0, 30)}...
              </p>
              <div className="flex justify-between mt-4">
                <Link
                  href={`/blogs/${blog._id}`}
                  className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient hover:btn-primary px-4 py-2 border-2 rounded-lg flex items-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          href="/blogs"
          className="btn bg-opacity-10 ring ring-primary/50 ring-offset-2 text-secondary "
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
