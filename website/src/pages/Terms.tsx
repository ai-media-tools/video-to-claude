import { Link } from 'react-router-dom'

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-12">Last updated: January 29, 2025</p>

      <div className="prose prose-invert prose-gray max-w-none space-y-8">
        {/* TL;DR */}
        <section className="p-6 bg-purple-900/20 rounded-xl border border-purple-800/50">
          <h2 className="text-xl font-semibold mb-3 text-purple-300">TL;DR</h2>
          <ul className="text-gray-300 space-y-2">
            <li>• This is a free, open-source tool for converting videos for Claude.</li>
            <li>• Don't upload illegal content or use the service to harm others.</li>
            <li>• We provide the service "as is" — no warranties.</li>
            <li>• You're responsible for the content you upload.</li>
            <li>• We can terminate access for abuse.</li>
          </ul>
        </section>

        {/* Acceptance */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-400">
            By using video-to-claude ("the Service"), you agree to these Terms of Service.
            If you don't agree, please don't use the Service. The Service includes the CLI tool,
            local MCP server, and remote cloud hosting features.
          </p>
        </section>

        {/* Service Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
          <p className="text-gray-400 mb-4">
            video-to-claude is an open-source tool that converts video files into a format
            that Claude (an AI assistant) can understand. The Service includes:
          </p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• A command-line tool for processing videos locally</li>
            <li>• A local MCP server for Claude Code integration</li>
            <li>• Cloud storage for sharing processed videos with Claude</li>
            <li>• A remote MCP server accessible from claude.ai</li>
          </ul>
        </section>

        {/* User Responsibilities */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="text-gray-400 mb-4">You agree to:</p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• Only upload content you have the right to use</li>
            <li>• Not upload illegal, harmful, or infringing content</li>
            <li>• Not attempt to access other users' content</li>
            <li>• Not abuse, overload, or interfere with the Service</li>
            <li>• Not use the Service for any unlawful purpose</li>
          </ul>
        </section>

        {/* Prohibited Content */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Prohibited Content</h2>
          <p className="text-gray-400 mb-4">You may not upload content that:</p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• Is illegal in your jurisdiction or ours</li>
            <li>• Infringes on intellectual property rights</li>
            <li>• Contains malware or malicious code</li>
            <li>• Is pornographic or sexually exploitative</li>
            <li>• Promotes violence, hatred, or discrimination</li>
            <li>• Contains personal information of others without consent</li>
          </ul>
          <p className="text-gray-400 mt-4">
            We reserve the right to remove content that violates these terms and terminate
            accounts that repeatedly violate them.
          </p>
        </section>

        {/* Data and Privacy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data and Privacy</h2>
          <p className="text-gray-400 mb-4">
            Your use of the Service is also governed by our{' '}
            <Link to="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>.
            Key points:
          </p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• You retain ownership of your content</li>
            <li>• Uploaded content is stored for 90 days then deleted</li>
            <li>• You can delete your content at any time</li>
            <li>• Your content is private and only accessible to you</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="text-gray-400 mb-4">
            <strong className="text-white">Your Content:</strong> You retain all rights to the
            videos and content you process and upload. We claim no ownership over your content.
          </p>
          <p className="text-gray-400">
            <strong className="text-white">Our Software:</strong> The video-to-claude software
            is open source under the MIT License. You may use, modify, and distribute it
            according to that license.
          </p>
        </section>

        {/* Service Availability */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Service Availability</h2>
          <p className="text-gray-400">
            We strive to keep the Service available, but we don't guarantee uptime.
            The Service is provided for free, and we may modify, suspend, or discontinue
            it at any time without notice. We're not liable for any loss resulting from
            service interruptions.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="p-6 bg-gray-900 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
          <p className="text-gray-400">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="text-gray-400 mt-4">
            We do not warrant that the Service will be uninterrupted, error-free, or secure.
            You use the Service at your own risk.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-400">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS
            OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
            GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
          <p className="text-gray-400 mb-4">
            We may terminate or suspend your access to the Service at any time, with or without
            cause, with or without notice. Reasons for termination may include:
          </p>
          <ul className="text-gray-400 space-y-2 ml-4">
            <li>• Violation of these Terms</li>
            <li>• Uploading prohibited content</li>
            <li>• Abusive behavior or service disruption</li>
            <li>• Request by law enforcement</li>
          </ul>
          <p className="text-gray-400 mt-4">
            You may stop using the Service at any time. Upon termination, your right to use
            the Service ceases immediately.
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
          <p className="text-gray-400">
            We may modify these Terms at any time. We will notify users of material changes
            by updating the "Last updated" date. Continued use of the Service after changes
            constitutes acceptance of the new Terms.
          </p>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
          <p className="text-gray-400">
            These Terms shall be governed by and construed in accordance with the laws of
            the United States, without regard to its conflict of law provisions.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
          <p className="text-gray-400">
            For questions about these Terms, contact us at:{' '}
            <a href="mailto:legal@ai-media-tools.dev" className="text-purple-400 hover:underline">
              legal@ai-media-tools.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
