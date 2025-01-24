import { getPostBySlug } from "../../../utils/mdUtils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  function getExcerpt(content: string, length = 150): string {
  // Strip Markdown formatting and return the first `length` characters
  return content.replace(/[#_*~`>!\[\]\(\)]/g, "").slice(0, length) + "...";
  }
  const postExcerpt = getExcerpt(post.content);
  if (!post) {
    return {
      title: "Post not found - Blog",
      description: "The post you're looking for doesn't exist.",
    };
  }

  
  return {
    title: `${post.title} - Blog`,
    description: postExcerpt,
  };
}

const CustomImage = (props: any) => (
  <img src={props.src || "/placeholder.svg"} alt={props.alt || ""} className="rounded-lg my-8" />
);

const CustomLink = (props: any) => {
  const isInternalLink = props.href?.startsWith("/") || props.href?.startsWith("#");

  if (isInternalLink) {
    return <Link href={props.href} {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Button variant="link" className="text-zinc-100 hover:text-zinc-300" asChild>
            <Link href="/posts">
              <ChevronLeft className="w-4 h-4" />
              Back to posts
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="link" className="mb-4 text-zinc-400 hover:text-zinc-300" asChild>
          <Link href="/posts">
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
  );
}
