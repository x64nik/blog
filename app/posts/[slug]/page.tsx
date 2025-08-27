import { getPostBySlug } from "../../../utils/mdUtils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import ZoomableImage from "@/components/ZoomableImage";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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



import type { Post } from '@/types/post'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post: Post;

  try {
    post = await getPostBySlug(params.slug);

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

          <article className="prose prose-invert prose-lg max-w-none [&>p]:mb-1 [&>*:not(div)]:mr-0 [&_p+div]:mt-0 [&_div+p]:mt-1">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="space-y-1 mb-6">
              <time className="text-muted-foreground block">{post.date}</time>
              {post.updatedDate && post.updatedDate !== post.date && (
                <time className="text-muted-foreground text-sm block">
                  Last updated: {post.updatedDate}
                </time>
              )}
            </div>
            <div className="prose-pre:p-0 prose-pre:bg-transparent">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className="break-words"
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    const language = match ? match[1] : ''
                    const isInline = !className

                    if (!isInline) {
                      return (
                        <CodeBlock
                          language={language}
                          value={String(children).replace(/\n$/, '')}
                        />
                      )
                    }

                    return (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    )
                  },
                  img({ src, alt, ...props }) {
                    if (!src) return null
                    return <ZoomableImage 
                      src={src} 
                      alt={alt || ''} 
                      width={800}
                      height={450}
                    />
                  },
                  p: ({ children }) => {
                    return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
                  },
                  strong: ({ children }) => {
                    return <strong className="font-semibold">{children}</strong>
                  },
                  em: ({ children }) => {
                    return <em className="italic">{children}</em>
                  },
                  h1: ({ children }) => {
                    return <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{children}</h1>
                  },
                  h2: ({ children }) => {
                    return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>
                  },
                  h3: ({ children }) => {
                    return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>
                  },
                  h4: ({ children }) => {
                    return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>
                  },
                  ul: ({ children }) => {
                    return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
                  },
                  ol: ({ children }) => {
                    return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
                  },
                  blockquote: ({ children }) => {
                    return <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
                  },
                  a: ({ children, href }) => {
                    return <Link href={href || ''} className="font-medium underline underline-offset-4">{children}</Link>
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
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
  } catch (error) {
    console.error('Error rendering blog post:', error);
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Error loading post</h1>
          <p className="text-muted-foreground mb-4">
            Sorry, there was an error loading this post. Please try again later.
          </p>
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
          <div className="prose-pre:p-0 prose-pre:bg-transparent">
            
          </div>
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
