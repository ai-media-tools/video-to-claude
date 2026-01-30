import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          video-to-claude
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          A video codec for Claude. Convert videos into frames and audio analysis
          so Claude can experience them.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com/ai-media-tools/video-to-claude"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors"
          >
            Get Started
          </a>
          <a
            href="https://github.com/ai-media-tools/video-to-claude/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Documentation
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
          <div className="text-3xl mb-4">🎬</div>
          <h3 className="text-lg font-semibold mb-2">Frame Extraction</h3>
          <p className="text-gray-400 text-sm">
            Extract key frames at regular intervals so Claude can see the visual progression.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
          <div className="text-3xl mb-4">🎵</div>
          <h3 className="text-lg font-semibold mb-2">Audio Analysis</h3>
          <p className="text-gray-400 text-sm">
            Generate spectrograms, waveforms, and frequency analysis for audio understanding.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
          <div className="text-3xl mb-4">🔗</div>
          <h3 className="text-lg font-semibold mb-2">MCP Integration</h3>
          <p className="text-gray-400 text-sm">
            Works with Claude Code locally or claude.ai remotely via MCP protocol.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 font-mono text-sm">
          <div className="text-gray-500 mb-2"># Install</div>
          <div className="text-green-400 mb-4">pip install video-to-claude[mcp,download]</div>

          <div className="text-gray-500 mb-2"># Convert a video</div>
          <div className="text-green-400 mb-4">video-to-claude convert ~/Videos/my-video.mp4</div>

          <div className="text-gray-500 mb-2"># Or a YouTube video</div>
          <div className="text-green-400">video-to-claude convert "https://youtube.com/watch?v=..."</div>
        </div>
      </section>

      {/* Data Notice */}
      <section className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
        <h2 className="text-lg font-semibold mb-3">Your Data, Your Control</h2>
        <p className="text-gray-400 text-sm mb-4">
          When you upload processed videos to our cloud service:
        </p>
        <ul className="text-gray-400 text-sm space-y-2 ml-4">
          <li>• <strong className="text-white">You own your data</strong> — we're just hosting it</li>
          <li>• <strong className="text-white">Auto-deletion after 90 days</strong> — or delete anytime</li>
          <li>• <strong className="text-white">Private by default</strong> — only you can access your videos</li>
          <li>• <strong className="text-white">No training</strong> — your content is never used to train models</li>
        </ul>
        <p className="text-gray-500 text-sm mt-4">
          Read our <Link to="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link> for full details.
        </p>
      </section>
    </div>
  )
}
