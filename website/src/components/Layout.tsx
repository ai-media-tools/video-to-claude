import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-white hover:text-purple-400 transition-colors">
            video-to-claude
          </Link>
          <div className="flex gap-6 text-sm">
            <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <a
              href="https://github.com/ai-media-tools/video-to-claude"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Media Tools. Open source under MIT license.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            {' · '}
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            {' · '}
            <a href="mailto:privacy@ai-media-tools.dev" className="hover:text-white">Contact</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
