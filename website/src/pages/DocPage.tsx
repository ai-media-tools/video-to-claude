import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

// Import all markdown files at build time
const modules = import.meta.glob('../docs/*.md', { query: '?raw', import: 'default', eager: true })

// Build a map of slug -> content
const docs: Record<string, string> = {}
for (const path in modules) {
  const slug = path.replace('../docs/', '').replace('.md', '')
  docs[slug] = modules[path] as string
}

// Navigation structure
const navItems = [
  { slug: 'Home', title: 'Overview' },
  { slug: 'Getting-Started', title: 'Getting Started' },
  { slug: 'CLI-Reference', title: 'CLI Reference' },
  { slug: 'Claude-Code-Setup', title: 'Claude Code Setup' },
  { slug: 'Claude-AI-Setup', title: 'Claude.ai Setup' },
  { slug: 'YouTube-and-URLs', title: 'YouTube & URLs' },
  { slug: 'Uploading-Videos', title: 'Uploading Videos' },
  { slug: 'Dashboard', title: 'Dashboard' },
  { slug: 'Troubleshooting', title: 'Troubleshooting' },
]

export function DocPage() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !docs[slug]) {
    return <Navigate to="/docs" replace />
  }

  const content = docs[slug]
  const currentIndex = navItems.findIndex(item => item.slug === slug)
  const prevDoc = currentIndex > 0 ? navItems[currentIndex - 1] : null
  const nextDoc = currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Docs
            </Link>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.slug}
                  to={`/docs/${item.slug}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    item.slug === slug
                      ? 'bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] font-medium'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-bright)] hover:bg-[var(--color-frame)]'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
              <a
                href={`https://github.com/ai-media-tools/video-to-claude/wiki/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Edit on GitHub
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile back link */}
          <Link
            to="/docs"
            className="lg:hidden inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Docs
          </Link>

          {/* Markdown content */}
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
              components={{
                // Custom heading styles
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-bright)] mb-6 pb-4 border-b border-[var(--color-border)]">
                    {children}
                  </h1>
                ),
                h2: ({ children, id }) => (
                  <h2 id={id} className="text-2xl font-semibold text-[var(--color-bright)] mt-12 mb-4 scroll-mt-24">
                    {children}
                  </h2>
                ),
                h3: ({ children, id }) => (
                  <h3 id={id} className="text-xl font-medium text-[var(--color-bright)] mt-8 mb-3 scroll-mt-24">
                    {children}
                  </h3>
                ),
                h4: ({ children, id }) => (
                  <h4 id={id} className="text-lg font-medium text-[var(--color-bright)] mt-6 mb-2 scroll-mt-24">
                    {children}
                  </h4>
                ),
                // Paragraphs
                p: ({ children }) => (
                  <p className="text-[var(--color-text)] mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
                // Links - handle wiki links
                a: ({ href, children }) => {
                  // Convert wiki-style links to doc links
                  const isWikiLink = href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')
                  const finalHref = isWikiLink ? `/docs/${href}` : href

                  const isExternal = href?.startsWith('http')
                  return (
                    <a
                      href={finalHref}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="text-[var(--color-cyan)] hover:underline"
                    >
                      {children}
                    </a>
                  )
                },
                // Code blocks
                pre: ({ children }) => (
                  <pre className="bg-[var(--color-film)] border border-[var(--color-border)] rounded-xl p-4 overflow-x-auto my-4 text-sm">
                    {children}
                  </pre>
                ),
                code: ({ className, children }) => {
                  const isInline = !className
                  if (isInline) {
                    return (
                      <code className="bg-[var(--color-frame)] px-1.5 py-0.5 rounded text-[var(--color-cyan)] text-sm font-mono">
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className="text-[var(--color-text)] font-mono">
                      {children}
                    </code>
                  )
                },
                // Lists
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--color-text)]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-[var(--color-text)]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[var(--color-text)]">
                    {children}
                  </li>
                ),
                // Tables
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[var(--color-frame)]">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="border border-[var(--color-border)] px-4 py-2 text-left text-[var(--color-bright)] font-medium">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)]">
                    {children}
                  </td>
                ),
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[var(--color-cyan)] pl-4 my-4 italic text-[var(--color-muted)]">
                    {children}
                  </blockquote>
                ),
                // Horizontal rule
                hr: () => (
                  <hr className="border-t border-[var(--color-border)] my-8" />
                ),
                // Strong/bold
                strong: ({ children }) => (
                  <strong className="font-semibold text-[var(--color-bright)]">
                    {children}
                  </strong>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* Prev/Next navigation */}
          <nav className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--color-border)]">
            {prevDoc ? (
              <Link
                to={`/docs/${prevDoc.slug}`}
                className="group flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{prevDoc.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextDoc ? (
              <Link
                to={`/docs/${nextDoc.slug}`}
                className="group flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              >
                <span>{nextDoc.title}</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </main>
      </div>
    </div>
  )
}
