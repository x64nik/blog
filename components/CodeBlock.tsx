'use client'

import { Check, Copy } from 'lucide-react'
import { useState, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-shell-session'

interface CodeBlockProps {
  language: string
  value: string | string[]
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeContent = Array.isArray(value) ? value.join('') : value
  
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group">
      <pre className={`language-${language || 'text'} relative`}>
        <code className={`language-${language || 'text'}`}>
          {codeContent}
        </code>
      </pre>
      <button
        className="absolute right-3 top-3 p-2 rounded-lg bg-muted/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={onCopy}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {language && (
        <div className="absolute right-3 bottom-3 text-xs text-muted-foreground opacity-50">
          {language}
        </div>
      )}
    </div>
  )
}
