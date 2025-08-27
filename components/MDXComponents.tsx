'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { CodeBlock } from './CodeBlock'
import ZoomableImage from './ZoomableImage'

interface MDXComponentsProps {
  source: MDXRemoteSerializeResult
}

const components = {
  pre: ({ children, ...props }: any) => {
    return <div className="not-prose relative" {...props}>{children}</div>
  },
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    if (className) {
      return <CodeBlock language={language} value={String(children).trim()} />
    }
    return <code {...props} className="bg-muted px-1.5 py-0.5 rounded text-sm">{children}</code>
  },
  img: ({ src, alt, ...props }: any) => {
    return <ZoomableImage 
      src={src} 
      alt={alt || ''} 
      width={800}
      height={450}
      {...props} 
    />
  },
}

export function MDXComponents({ source }: MDXComponentsProps) {
  return <MDXRemote {...source} components={components} />
}
