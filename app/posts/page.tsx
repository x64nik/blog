import { ChevronLeft } from "lucide-react";
import { Pagination } from "../../components/pagination";
import { getPaginatedPosts } from "../../utils/mdUtils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export async function generateMetadata() {
  return {
    title: "Posts - Blog",
    description: "A blog featuring paginated posts.",
  };
}

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const requestedPage = Number(searchParams.page) || 1;

  // Fetch posts and ensure valid pagination
  const { posts, totalPages, currentPage } = await getPaginatedPosts(requestedPage);

  // Redirect if the requested page is invalid
  if (requestedPage !== currentPage) {
    redirect(currentPage === 1 ? "/" : `/?page=${currentPage}`);
  }

  return (
    <div className="flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Button variant="link" className="text-muted-foreground hover:text-foreground" asChild>
          <Link href="/">
            <ChevronLeft className="w-4 h-4" />
            Homepage
          </Link>
        </Button>
      </div>
      <main className="flex pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Display posts or fallback for empty states */}
          {posts.length > 0 ? (
            <div className="text-center">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="grid grid-cols-[1fr_2fr] gap-4 p-1 rounded-lg transition-colors"
                >
                  <time className="text-zinc-400 text-right">{post.date}</time>
                  <div>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-zinc-100 hover:text-zinc-300 transition-colors text-left block"
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-400">No posts available.</p>
              <Link href="/" className="text-zinc-100 hover:text-zinc-300">
                Homepage
              </Link>
            </div>
          )}

          {/* Pagination component */}
          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/" />
        </div>
      </main>
    </div>
  );
}
