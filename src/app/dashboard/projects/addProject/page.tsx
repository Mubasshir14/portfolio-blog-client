/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddProject = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

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

  const onSubmit = async (data: any) => {
    const formData = { ...data, technologies: selectedTechnologies };

    try {
      const response = await fetch(
        "https://portfolio-blog-server.vercel.app/api/projects",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Project Added");
        router.push("/projects");
      } else {
        console.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-b from-primary/10 to-transparent bg-base-100">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary tracking-wide mb-4">
          Add New Project
        </h2>
        <p className="text-lg text-secondary">
          Fill in the details below to add a new project.
        </p>
      </div>

      <div className="w-full max-w-4xl p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-primary text-sm mb-2">
                Project Name
              </label>
              <input
                {...register("name", { required: "Project Name is required" })}
                type="text"
                id="name"
                placeholder="Enter project name"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                placeholder="Enter mockup image URL"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                placeholder="Enter Github Link URL"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="live" className="block text-primary text-sm mb-2">
                Live Link
              </label>
              <input
                {...register("live", { required: "Live Link is required" })}
                type="url"
                id="live"
                placeholder="Enter Live Link URL"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                placeholder="Enter project description"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="technologies"
                className="block text-primary text-sm mb-2"
              >
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  "React.js",
                  "Swiper Slider",
                  "Sweetalert2",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Firebase",
                  "JWT",
                  "STRIPE",
                  "SSLCOMMERZ",
                  "SurjoPay",
                  "Next.js",
                  "Mongoose",
                  "Typescript",
                  "Redux",
                  "RTK Query",
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

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-3 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                Add Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
