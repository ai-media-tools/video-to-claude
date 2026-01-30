import { Link } from 'react-router-dom'

// Define the docs structure with proper ordering and metadata
const docs = [
  { slug: 'Home', title: 'Overview', description: 'What video-to-claude does and how it works' },
  { slug: 'Getting-Started', title: 'Getting Started', description: 'Installation and your first video' },
  { slug: 'CLI-Reference', title: 'CLI Reference', description: 'All commands and options' },
  { slug: 'Claude-Code-Setup', title: 'Claude Code Setup', description: 'Local MCP integration for Claude Code' },
  { slug: 'Claude-AI-Setup', title: 'Claude.ai Setup', description: 'Remote MCP for claude.ai' },
  { slug: 'YouTube-and-URLs', title: 'YouTube & URLs', description: 'Processing online videos' },
  { slug: 'Uploading-Videos', title: 'Uploading Videos', description: 'Share videos to the cloud' },
  { slug: 'Dashboard', title: 'Dashboard', description: 'Manage videos via web interface' },
  { slug: 'Troubleshooting', title: 'Troubleshooting', description: 'Common issues and fixes' },
]

export function Docs() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-frame)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
          Documentation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-bright)] mb-4">
          Learn video-to-claude
        </h1>
        <p className="text-lg text-[var(--color-text)]">
          Everything you need to help Claude experience your videos.
        </p>
      </div>

      {/* Quick start highlight */}
      <Link
        to="/docs/Getting-Started"
        className="block p-6 mb-8 rounded-xl bg-gradient-to-r from-[var(--color-cyan)]/10 to-transparent border border-[var(--color-cyan)]/20 hover:border-[var(--color-cyan)]/40 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-mono text-[var(--color-cyan)] mb-1">Recommended</div>
            <h2 className="text-xl font-semibold text-[var(--color-bright)] mb-1">Getting Started</h2>
            <p className="text-[var(--color-muted)]">New here? Start with installation and your first video.</p>
          </div>
          <svg className="w-6 h-6 text-[var(--color-cyan)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      {/* Docs grid */}
      <div className="grid gap-4">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            to={`/docs/${doc.slug}`}
            className="group p-5 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)] hover:border-[var(--color-cyan-dim)] transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-[var(--color-bright)] group-hover:text-[var(--color-cyan)] transition-colors">
                  {doc.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mt-1">{doc.description}</p>
              </div>
              <svg className="w-5 h-5 text-[var(--color-muted)] group-hover:text-[var(--color-cyan)] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-12 p-4 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-muted)]">
          These docs are synced from the{' '}
          <a
            href="https://github.com/ai-media-tools/video-to-claude/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-cyan)] hover:underline"
          >
            GitHub Wiki
          </a>
          . Found an issue?{' '}
          <a
            href="https://github.com/ai-media-tools/video-to-claude/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-cyan)] hover:underline"
          >
            Let us know
          </a>
          .
        </p>
      </div>
    </div>
  )
}
