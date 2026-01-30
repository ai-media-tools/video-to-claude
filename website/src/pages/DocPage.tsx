import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeSectionize from '@hbsnow/rehype-sectionize'

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

// Heading type for table of contents
interface Heading {
  level: number
  text: string
  id: string
}

// Extract headings from DOM (ensures IDs match what rehype-slug actually generates)
function extractHeadingsFromDOM(container: HTMLElement): Heading[] {
  const headingElements = container.querySelectorAll('h2[id], h3[id]')
  const headings: Heading[] = []
  headingElements.forEach(el => {
    const level = el.tagName === 'H2' ? 2 : 3
    headings.push({
      level,
      text: el.textContent || '',
      id: el.id
    })
  })
  return headings
}

// Table of Contents component with fuzzy search and independent scrolling
function TableOfContents({
  headings,
  activeId,
  onActiveChange
}: {
  headings: Heading[]
  activeId: string
  onActiveChange: (id: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      // Update active state immediately on click
      onActiveChange(id)
      element.scrollIntoView({ behavior: 'smooth' })
      // Update URL hash without scrolling
      window.history.pushState(null, '', `#${id}`)
    }
  }, [onActiveChange])

  // Fuzzy filter headings based on search query
  const filteredHeadings = useMemo(() => {
    if (!searchQuery.trim()) return headings
    const query = searchQuery.toLowerCase()
    return headings.filter(h => h.text.toLowerCase().includes(query))
  }, [headings, searchQuery])

  if (headings.length === 0) return null

  return (
    <nav className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col">
        <h4 className="text-sm font-semibold text-[var(--color-bright)] mb-3">
          On this page
        </h4>

        {/* Search input */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Filter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-[var(--color-frame)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-cyan-dim)] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Scrollable list */}
        <ul className="space-y-2 text-sm overflow-y-auto flex-1 pr-2">
          {filteredHeadings.map((h, index) => (
            <li key={`${h.id}-${index}`} className={h.level === 3 ? 'pl-4' : ''}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={`block transition-colors ${
                  activeId === h.id
                    ? 'text-[var(--color-cyan)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
          {filteredHeadings.length === 0 && searchQuery && (
            <li className="text-[var(--color-muted)] text-xs italic">
              No matches found
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export function DocPage() {
  const { slug } = useParams<{ slug: string }>()
  const [activeId, setActiveId] = useState<string>('')
  const [headings, setHeadings] = useState<Heading[]>([])
  const articleRef = useRef<HTMLElement>(null)

  if (!slug || !docs[slug]) {
    return <Navigate to="/docs" replace />
  }

  const content = docs[slug]
  const currentIndex = navItems.findIndex(item => item.slug === slug)
  const prevDoc = currentIndex > 0 ? navItems[currentIndex - 1] : null
  const nextDoc = currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null

  // Extract headings from DOM after render (use requestAnimationFrame to ensure DOM is ready)
  useEffect(() => {
    const extractHeadings = () => {
      if (articleRef.current) {
        const extractedHeadings = extractHeadingsFromDOM(articleRef.current)
        setHeadings(extractedHeadings)
      }
    }
    // Wait for next frame to ensure markdown has rendered
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(extractHeadings)
    })
    return () => cancelAnimationFrame(frameId)
  }, [slug, content])

  // Track active section based on scroll position
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const headingElements = headings
        .map(h => ({ id: h.id, el: document.getElementById(h.id) }))
        .filter((h): h is { id: string; el: HTMLElement } => h.el !== null)

      if (headingElements.length === 0) return

      // Find the heading closest to the top of the viewport (with some offset for the header)
      const scrollTop = window.scrollY + 100 // Account for sticky header

      let activeHeading = headingElements[0].id
      for (const { id, el } of headingElements) {
        if (el.offsetTop <= scrollTop) {
          activeHeading = id
        } else {
          break
        }
      }

      setActiveId(activeHeading)
    }

    // Run once on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  // Reset active heading when slug changes
  useEffect(() => {
    setActiveId('')
    setHeadings([])
  }, [slug])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex gap-8">
        {/* Left sidebar */}
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
        <main className="flex-1 min-w-0 max-w-3xl">
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
          <article ref={articleRef} className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, [rehypeSectionize, { properties: { className: 'doc-section' } }]]}
              components={{
                // Handle sections created by rehype-sectionize - indent H3 sections
                section: ({ children, className, ...props }) => {
                  const dataProps = props as { 'data-heading-rank'?: string }
                  const headingRank = parseInt(dataProps['data-heading-rank'] || '0')

                  // H3 sections get indented with a left border
                  if (headingRank === 3) {
                    return (
                      <section className={`${className || ''} ml-4 pl-4 border-l-2 border-[var(--color-border)]`} {...props}>
                        {children}
                      </section>
                    )
                  }

                  return (
                    <section className={className} {...props}>
                      {children}
                    </section>
                  )
                },
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
                  <h3 id={id} className="text-xl font-medium text-[var(--color-bright)] mt-6 mb-3 scroll-mt-24">
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

        {/* Right TOC - On this page */}
        <TableOfContents headings={headings} activeId={activeId} onActiveChange={setActiveId} />
      </div>
    </div>
  )
}
