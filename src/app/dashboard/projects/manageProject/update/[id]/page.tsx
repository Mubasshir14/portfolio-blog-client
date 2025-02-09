/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProjectType {
  _id: string;
  name: string;
  mockup: string;
  github: string;
  live: string;
  description: string;
  technologies: string[];
}

const UpdateProject = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectType>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `https://portfolio-blog-server.vercel.app/api/projects/${id}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch project details");

        const data: ProjectType = await res.json();
        setValue("name", data.name);
        setValue("mockup", data.mockup);
        setValue("github", data.github);
        setValue("live", data.live);
        setValue("description", data.description);
        setSelectedTechnologies(data.technologies || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id, setValue]);

  useEffect(() => {
    setValue("technologies", selectedTechnologies);
  }, [selectedTechnologies, setValue]);

  const handleTechnologyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setSelectedTechnologies((prev) =>
      checked ? [...prev, value] : prev.filter((tech) => tech !== value)
    );
  };

  const onSubmit = async (data: ProjectType) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://portfolio-blog-server.vercel.app/api/projects/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, technologies: selectedTechnologies }),
        }
      );

      if (response.ok) {
        toast.success("Project Updated Successfully!");
        router.push("/projects");
      } else {
        toast.error("Failed to update project.");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-b from-primary/10 to-transparent bg-base-100">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary tracking-wide mb-4">
          Update Project
        </h2>
        <p className="text-lg text-secondary">
          Modify the project details below and save the changes.
        </p>
      </div>

      <div className="w-full max-w-4xl p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-primary text-sm mb-2">
                Project Name
              </label>
              <input
                {...register("name", { required: "Project Name is required" })}
                type="text"
                id="name"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Mockup Image */}
            <div>
              <label
                htmlFor="mockup"
                className="block text-primary text-sm mb-2"
              >
                Mockup Image URL
              </label>
              <input
                {...register("mockup", {
                  required: "Mockup Image URL is required",
                })}
                type="url"
                id="mockup"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.mockup && (
                <p className="text-red-500 text-sm">{errors.mockup.message}</p>
              )}
            </div>

            {/* Github Link */}
            <div>
              <label
                htmlFor="github"
                className="block text-primary text-sm mb-2"
              >
                Github Link
              </label>
              <input
                {...register("github", { required: "Github URL is required" })}
                type="url"
                id="github"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.github && (
                <p className="text-red-500 text-sm">{errors.github.message}</p>
              )}
            </div>

            {/* Live Link */}
            <div>
              <label htmlFor="live" className="block text-primary text-sm mb-2">
                Live Link
              </label>
              <input
                {...register("live", { required: "Live Link is required" })}
                type="url"
                id="live"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.live && (
                <p className="text-red-500 text-sm">{errors.live.message}</p>
              )}
            </div>

            {/* Project Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-primary text-sm mb-2"
              >
                Project Description
              </label>
              <textarea
                {...register("description", {
                  required: "Project Description is required",
                })}
                rows={4}
                id="description"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Technologies Used */}
            <div className="sm:col-span-2">
              <label className="block text-primary text-sm mb-2">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Firebase",
                  "Typescript",
                  "Redux",
                ].map((tech) => (
                  <div key={tech} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tech}
                      value={tech}
                      onChange={handleTechnologyChange}
                      checked={selectedTechnologies.includes(tech)}
                      className="mr-2"
                    />
                    <label htmlFor={tech} className="text-primary">
                      {tech}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                {loading ? "Updating..." : "Update Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
