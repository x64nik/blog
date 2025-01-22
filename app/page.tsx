import { Button } from "@/components/ui/button"
import { Pagination } from "../components/pagination"
import { getPaginatedPosts } from "../utils/mdUtils"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Book } from "lucide-react"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const requestedPage = Number(searchParams.page) || 1

  // Fetch posts and ensure valid pagination
  const { posts, totalPages, currentPage } = await getPaginatedPosts(requestedPage)

  // Redirect if the requested page is invalid
  if (requestedPage !== currentPage) {
    redirect(currentPage === 1 ? "/" : `/?page=${currentPage}`)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <main className="flex pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mt-10">
          <Button className="text-sm font-semibold mt-10 text-left" size="sm" variant="outline" ><Book />Blogs</Button>
          <Button className="text-sm font-semibold mt-10 text-left ml-2" size="sm" variant="outline" ><Book />About</Button>
          </div>
          {/* Display posts or fallback for empty states */}
          {posts.length > 0 ? (
            <div className="text-center">
              {posts.map((post) => (
                <div className="text-center">
                  <div
                  key={post.slug}
                  className="grid grid-cols-[1fr_2fr] gap-4 p-4 rounded-lg transition-colors"
                >
                  <time className="text-zinc-400 text-sm text-right sm:text-base">{post.date}</time>
                  <div>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-zinc-100 hover:text-zinc-300 transition-colors text-left text-sm sm:text-base block"
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-400">No posts available.</p>
              <Link href="/" className="text-zinc-100 hover:text-zinc-300">
                Back to Homepage
              </Link>
            </div>
          )}

          {/* Pagination component */}
          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/" />
        </div>
      </main>
    </div>
  )
}
