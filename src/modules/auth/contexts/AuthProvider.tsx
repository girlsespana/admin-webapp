import { useCallback, useEffect, type ReactNode } from 'react'
import {useLazyQuery} from '@apollo/client'
import {useRecoilState, useResetRecoilState} from 'recoil'
import client, {authTokenReactiveVar} from '@/client'
import { isTokenCurrent, watchTokenExpiry } from '@auth/tokenExpiry'
import { persistAuthToken } from '@auth/session'
import AuthContext from '@auth/contexts/AuthContext'
import authTokenState from '@auth/atoms/authTokenState'
import MeQuery from "@auth/queries/Me";

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const resetAuthToken = useResetRecoilState(authTokenState)
  const [authToken, setAuthToken] = useRecoilState(authTokenState)
  const isAuthenticated = authToken !== undefined

  const [fetchMe] = useLazyQuery(MeQuery, {
    fetchPolicy: 'network-only',
  })

  const login = async (tokenAuth: string) => {
    if (!isTokenCurrent(tokenAuth)) throw new Error('La sesión ha vencido. Inicia sesión de nuevo.')
    authTokenReactiveVar(JSON.stringify(tokenAuth))
    setAuthToken(() => tokenAuth)
    await fetchMe()
  }

  const logout = useCallback(() => {
    authTokenReactiveVar(null)
    persistAuthToken()
    resetAuthToken()
    void client.clearStore().catch(() => undefined)
  }, [resetAuthToken])

  useEffect(() => {
    if (!authToken) return
    return watchTokenExpiry(authToken, logout)
  }, [authToken, logout])

  return (
      <AuthContext.Provider
          value={{
            authToken,
            isAuthenticated,
            login,
            logout,
          }}>
        {children}
      </AuthContext.Provider>
  )
}

export default AuthProvider