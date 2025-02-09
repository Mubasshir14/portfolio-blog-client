/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next/types";

interface ProjectType {
  _id: string;
  name: string;
  mockup: string;
  github: string;
  live: string;
  description: string;
  technologies: string[];
}
// type PageProps = {
//   params: { id: string };
// };
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(
    `https://portfolio-blog-server.vercel.app/api/projects/${id}`,
    {
      cache: "no-store",
    }
  );
  const project: ProjectType = await res.json();

  return {
    title: `${project.name} | Project Details`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.mockup],
    },
  };
}

const ProjectDetails = async ({ params }: any) => {
  const { id } = await params;
  const res = await fetch(
    `https://portfolio-blog-server.vercel.app/api/projects/${id}`,
    {
      cache: "no-store",
    }
  );
  const data: ProjectType = await res.json();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700 bg-white p-8 rounded-lg shadow-lg">
          Project not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="max-w-screen-xl mx-auto py-16 px-6 sm:px-10">
        {/* Project Header */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              {data.name}
            </span>
          </h1>
          <p className="text-lg md:text-xl  font-medium max-w-3xl mx-auto leading-relaxed text-justify">
            {data.description}
          </p>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Mockup Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300" />
            <div className="relative bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 rounded-2xl leading-none flex items-center">
              <Image
                src={data.mockup}
                alt={data.name}
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-10">
            <div className="bg-white/70 dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-500">
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Technologies Used
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={data.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 text-center text-white bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-lg transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
              >
                View Live Demo
              </a>
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 text-center text-white bg-gradient-to-r from-secondary to-primary rounded-xl font-bold text-lg transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
              >
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
