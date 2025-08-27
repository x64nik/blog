import { getPostBySlug } from "../../../utils/mdUtils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Image from "next/image";

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
  <Image src={props.src} alt={props.alt} className="rounded-lg my-8" width={props.width} height={props.height} />
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
      <div className="min-h-screen px-4 sm:px-6 lg:px-8">
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
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="link" className="mb-4 text-zinc-400 hover:text-zinc-300" asChild>
          <Link href="/posts">
            <ChevronLeft className="w-4 h-4" />
            Back to posts
          </Link>
        </Button>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="space-y-1 mb-8">
            <time className="text-muted-foreground block">{post.date}</time>
            {post.updatedDate && (
              <time className="text-muted-foreground text-sm block">
                Last updated: {post.updatedDate}
              </time>
            )}
          </div>
          <ReactMarkdown
            components={{
              img: CustomImage,
              a: CustomLink,
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            className="text-base"
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
      <footer className="text-zinc-200 mt-20 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">This blog is opensource, check it out!</p>
          <div className="mt-2">
            <Link href="https://github.com/x64nik/blog" className="text-zinc-400 hover:text-zinc-300 text-sm">
              github.com/x64nik/blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
