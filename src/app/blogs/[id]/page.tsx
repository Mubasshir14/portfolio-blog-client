/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Metadata, ResolvingMetadata } from "next/types";
import { Clock, Share2, BookmarkPlus, ThumbsUp } from "lucide-react";
import { headers } from "next/headers";
import { toast } from "sonner";
import CopyButton from "@/components/shared/CopyButton";

interface BlogType {
  _id: string;
  name: string;
  image: string;
  description: string;
  topic: string;
  date: string;
}

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const res = await fetch(
      `https://portfolio-blog-server.vercel.app/api/blogs/${params.id}`
    );
    const data: BlogType = await res.json();

    return {
      title: data.name,
      description: data.description,
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }
}

const BlogDetails = async ({ params }: any) => {
  const headersData = await headers();
  const baseUrl = headersData.get("host");
  const currentUrl = baseUrl ? `https://${baseUrl}/` : "";
  const { id } = await params;
  const res = await fetch(
    `https://portfolio-blog-server.vercel.app/api/blogs/${id}`,
    {
      cache: "no-store",
    }
  );
  const data: BlogType = await res.json();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-2xl font-semibold text-gray-700 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          Blog not found
        </div>
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(data.date), { addSuffix: true });

  return (
    <div className="min-h-screen bg-gradient-to-b  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-primary/[0.02] -z-10" />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Floating Action Bar */}
        <div className="fixed left-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-6">
          <button className="p-3 rounded-full bg-white/90 shadow-lg hover:shadow-xl dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 group">
            <ThumbsUp className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary" />
          </button>
          <button className="p-3 rounded-full bg-white/90 shadow-lg hover:shadow-xl dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 group">
            <BookmarkPlus className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary" />
          </button>
          <button>
            <CopyButton url={currentUrl} />
          </button>
        </div>

        {/* Blog Header */}
        <header className="text-center mb-20 max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary ring-1 ring-primary/20 backdrop-blur-sm">
              {data.topic}
            </span>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary leading-tight">
            {data.name}
          </h1>
        </header>

        {/* Featured Image */}
        <div className="relative mb-20">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-2xl opacity-20 animate-pulse" />
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video shadow-2xl ring-1 ring-gray-900/5">
            <Image
              src={data.image}
              alt={data.name}
              width={1920}
              height={1080}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-10" />
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12 mb-12 ring-1 ring-gray-900/5">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-px">
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 lg:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      Subscribe to Our Newsletter
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Get the latest articles and insights delivered straight to
                      your inbox.
                    </p>
                  </div>
                  <div className="lg:flex-row flex-col space-y-3 gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 outline-none dark:bg-gray-800"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
