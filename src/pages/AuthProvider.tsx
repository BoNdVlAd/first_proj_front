import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => void
    isLoading: boolean
    userRole: string | null
    user: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [user, setUser] = useState<any | null>(null)
    console.log('AUTH PROVIDER')

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (token) {
            setIsAuthenticated(true)
            fetchUserRole(token)
            fetchUser(token)
        }
        setIsLoading(false)
    }, [])

    const login = (token: string) => {
        localStorage.setItem('access_token', token)
        setIsAuthenticated(true)
        fetchUser(token)
        fetchUserRole(token)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        setIsAuthenticated(false)
        setUser(null)
        setUserRole(null)
    }

    const fetchUserRole = async (token: string) => {
        try {
            const response = await fetch(
                'http://first_proj.test/api/auth/check_role',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.ok) {
                const data = await response.json()
                setUserRole(data)
            } else {
                console.error('Failed to fetch user role')
            }
        } catch (error) {
            console.error('Error fetching user role', error)
        }
    }

    const fetchUser = async (token: string) => {
        try {
            const response = await fetch('http://first_proj.test/api/auth/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setUser(data)
            } else {
                console.error('Failed to fetch user')
            }
        } catch (error) {
            console.error('Error fetching user', error)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                login,
                logout,
                userRole,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
