import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

const API_URL = 'https://api.ai-media-tools.dev'

interface User {
  login: string
  avatar_url?: string
  name?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('vtc_token')
  })
  const [isLoading, setIsLoading] = useState(true)

  // Check for token in URL (OAuth callback)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get('token')

    if (urlToken) {
      localStorage.setItem('vtc_token', urlToken)
      setToken(urlToken)
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Fetch user info when token changes
  useEffect(() => {
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }

    async function fetchUser() {
      try {
        const response = await fetch(`${API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          // Invalid token
          localStorage.removeItem('vtc_token')
          setToken(null)
          setUser(null)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [token])

  const login = () => {
    // Store current URL to return to after auth
    const returnUrl = `${window.location.origin}/dashboard`
    // Redirect to OAuth - the callback will include the token
    window.location.href = `${API_URL}/authorize?redirect_uri=${encodeURIComponent(returnUrl)}`
  }

  const logout = () => {
    localStorage.removeItem('vtc_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
