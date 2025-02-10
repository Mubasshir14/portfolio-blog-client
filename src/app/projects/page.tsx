/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface ProjectType {
  _id: string;
  name: string;
  mockup: string;
  github: string;
  live: string;
}

const ProjectPage = () => {
  const [data, setData] = useState<ProjectType[]>([]);

  useEffect(() => {
    fetch("https://portfolio-blog-server.vercel.app/api/projects")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <div className="text-center mb-12">
        <h2 className="lg:text-4xl md:text-2xl text-primary font-extrabold bg-clip-text bg-gradient-to-b from-primary/10 to-transparent tracking-tight">
          My Projects
        </h2>
        <p className="text-secondary font-semibold mt-2">
          Showcase of the projects I've worked on
        </p>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {data.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl bg-opacity-90 ring ring-primary/50 ring-offset-2 transition-transform duration-300"
          >
            <Image
              src={project.mockup}
              alt={project.name}
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-primary">
                {project.name}
              </h3>
              <div className="flex justify-between items-center mt-4">
                <Link
                  href={`/projects/${project._id}`}
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent px-4 py-2 border-2 border-secondary rounded-lg transition-all duration-300 hover:ring-2 hover:ring-secondary"
                >
                  See Details
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent  border-2 rounded-lg transition-all duration-300 hover:ring-2 hover:ring-secondary"
                  >
                    🔗
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:text-secondary rounded-lg  hover:ring-2 hover:ring-secondary"
                  >
                    <FaGithub size={24} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
