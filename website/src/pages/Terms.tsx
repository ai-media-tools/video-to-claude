import { Link } from 'react-router-dom'

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-frame)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)]" />
          Legal
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-bright)] mb-3">
          Terms of Service
        </h1>
        <p className="text-[var(--color-muted)] font-mono text-sm">
          Last updated: January 29, 2025
        </p>
      </div>

      {/* TL;DR */}
      <section className="p-6 rounded-xl bg-[var(--color-amber)]/5 border border-[var(--color-amber)]/20 mb-12">
        <h2 className="text-lg font-semibold text-[var(--color-amber)] mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          TL;DR
        </h2>
        <ul className="space-y-2 text-[var(--color-text)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-amber)] mt-1">→</span>
            This is a free, open-source tool for converting videos for Claude.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-amber)] mt-1">→</span>
            Don't upload illegal content or use the service to harm others.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-amber)] mt-1">→</span>
            We provide the service "as is" — no warranties.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-amber)] mt-1">→</span>
            You're responsible for the content you upload.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-amber)] mt-1">→</span>
            We can terminate access for abuse.
          </li>
        </ul>
      </section>

      {/* Content */}
      <div className="space-y-12">
        <Section number="1" title="Acceptance of Terms">
          <p className="text-[var(--color-text)]">
            By using video-to-claude ("the Service"), you agree to these Terms of Service.
            If you don't agree, please don't use the Service. The Service includes the CLI tool,
            local MCP server, and remote cloud hosting features.
          </p>
        </Section>

        <Section number="2" title="Service Description">
          <p className="text-[var(--color-text)] mb-4">
            video-to-claude is an open-source tool that converts video files into a format
            that Claude (an AI assistant) can understand. The Service includes:
          </p>
          <ul className="space-y-2 text-[var(--color-text)]">
            <BulletPoint>A command-line tool for processing videos locally</BulletPoint>
            <BulletPoint>A local MCP server for Claude Code integration</BulletPoint>
            <BulletPoint>Cloud storage for sharing processed videos with Claude</BulletPoint>
            <BulletPoint>A remote MCP server accessible from claude.ai</BulletPoint>
          </ul>
        </Section>

        <Section number="3" title="User Responsibilities">
          <p className="text-[var(--color-text)] mb-4">You agree to:</p>
          <ul className="space-y-2 text-[var(--color-text)]">
            <BulletPoint>Only upload content you have the right to use</BulletPoint>
            <BulletPoint>Not upload illegal, harmful, or infringing content</BulletPoint>
            <BulletPoint>Not attempt to access other users' content</BulletPoint>
            <BulletPoint>Not abuse, overload, or interfere with the Service</BulletPoint>
            <BulletPoint>Not use the Service for any unlawful purpose</BulletPoint>
          </ul>
        </Section>

        <Section number="4" title="Prohibited Content">
          <p className="text-[var(--color-text)] mb-4">You may not upload content that:</p>
          <ul className="space-y-2 text-[var(--color-text)] mb-6">
            <BulletPoint negative>Is illegal in your jurisdiction or ours</BulletPoint>
            <BulletPoint negative>Infringes on intellectual property rights</BulletPoint>
            <BulletPoint negative>Contains malware or malicious code</BulletPoint>
            <BulletPoint negative>Is pornographic or sexually exploitative</BulletPoint>
            <BulletPoint negative>Promotes violence, hatred, or discrimination</BulletPoint>
            <BulletPoint negative>Contains personal information of others without consent</BulletPoint>
          </ul>
          <p className="text-[var(--color-muted)]">
            We reserve the right to remove content that violates these terms and terminate
            accounts that repeatedly violate them.
          </p>
        </Section>

        <Section number="5" title="Data and Privacy">
          <p className="text-[var(--color-text)] mb-4">
            Your use of the Service is also governed by our{' '}
            <Link to="/privacy" className="text-[var(--color-cyan)] hover:underline">Privacy Policy</Link>.
            Key points:
          </p>
          <ul className="space-y-2 text-[var(--color-text)]">
            <BulletPoint>You retain ownership of your content</BulletPoint>
            <BulletPoint>Uploaded content is stored for 90 days then deleted</BulletPoint>
            <BulletPoint>You can delete your content at any time</BulletPoint>
            <BulletPoint>Your content is private and only accessible to you</BulletPoint>
          </ul>
        </Section>

        <Section number="6" title="Intellectual Property">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)]">
              <h4 className="font-medium text-[var(--color-bright)] mb-2">Your Content</h4>
              <p className="text-sm text-[var(--color-muted)]">
                You retain all rights to the videos and content you process and upload. We claim no ownership over your content.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)]">
              <h4 className="font-medium text-[var(--color-bright)] mb-2">Our Software</h4>
              <p className="text-sm text-[var(--color-muted)]">
                The video-to-claude software is open source under the MIT License. You may use, modify, and distribute it according to that license.
              </p>
            </div>
          </div>
        </Section>

        <Section number="7" title="Service Availability">
          <p className="text-[var(--color-text)]">
            We strive to keep the Service available, but we don't guarantee uptime.
            The Service is provided for free, and we may modify, suspend, or discontinue
            it at any time without notice. We're not liable for any loss resulting from
            service interruptions.
          </p>
        </Section>

        <section className="p-6 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)]">
          <div className="flex items-start gap-4">
            <div className="text-2xl font-mono text-[var(--color-muted)]">08</div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-bright)] mb-4">Disclaimer of Warranties</h2>
              <p className="text-[var(--color-muted)] text-sm uppercase tracking-wide mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-[var(--color-muted)] text-sm">
                We do not warrant that the Service will be uninterrupted, error-free, or secure.
                You use the Service at your own risk.
              </p>
            </div>
          </div>
        </section>

        <Section number="9" title="Limitation of Liability">
          <p className="text-[var(--color-muted)] text-sm uppercase tracking-wide">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS
            OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
            GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
        </Section>

        <Section number="10" title="Termination">
          <p className="text-[var(--color-text)] mb-4">
            We may terminate or suspend your access to the Service at any time, with or without
            cause, with or without notice. Reasons for termination may include:
          </p>
          <ul className="space-y-2 text-[var(--color-text)] mb-6">
            <BulletPoint negative>Violation of these Terms</BulletPoint>
            <BulletPoint negative>Uploading prohibited content</BulletPoint>
            <BulletPoint negative>Abusive behavior or service disruption</BulletPoint>
            <BulletPoint negative>Request by law enforcement</BulletPoint>
          </ul>
          <p className="text-[var(--color-muted)]">
            You may stop using the Service at any time. Upon termination, your right to use
            the Service ceases immediately.
          </p>
        </Section>

        <Section number="11" title="Changes to Terms">
          <p className="text-[var(--color-text)]">
            We may modify these Terms at any time. We will notify users of material changes
            by updating the "Last updated" date. Continued use of the Service after changes
            constitutes acceptance of the new Terms.
          </p>
        </Section>

        <Section number="12" title="Governing Law">
          <p className="text-[var(--color-text)]">
            These Terms shall be governed by and construed in accordance with the laws of
            the United States, without regard to its conflict of law provisions.
          </p>
        </Section>

        <Section number="13" title="Contact">
          <p className="text-[var(--color-text)]">
            For questions about these Terms, contact us at:{' '}
            <a href="mailto:legal@ai-media-tools.dev" className="text-[var(--color-cyan)] hover:underline">
              legal@ai-media-tools.dev
            </a>
          </p>
        </Section>
      </div>
    </div>
  )
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-start gap-4">
        <div className="text-2xl font-mono text-[var(--color-muted)]">{number}</div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[var(--color-bright)] mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </section>
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
