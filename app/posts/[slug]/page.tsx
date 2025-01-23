import { getPostBySlug, getPostSlugs } from "../../../utils/mdUtils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

export async function generateStaticParams() {
  const posts = await getPostSlugs()
  return posts.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }))
}

const CustomImage = (props: any) => {
  return (
    <Image
      src={props.src || "/placeholder.svg"}
      alt={props.alt || ""}
      width={800}
      height={400}
      className="rounded-lg my-8"
    />
  )
}

const CustomLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="link" className="mb-4 text-zinc-400 hover:text-zinc-300" asChild>
          <Link href="/">
            <ChevronLeft className="w-4 h-4" />
            Back to posts
          </Link>
        </Button>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <time className="text-zinc-400 block mb-8">{post.date}</time>
          <ReactMarkdown
            components={{
              img: CustomImage,
              a: CustomLink,
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}