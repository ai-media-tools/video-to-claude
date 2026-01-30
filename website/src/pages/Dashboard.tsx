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

      // Remove from local state
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
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getExpirationDate = (uploadedAt: string) => {
    const date = new Date(uploadedAt)
    date.setDate(date.getDate() + 90)
    return date
  }

  const getDaysUntilExpiration = (uploadedAt: string) => {
    const expiration = getExpirationDate(uploadedAt)
    const now = new Date()
    const diff = expiration.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Sign in with GitHub to view and manage your uploaded videos.
            Only you can see and manage your own videos.
          </p>
          <button
            onClick={login}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors inline-flex items-center gap-3"
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
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your uploaded videos</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {user.avatar_url && (
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="text-right">
              <div className="font-medium">{user.name || user.login}</div>
              <div className="text-sm text-gray-500">@{user.login}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-800/50 mb-8">
        <p className="text-sm text-gray-300">
          Videos are automatically deleted after 90 days. You can delete them anytime.
          Your videos are private and only visible to you.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-900/20 rounded-xl border border-red-800/50 mb-8">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchVideos}
            className="text-sm text-red-300 hover:text-red-200 mt-2"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="text-center py-16">
          <div className="animate-pulse text-gray-400">Loading videos...</div>
        </div>
      ) : videos.length === 0 ? (
        /* Empty state */
        <div className="text-center py-16">
          <div className="text-gray-500 mb-4">No videos uploaded yet</div>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
            Use the CLI to convert and upload videos:
          </p>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 font-mono text-sm text-left max-w-md mx-auto">
            <div className="text-gray-500 mb-1"># Convert a video</div>
            <div className="text-green-400 mb-3">video-to-claude convert ~/video.mp4</div>
            <div className="text-gray-500 mb-1"># Upload to cloud</div>
            <div className="text-green-400">video-to-claude upload ./video_for_claude/ --name "My Video"</div>
          </div>
        </div>
      ) : (
        /* Video list */
        <div className="space-y-4">
          {videos.map((video) => {
            const daysLeft = getDaysUntilExpiration(video.uploaded_at)
            const isExpiringSoon = daysLeft <= 14

            return (
              <div
                key={video.video_id}
                className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">{video.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 font-mono">{video.video_id}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                      <span>Uploaded {formatDate(video.uploaded_at)}</span>
                      <span className={isExpiringSoon ? 'text-yellow-500' : ''}>
                        {isExpiringSoon ? (
                          <>Expires in {daysLeft} days</>
                        ) : (
                          <>{daysLeft} days remaining</>
                        )}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {video.files.length} files
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(video.video_id, video.name)}
                    disabled={deletingId === video.video_id}
                    className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deletingId === video.video_id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Refresh button */}
      {videos.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={fetchVideos}
            disabled={isLoading}
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
          >
            Refresh list
          </button>
        </div>
      )}
    </div>
  )
}
