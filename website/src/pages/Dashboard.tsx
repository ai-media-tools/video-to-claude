import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

const API_URL = 'https://api.ai-media-tools.dev'

interface Video {
  video_id: string
  name: string
  files: string[]
  manifest: string
  uploaded_at: string
  owner?: string
}

export function Dashboard() {
  const { user, token, isLoading: authLoading, login, logout } = useAuth()
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchVideos = useCallback(async () => {
    if (!token) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/videos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch videos')
      }

      const data = await response.json()
      setVideos(data.videos || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load videos')
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (user && token) {
      fetchVideos()
    }
  }, [user, token, fetchVideos])

  const handleDelete = async (videoId: string, videoName: string) => {
    if (!confirm(`Delete "${videoName}"? This cannot be undone.`)) {
      return
    }

    setDeletingId(videoId)

    try {
      const response = await fetch(`${API_URL}/api/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete video')
      }

      setVideos(videos.filter((v) => v.video_id !== videoId))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete video')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getDaysUntilExpiration = (uploadedAt: string) => {
    const date = new Date(uploadedAt)
    date.setDate(date.getDate() + 90)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--color-muted)]">
          <div className="w-5 h-5 border-2 border-[var(--color-cyan)] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono">Initializing...</span>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-[var(--color-frame)] border border-[var(--color-border)] flex items-center justify-center">
            <svg className="w-10 h-10 text-[var(--color-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-[var(--color-bright)] mb-4">
            Video Dashboard
          </h1>
          <p className="text-[var(--color-text)] mb-8">
            Sign in with GitHub to view and manage your uploaded videos.
            Your videos are private and only visible to you.
          </p>

          <button
            onClick={login}
            className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-frame)] border border-[var(--color-border)] rounded-xl font-medium text-[var(--color-bright)] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Sign in with GitHub
          </button>
        </div>
      </div>
    )
  }

  // Logged in
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-bright)] mb-2">
            Your Videos
          </h1>
          <p className="text-[var(--color-muted)]">
            Manage your uploaded video content
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[var(--color-frame)] border border-[var(--color-border)]">
            {user.avatar_url && (
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-8 h-8 rounded-full ring-2 ring-[var(--color-cyan)]/20"
              />
            )}
            <div className="text-sm">
              <div className="font-medium text-[var(--color-bright)]">{user.name || user.login}</div>
              <div className="text-[var(--color-muted)] font-mono text-xs">@{user.login}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-bright)] transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="info-banner p-4 mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse" />
            <p className="text-sm text-[var(--color-text)]">
              Videos auto-delete after <span className="text-[var(--color-cyan)] font-medium">90 days</span>.
              Your content is private and encrypted.
            </p>
          </div>
          <a
            href="/docs"
            className="text-sm text-[var(--color-cyan)] hover:underline shrink-0"
          >
            Docs
          </a>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-8">
          <div className="flex items-center justify-between">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchVideos}
              className="text-sm text-red-300 hover:text-red-200"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-[var(--color-muted)]">
            <div className="w-5 h-5 border-2 border-[var(--color-cyan)] border-t-transparent rounded-full animate-spin" />
            <span className="font-mono">Loading videos...</span>
          </div>
        </div>
      ) : videos.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="space-y-4">
            {videos.map((video) => {
              const daysLeft = getDaysUntilExpiration(video.uploaded_at)
              const isExpiringSoon = daysLeft <= 14
              const progress = Math.max(0, Math.min(100, (daysLeft / 90) * 100))

              return (
                <div
                  key={video.video_id}
                  className="video-card p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/20 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[var(--color-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-[var(--color-bright)] truncate">
                            {video.name}
                          </h3>
                          <p className="text-xs font-mono text-[var(--color-muted)] truncate">
                            {video.video_id}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                        <span className="text-[var(--color-muted)]">
                          Uploaded {formatDate(video.uploaded_at)}
                        </span>
                        <span className="text-[var(--color-muted)]">
                          {video.files.length} files
                        </span>
                        <span className={isExpiringSoon ? 'text-[var(--color-amber)]' : 'text-[var(--color-muted)]'}>
                          {isExpiringSoon ? (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              Expires in {daysLeft} days
                            </span>
                          ) : (
                            `${daysLeft} days remaining`
                          )}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(video.video_id, video.name)}
                      disabled={deletingId === video.video_id}
                      className="shrink-0 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === video.video_id ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                          Deleting
                        </span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Refresh */}
          <div className="text-center mt-8">
            <button
              onClick={fetchVideos}
              disabled={isLoading}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-cyan)] transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh list
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-frame)] border border-[var(--color-border)] flex items-center justify-center">
        <svg className="w-10 h-10 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-bright)] mb-2">
        No videos yet
      </h3>
      <p className="text-[var(--color-muted)] mb-8 max-w-sm mx-auto">
        Upload your first video using the CLI or Claude Code to see it here.
      </p>

      <div className="terminal max-w-lg mx-auto text-left">
        <div className="terminal-dots">
          <div className="terminal-dot bg-[#ff5f57]" />
          <div className="terminal-dot bg-[#febc2e]" />
          <div className="terminal-dot bg-[#28c840]" />
        </div>
        <div className="pt-12 pb-6 px-6 text-sm">
          <div className="text-[var(--color-muted)] mb-2"># Convert a video</div>
          <div className="mb-4">
            <span className="text-[var(--color-cyan)]">$</span>
            <span className="text-[var(--color-bright)]"> video-to-claude convert ~/video.mp4</span>
          </div>
          <div className="text-[var(--color-muted)] mb-2"># Upload to cloud</div>
          <div>
            <span className="text-[var(--color-cyan)]">$</span>
            <span className="text-[var(--color-bright)]"> video-to-claude upload ./video_for_claude/ --name "My Video"</span>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Need help?{' '}
        <a
          href="/docs/Getting-Started"
          className="text-[var(--color-cyan)] hover:underline"
        >
          Read the documentation
        </a>
      </p>
    </div>
  )
}
