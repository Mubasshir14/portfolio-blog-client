/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Projects - All Projects",
};

const ProjectPage = async () => {
  const res = await fetch(
    "https://portfolio-blog-server.vercel.app/api/projects",
    {
      next: {
        revalidate: 5,
      },
    }
  );
  const data: ProjectType[] = await res.json();

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

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {data.map((project) => (
          <div
            key={project._id}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:bg-gradient-to-b from-primary/10 to-transparent bg-opacity-90 ring ring-primary/50 ring-offset-2 hover:scale-105 transition-transform duration-300"
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
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
