import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/github-dark.css'
import 'katex/dist/katex.min.css'

type MarkdownRendererProps = {
  content: string
  className?: string
}

export default function MarkdownRenderer( {
  content,
  className,
}: MarkdownRendererProps ) {
  return (
    <div
      className={cn(
        'prose prose-sm dark:prose-invert max-w-none',

        // Paragraphs
        'prose-p:my-2 prose-p:leading-relaxed',

        // Headings
        'prose-headings:mt-4 prose-headings:mb-2 prose-headings:font-semibold',
        'prose-h1:text-xl prose-h2:text-lg prose-h3:text-base',

        // Lists
        'prose-ul:my-2 prose-ol:my-2 prose-li:my-1',

        // Inline code
        'prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-muted prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none',

        // Code blocks
        'prose-pre:my-3 prose-pre:p-3 prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:overflow-x-auto',

        // Blockquote
        'prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-3',

        // Tables — wrapper gets overflow-x-auto via custom component below
        'prose-table:my-3 prose-table:border-collapse prose-table:w-full',
        'prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:font-semibold prose-th:text-left',
        'prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2',

        // Images
        'prose-img:rounded-lg prose-img:my-3 prose-img:shadow-sm',

        // Links
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',

        // Text formatting
        'prose-strong:font-semibold prose-strong:text-foreground',
        'prose-em:italic',

        // KaTeX styling
        '[&_.katex]:text-base',
        '[&_.katex-display]:my-3',
        '[&_.katex-display]:overflow-x-auto',
        '[&_.katex]:!text-inherit',
        '[&_.katex-display]:!text-inherit',

        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-3 rounded-lg border border-border">
              <table {...props} className="w-full border-collapse">
                {children}
              </table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
