import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 data-grid opacity-50" />

        {/* Film sprocket decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-12 opacity-20">
          <div className="h-full" style={{
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0px, transparent 20px, var(--color-border) 20px, var(--color-border) 40px, transparent 40px, transparent 60px)`,
          }} />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-12 opacity-20">
          <div className="h-full" style={{
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0px, transparent 20px, var(--color-border) 20px, var(--color-border) 40px, transparent 40px, transparent 60px)`,
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          {/* Eyebrow */}
          <div className="animate-in delay-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-frame)]/50 mb-8">
            <span className="w-2 h-2 bg-[var(--color-cyan)] rounded-full animate-pulse" />
            <span className="text-sm font-mono text-[var(--color-text)]">
              A video codec for AI
            </span>
          </div>

          {/* Main headline */}
          <h1 className="animate-in delay-2 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-[var(--color-bright)]">Translate </span>
            <span className="relative">
              <span className="text-[var(--color-cyan)] glow-text">video</span>
            </span>
            <br />
            <span className="text-[var(--color-bright)]">for </span>
            <span className="relative">
              <span className="text-[var(--color-amber)] glow-text-amber">Claude</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-in delay-3 text-xl md:text-2xl text-[var(--color-text)] max-w-2xl mx-auto mb-12 leading-relaxed">
            Extract frames, analyze audio, generate spectrograms.
            <br />
            <span className="text-[var(--color-muted)]">
              Let Claude experience your videos.
            </span>
          </p>

          {/* CTA buttons */}
          <div className="animate-in delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/ai-media-tools/video-to-claude"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Get Started</span>
            </a>
            <a
              href="https://github.com/ai-media-tools/video-to-claude/wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Documentation
            </a>
          </div>

          {/* Quick install */}
          <div className="animate-in delay-5 mt-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)] font-mono text-sm">
              <span className="text-[var(--color-muted)]">$</span>
              <span className="text-[var(--color-cyan)]">pip install</span>
              <span className="text-[var(--color-bright)]">video-to-claude</span>
              <button
                onClick={() => navigator.clipboard.writeText('pip install video-to-claude[mcp,download]')}
                className="ml-2 p-1.5 rounded hover:bg-[var(--color-border)] transition-colors"
                title="Copy to clipboard"
              >
                <svg className="w-4 h-4 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-muted)]">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--color-muted)] to-transparent" />
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-mono text-[var(--color-cyan)] uppercase tracking-widest mb-4">
              How it works
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-[var(--color-bright)]">
              Video → Frames + Audio → Claude
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              number="01"
              icon={<FrameIcon />}
              title="Frame Extraction"
              description="Extract key frames at configurable intervals. Claude sees the visual progression of your video as a sequence of images."
            />
            <FeatureCard
              number="02"
              icon={<WaveformIcon />}
              title="Audio Analysis"
              description="Generate spectrograms, waveforms, and frequency analysis. Claude understands the audio characteristics and notable events."
            />
            <FeatureCard
              number="03"
              icon={<LinkIcon />}
              title="MCP Integration"
              description="Works with Claude Code locally via stdio, or remotely via the MCP protocol from claude.ai or any MCP client."
            />
          </div>
        </div>
      </section>

      {/* Terminal demo */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="terminal">
            <div className="terminal-dots">
              <div className="terminal-dot bg-[#ff5f57]" />
              <div className="terminal-dot bg-[#febc2e]" />
              <div className="terminal-dot bg-[#28c840]" />
            </div>
            <div className="pt-12 pb-8 px-6 space-y-4 text-sm">
              <div>
                <span className="text-[var(--color-muted)]"># Install with all features</span>
              </div>
              <div>
                <span className="text-[var(--color-cyan)]">$</span>
                <span className="text-[var(--color-bright)]"> pip install video-to-claude[mcp,download]</span>
              </div>
              <div className="pt-4">
                <span className="text-[var(--color-muted)]"># Convert a local video</span>
              </div>
              <div>
                <span className="text-[var(--color-cyan)]">$</span>
                <span className="text-[var(--color-bright)]"> video-to-claude convert ~/Videos/demo.mp4</span>
              </div>
              <div className="text-[var(--color-muted)] pl-2">
                → Extracting 20 frames...
                <br />
                → Analyzing audio...
                <br />
                → Generating manifest...
                <br />
                <span className="text-[var(--color-cyan)]">✓</span> Output: ./demo_for_claude/
              </div>
              <div className="pt-4">
                <span className="text-[var(--color-muted)]"># Or convert from YouTube</span>
              </div>
              <div>
                <span className="text-[var(--color-cyan)]">$</span>
                <span className="text-[var(--color-bright)]"> video-to-claude convert "https://youtube.com/watch?v=..."</span>
              </div>
              <div className="pt-4">
                <span className="text-[var(--color-muted)]"># Upload to cloud for remote access</span>
              </div>
              <div>
                <span className="text-[var(--color-cyan)]">$</span>
                <span className="text-[var(--color-bright)]"> video-to-claude upload ./demo_for_claude/ --name "My Demo"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data notice */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flow-border p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="hidden md:block">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--color-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--color-bright)] mb-4">
                  Your Data, Your Control
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <DataPoint
                    title="You own it"
                    description="We're just hosting — no claims on your content"
                  />
                  <DataPoint
                    title="Auto-delete"
                    description="90 days max, or delete anytime from your dashboard"
                  />
                  <DataPoint
                    title="Private by default"
                    description="Only you can access your uploaded videos"
                  />
                  <DataPoint
                    title="No training"
                    description="Your content is never used to train AI models"
                  />
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <Link
                    to="/privacy"
                    className="text-sm text-[var(--color-cyan)] hover:underline inline-flex items-center gap-2"
                  >
                    Read our Privacy Policy
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-bright)] mb-6">
            Ready to get started?
          </h2>
          <p className="text-[var(--color-text)] mb-8">
            Install the CLI, convert your first video, and let Claude experience it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/ai-media-tools/video-to-claude"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>View on GitHub</span>
            </a>
            <Link to="/dashboard" className="btn-secondary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  number,
  icon,
  title,
  description,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="feature-card group">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/20 flex items-center justify-center text-[var(--color-cyan)] group-hover:bg-[var(--color-cyan)]/20 transition-colors">
          {icon}
        </div>
        <span className="font-mono text-sm text-[var(--color-muted)]">{number}</span>
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-bright)] mb-3">{title}</h3>
      <p className="text-[var(--color-text)] leading-relaxed">{description}</p>
    </div>
  )
}

function DataPoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] mt-2 shrink-0" />
      <div>
        <div className="font-medium text-[var(--color-bright)]">{title}</div>
        <div className="text-[var(--color-muted)]">{description}</div>
      </div>
    </div>
  )
}

function FrameIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function WaveformIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}
