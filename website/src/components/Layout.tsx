import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Layout() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text)] grain-overlay scanlines">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--color-cyan)] opacity-[0.02] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-amber)] opacity-[0.015] blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-void)]/90 backdrop-blur-xl border-b border-[var(--color-border)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            {/* Logo mark */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-[var(--color-cyan)] rounded-sm rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
              <div className="absolute inset-1 bg-[var(--color-cyan)] opacity-20 rounded-sm rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-[var(--color-cyan)] rounded-full group-hover:scale-150 transition-transform duration-300" />
              </div>
            </div>
            <span
              className="font-mono text-lg font-semibold text-[var(--color-bright)] group-hover:text-[var(--color-cyan)] transition-colors glitch-hover"
              data-text="v2c"
            >
              v2c
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/privacy">Privacy</NavLink>
            <NavLink to="/terms">Terms</NavLink>
            <a
              href="https://github.com/ai-media-tools/video-to-claude"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-[var(--color-border)] mt-32">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-[var(--color-cyan-dim)] rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[var(--color-cyan-dim)] rounded-full" />
              </div>
              <span className="font-mono text-sm text-[var(--color-muted)]">
                video-to-claude
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              >
                Terms
              </Link>
              <a
                href="mailto:hello@ai-media-tools.dev"
                className="text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="text-sm text-[var(--color-muted)]">
              Open source under MIT
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
        isActive
          ? 'text-[var(--color-cyan)] bg-[var(--color-cyan)]/10'
          : 'text-[var(--color-muted)] hover:text-[var(--color-bright)] hover:bg-[var(--color-frame)]'
      }`}
    >
      {children}
    </Link>
  )
}
