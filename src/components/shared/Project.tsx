/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

interface ProjectType {
  _id: string;
  name: string;
  mockup: string;
  github: string;
  live: string;
}

const Project = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://portfolio-blog-server.vercel.app/api/projects", {
            cache: "force-cache"
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

  return (
    <div className="max-w-screen-xl mx-auto py-10 ">
      <div className="text-center mb-12">
        <h2 className="lg:text-4xl md:text-2xl text-primary font-extrabold bg-clip-text bg-gradient-to-b from-primary/10 to-transparent tracking-tight">
          My Projects
        </h2>
        <p className="text-secondary font-semibold mt-2">
          Showcase of the projects I've worked on
        </p>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {projects.slice(0, 3).map((project) => (
          <div
            key={project._id}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-b from-primary/10 to-transparent bg-opacity-90 ring ring-primary/50 ring-offset-2 hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={project.mockup}
              alt={project.name}
              height={500}
              width={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-primary">
                {project.name}
              </h3>
              <div className="flex justify-between mt-4">
                <div>
                  <Link
                    href={`/projects/${project._id}`}
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient hover:btn-primary px-4 py-2 border-2  rounded-lg"
                  >
                    See Details
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient  px-4 py-2 border-2  rounded-lg"
                  >
                    🔗
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          href="/projects"
          className="btn bg-opacity-10 ring ring-primary/50 ring-offset-2 text-secondary "
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Project;
