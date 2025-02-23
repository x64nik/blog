import { getPaginatedPosts } from "@/utils/mdUtils";
import Link from "next/link";

// Sample projects data
const projects = [
  {
    title: "ConfigCloud",
    description: "A self-hosted IaaS Platform allowing users to create and manage virtual machines.",
    status: "active",
    slug: "https://configcloud.net",
  },
  {
    title: "Homelab",
    description: "Self-Hosted cloud running in my room!",
    status: "active",
    slug: "homelab",
  },
];

export default async function Projects() {
  // Fetch the first page of posts
  const { posts } = await getPaginatedPosts(1);

  // Select the latest 4 posts
  const latestPosts = posts.slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto py-1 w-full items-start">
      {/* Writings Section */}
      <div className="mt-12">
        <h2 className="text-xl text-white font-semibold mb-4">Writings</h2>
        <div className="grid gap-2">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <div
                key={post.slug}
                className="flex justify-between items-center"
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-zinc-100 hover:text-blue-600 font-base underline"
                >
                  {post.title}
                </Link>
                <span className="text-zinc-400 text-base">{post.date}</span>
              </div>
            ))
          ) : (
            <p className="text-zinc-400">No posts available.</p>
          )}
        </div>
        <div className="mt-3">
              <div
                className="flex justify-between items-center"
              >
                <Link
                  href={`/posts`}
                  className="text-zinc-400 hover:text-blue-600 font-base"
                >
                  all blogs...
                </Link>
              </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-12">
        <h2 className="text-xl text-white font-semibold mb-4">Projects</h2>

        <div className="grid gap-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex justify-between items-center"
            >
              {/* Project Title and Description */}
              <div className="flex items-center text-zinc-100">
                <Link
                  href={`${project.slug}`}
                  className="hover:text-blue-600 font-base underline"
                >
                  {project.title}
                </Link>
                <span className="ml-2 text-zinc-400">
                  - {project.description}
                </span>
              </div>

              {/* Status */}
              {/* Status */}
              <div className="flex items-center">
                <span
                  className={`${
                    project.status === "active"} text-sm text-zinc-400 mr-2`}
                >
                  {project.status}
                </span>
                {/* Glowing Dot */}
                {project.status === "active" && (
                  <span className="w-2 h-2 mt-1 rounded-full bg-green-500 animate-pulse"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}