export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-frame)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)]" />
          Legal
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-bright)] mb-3">
          Privacy Policy
        </h1>
        <p className="text-[var(--color-muted)] font-mono text-sm">
          Last updated: January 29, 2025
        </p>
      </div>

      {/* TL;DR */}
      <section className="info-banner p-6 mb-12">
        <h2 className="text-lg font-semibold text-[var(--color-cyan)] mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          TL;DR
        </h2>
        <ul className="space-y-2 text-[var(--color-text)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-cyan)] mt-1">→</span>
            You own your data. We don't.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-cyan)] mt-1">→</span>
            We store processed video files (frames, audio analysis) on Cloudflare R2.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-cyan)] mt-1">→</span>
            Data is automatically deleted after 90 days, or you can delete it anytime.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-cyan)] mt-1">→</span>
            We only collect your GitHub username for authentication.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-cyan)] mt-1">→</span>
            We don't sell your data or use it to train AI models.
          </li>
        </ul>
      </section>

      {/* Content */}
      <div className="space-y-12">
        <Section title="What We Collect">
          <p className="text-[var(--color-text)] mb-6">
            When you use video-to-claude's cloud features, we collect:
          </p>
          <div className="space-y-4">
            <DataCard
              title="Authentication Data"
              description="Your GitHub username and a unique identifier. We use GitHub OAuth for authentication and do not store your GitHub password or access your repositories."
            />
            <DataCard
              title="Processed Video Content"
              description="When you upload processed videos, we store: extracted frames (JPG images), audio spectrograms and waveforms (PNG images), audio analysis data (JSON), and a manifest file describing the content. We do not store the original video file."
            />
            <DataCard
              title="Usage Logs"
              description="Basic server logs including IP addresses, timestamps, and API endpoints accessed. These are used for debugging and security purposes and are retained for 30 days."
            />
          </div>
        </Section>

        <Section title="How We Use Your Data">
          <p className="text-[var(--color-text)] mb-4">Your data is used exclusively to:</p>
          <ul className="space-y-2 text-[var(--color-text)] mb-6">
            <BulletPoint>Provide the video-to-claude service (storing and serving your processed videos)</BulletPoint>
            <BulletPoint>Authenticate you and ensure you can only access your own content</BulletPoint>
            <BulletPoint>Debug issues and maintain service reliability</BulletPoint>
          </ul>
          <p className="text-[var(--color-bright)] font-medium mb-4">We do NOT use your data to:</p>
          <ul className="space-y-2 text-[var(--color-text)]">
            <BulletPoint negative>Train AI or machine learning models</BulletPoint>
            <BulletPoint negative>Sell to third parties</BulletPoint>
            <BulletPoint negative>Target advertising</BulletPoint>
            <BulletPoint negative>Any purpose other than providing this service to you</BulletPoint>
          </ul>
        </Section>

        <Section title="Data Storage & Security">
          <p className="text-[var(--color-text)] mb-4">
            Your processed video content is stored on <span className="text-[var(--color-bright)] font-medium">Cloudflare R2</span>, a secure object storage service. Data is:
          </p>
          <ul className="space-y-2 text-[var(--color-text)]">
            <BulletPoint>Encrypted at rest and in transit</BulletPoint>
            <BulletPoint>Stored in Cloudflare's global network</BulletPoint>
            <BulletPoint>Accessible only to you (authenticated via your GitHub account)</BulletPoint>
            <BulletPoint>Not shared with other users or third parties</BulletPoint>
          </ul>
        </Section>

        <Section title="Data Retention">
          <p className="text-[var(--color-text)] mb-4">
            We retain your uploaded content for <span className="text-[var(--color-cyan)] font-medium">90 days</span> from the upload date.
            After 90 days, your data is automatically and permanently deleted from our servers.
          </p>
          <p className="text-[var(--color-text)] mb-4">
            You can delete your data at any time before the 90-day period using:
          </p>
          <div className="terminal">
            <div className="terminal-dots">
              <div className="terminal-dot bg-[#ff5f57]" />
              <div className="terminal-dot bg-[#febc2e]" />
              <div className="terminal-dot bg-[#28c840]" />
            </div>
            <div className="pt-12 pb-4 px-6 font-mono text-sm">
              <span className="text-[var(--color-cyan)]">$</span>
              <span className="text-[var(--color-bright)]"> video-to-claude delete</span>
              <span className="text-[var(--color-muted)]"> &lt;video-id&gt;</span>
            </div>
          </div>
          <p className="text-[var(--color-muted)] text-sm mt-4">
            Or use the Dashboard to delete videos with one click.
          </p>
        </Section>

        <Section title="Your Rights">
          <p className="text-[var(--color-text)] mb-4">You have the right to:</p>
          <ul className="space-y-3 text-[var(--color-text)]">
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-cyan)] font-medium w-24 shrink-0">Access</span>
              <span className="text-[var(--color-muted)]">View all data we have about you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-cyan)] font-medium w-24 shrink-0">Delete</span>
              <span className="text-[var(--color-muted)]">Remove any or all of your uploaded content</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-cyan)] font-medium w-24 shrink-0">Export</span>
              <span className="text-[var(--color-muted)]">Download your data (you already have local copies from processing)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-cyan)] font-medium w-24 shrink-0">Withdraw</span>
              <span className="text-[var(--color-muted)]">Stop using the service at any time</span>
            </li>
          </ul>
          <p className="text-[var(--color-text)] mt-6">
            To exercise these rights, use the CLI delete command, the Dashboard, or contact us at{' '}
            <a href="mailto:privacy@ai-media-tools.dev" className="text-[var(--color-cyan)] hover:underline">
              privacy@ai-media-tools.dev
            </a>
          </p>
        </Section>

        <section className="flow-border p-6">
          <h2 className="text-xl font-semibold text-[var(--color-bright)] mb-4">Data Ownership</h2>
          <p className="text-[var(--color-text)] mb-4">
            <span className="text-[var(--color-cyan)] font-medium">You own your content.</span> By uploading processed video content to our service,
            you grant us only the limited right to store and serve that content back to you.
            We claim no ownership or intellectual property rights over your content.
          </p>
          <p className="text-[var(--color-muted)]">
            We are a processing and hosting service only. Your videos, frames, and audio remain yours.
          </p>
        </section>

        <Section title="Third-Party Services">
          <p className="text-[var(--color-text)] mb-4">We use the following third-party services:</p>
          <ul className="space-y-3 text-[var(--color-text)]">
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-bright)] font-medium w-24 shrink-0">Cloudflare</span>
              <span className="text-[var(--color-muted)]">
                Hosting, R2 storage, Workers (
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-cyan)] hover:underline">
                  Privacy Policy
                </a>
                )
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--color-bright)] font-medium w-24 shrink-0">GitHub</span>
              <span className="text-[var(--color-muted)]">
                OAuth authentication (
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-[var(--color-cyan)] hover:underline">
                  Privacy Policy
                </a>
                )
              </span>
            </li>
          </ul>
        </Section>

        <Section title="Changes to This Policy">
          <p className="text-[var(--color-text)]">
            We may update this privacy policy from time to time. We will notify users of any
            material changes by updating the "Last updated" date at the top of this page.
            Continued use of the service after changes constitutes acceptance of the new policy.
          </p>
        </Section>

        <Section title="Contact Us">
          <p className="text-[var(--color-text)]">
            If you have questions about this privacy policy or your data, contact us at:{' '}
            <a href="mailto:privacy@ai-media-tools.dev" className="text-[var(--color-cyan)] hover:underline">
              privacy@ai-media-tools.dev
            </a>
          </p>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[var(--color-bright)] mb-4">{title}</h2>
      {children}
    </section>
  )
}

function DataCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)]">
      <h3 className="font-medium text-[var(--color-bright)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-muted)]">{description}</p>
    </div>
  )
}

function BulletPoint({ children, negative = false }: { children: React.ReactNode; negative?: boolean }) {
  return (
    <li className="flex items-start gap-2">
      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${negative ? 'bg-red-400' : 'bg-[var(--color-cyan)]'}`} />
      {children}
    </li>
  )
}
