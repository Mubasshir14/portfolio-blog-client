"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Image from "next/image";

interface BlogType {
  _id: string;
  name: string;
  image: string;
  description: string;
  topic: string;
  date: string;
}

const ManageBlog = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "https://portfolio-blog-server.vercel.app/api/blogs",
          {
            cache: "no-cache",
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

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://portfolio-blog-server.vercel.app/api/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Blog Deleted Successfully");
        router.push("/blogs");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("An error occurred while deleting the blog");
    }
  };

  return (
    <div className="p-8 bg-base-100">
      <h2 className="text-3xl font-bold text-primary mb-6">Manage Blogs</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-4 border">Image</th>
              <th className="p-4 border">Blog Name</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="text-center border">
                <td className="p-4 border">
                  <Image
                    src={blog.image}
                    alt={blog.name}
                    height={64}
                    width={120}
                    className="h-16 w-28 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="p-4 border">{blog.name}</td>
                <td className="p-4 border space-x-2">
                  <Link
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    href={`/blogs/manageBlog/update/${blog._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlog;
