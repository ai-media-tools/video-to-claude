export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-12">Last updated: January 29, 2025</p>

      <div className="prose prose-invert prose-gray max-w-none space-y-8">
        {/* TL;DR */}
        <section className="p-6 bg-purple-900/20 rounded-xl border border-purple-800/50">
          <h2 className="text-xl font-semibold mb-3 text-purple-300">TL;DR</h2>
          <ul className="text-gray-300 space-y-2">
            <li>• You own your data. We don't.</li>
            <li>• We store processed video files (frames, audio analysis) on Cloudflare R2.</li>
            <li>• Data is automatically deleted after 90 days, or you can delete it anytime.</li>
            <li>• We only collect your GitHub username for authentication.</li>
            <li>• We don't sell your data or use it to train AI models.</li>
            <li>• You can request deletion of all your data at any time.</li>
          </ul>
        </section>

        {/* What We Collect */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Collect</h2>
          <p className="text-gray-400 mb-4">
            When you use video-to-claude's cloud features, we collect:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
              <h3 className="font-medium mb-2">Authentication Data</h3>
              <p className="text-gray-400 text-sm">
                Your GitHub username and a unique identifier. We use GitHub OAuth for authentication
                and do not store your GitHub password or access your repositories.
              </p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
              <h3 className="font-medium mb-2">Processed Video Content</h3>
              <p className="text-gray-400 text-sm">
                When you upload processed videos, we store: extracted frames (JPG images),
                audio spectrograms and waveforms (PNG images), audio analysis data (JSON),
                and a manifest file describing the content. We do <strong>not</strong> store
                the original video file.
              </p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
              <h3 className="font-medium mb-2">Usage Logs</h3>
              <p className="text-gray-400 text-sm">
                Basic server logs including IP addresses, timestamps, and API endpoints accessed.
                These are used for debugging and security purposes and are retained for 30 days.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use It */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
          <p className="text-gray-400 mb-4">Your data is used exclusively to:</p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• Provide the video-to-claude service (storing and serving your processed videos)</li>
            <li>• Authenticate you and ensure you can only access your own content</li>
            <li>• Debug issues and maintain service reliability</li>
          </ul>
          <p className="text-gray-400 mt-4 font-medium">
            We do NOT use your data to:
          </p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• Train AI or machine learning models</li>
            <li>• Sell to third parties</li>
            <li>• Target advertising</li>
            <li>• Any purpose other than providing this service to you</li>
          </ul>
        </section>

        {/* Data Storage */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Storage & Security</h2>
          <p className="text-gray-400 mb-4">
            Your processed video content is stored on <strong>Cloudflare R2</strong>, a secure
            object storage service. Data is:
          </p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• Encrypted at rest and in transit</li>
            <li>• Stored in Cloudflare's global network</li>
            <li>• Accessible only to you (authenticated via your GitHub account)</li>
            <li>• Not shared with other users or third parties</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p className="text-gray-400 mb-4">
            We retain your uploaded content for <strong>90 days</strong> from the upload date.
            After 90 days, your data is automatically and permanently deleted from our servers.
          </p>
          <p className="text-gray-400">
            You can delete your data at any time before the 90-day period using:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mt-4">
            <span className="text-green-400">video-to-claude delete</span>
            <span className="text-gray-500"> &lt;video-id&gt;</span>
          </div>
          <p className="text-gray-400 mt-4">
            Or by asking Claude: "Delete my video [video-name]"
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-400 mb-4">You have the right to:</p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• <strong className="text-white">Access</strong> — View all data we have about you</li>
            <li>• <strong className="text-white">Delete</strong> — Remove any or all of your uploaded content</li>
            <li>• <strong className="text-white">Export</strong> — Download your data (you already have local copies from processing)</li>
            <li>• <strong className="text-white">Withdraw consent</strong> — Stop using the service at any time</li>
          </ul>
          <p className="text-gray-400 mt-4">
            To exercise these rights, use the CLI delete command, the MCP delete tool,
            or contact us at{' '}
            <a href="mailto:privacy@ai-media-tools.dev" className="text-purple-400 hover:underline">
              privacy@ai-media-tools.dev
            </a>
          </p>
        </section>

        {/* Data Ownership */}
        <section className="p-6 bg-gray-900 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Data Ownership</h2>
          <p className="text-gray-300">
            <strong>You own your content.</strong> By uploading processed video content to our service,
            you grant us only the limited right to store and serve that content back to you.
            We claim no ownership or intellectual property rights over your content.
          </p>
          <p className="text-gray-400 mt-4">
            We are a processing and hosting service only. Your videos, frames, and audio remain yours.
          </p>
        </section>

        {/* Third Parties */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-gray-400 mb-4">We use the following third-party services:</p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>
              • <strong className="text-white">Cloudflare</strong> — Hosting, R2 storage, Workers
              (<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Privacy Policy</a>)
            </li>
            <li>
              • <strong className="text-white">GitHub</strong> — OAuth authentication
              (<a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Privacy Policy</a>)
            </li>
          </ul>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-gray-400">
            We may update this privacy policy from time to time. We will notify users of any
            material changes by updating the "Last updated" date at the top of this page.
            Continued use of the service after changes constitutes acceptance of the new policy.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400">
            If you have questions about this privacy policy or your data, contact us at:{' '}
            <a href="mailto:privacy@ai-media-tools.dev" className="text-purple-400 hover:underline">
              privacy@ai-media-tools.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
