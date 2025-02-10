"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface ProjectType {
  _id: string;
  name: string;
  mockup: string;
  github: string;
  live: string;
}

const ManageProject = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://portfolio-blog-server.vercel.app/api/projects",
          {
            cache: "no-cache",
          }
        );
        const data: ProjectType[] = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
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
        `https://portfolio-blog-server.vercel.app/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Project Deleted Successfully");
        router.push("/projects");
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="p-8 bg-base-100 bg-gradient-to-b from-primary/10 to-transparent">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Manage Projects
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-4 border">Mockup</th>
              <th className="p-4 border">Project Name</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="text-center border">
                <td className="p-4 border">
                  <Image
                    src={project.mockup}
                    alt={project.name}
                    height={64}
                    width={120}
                    className="h-16 w-28 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="p-4 border">{project.name}</td>
                <td className="p-4 border space-x-2">
                  <Link
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    href={`/projects/manageProject/update/${project._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(project._id)}
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

export default ManageProject;
