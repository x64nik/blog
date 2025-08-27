import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import type { Post, PostMetadata } from "../types/post"

const postsDirectory = path.join(process.cwd(), "posts")

export async function getPostSlugs() {
  return await fs.readdir(postsDirectory)
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = await fs.readFile(fullPath, "utf8")
  const { data, content: rawContent } = matter(fileContents)

  // Process image paths and ensure content is valid
  let processedContent = rawContent
  try {
    processedContent = processImagePaths(rawContent)
  } catch (error) {
    console.error(`Error processing content for ${slug}:`, error)
    // Return raw content if processing fails
    processedContent = rawContent
  }

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    updatedDate: data.updatedDate,
    content: processedContent,
  }
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const slugs = await getPostSlugs()
  const files = await Promise.all(
    slugs.filter(slug => slug.endsWith('.md'))
      .map(async (slug) => {
        const realSlug = slug.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, slug)
        const fileContents = await fs.readFile(fullPath, "utf8")
        const { data } = matter(fileContents)
        return {
          slug: realSlug,
          title: data.title,
          date: data.date
        }
      })
  )
  return files.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export const POSTS_PER_PAGE = 10

export async function getPaginatedPosts(page: number) {
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // Clamp the page number to ensure it's within range
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return {
    posts: allPosts.slice(start, end),
    currentPage,
    totalPages,
  };
}

function processImagePaths(content: string): string {
  // Properly replace relative image paths with absolute paths for Markdown syntax
  return content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (src.startsWith("http") || src.startsWith("/")) {
      // If it's already an absolute URL or starts with /, return as is
      return match
    }
    // Prepend a base path (e.g., /images/) for relative image paths
    return `![${alt}](/images/${src})`
  })
}
