import { useEffect, type FC, type PropsWithChildren } from 'react'
import type { UserNode } from '@types'
import { useQuery } from '@apollo/client'
import { useAuth } from '@auth/hooks'
import MeContext from '@auth/contexts/MeContext'
import LoadingPage from '@/components/misc/LoadingPage'
import MeQuery from "@auth/queries/Me";

const MeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth()

  const { data, error, loading } = useQuery(MeQuery, {
    fetchPolicy: 'network-only',
    skip: !isAuthenticated,
  })

  const invalid = isAuthenticated && !loading && (!!error || !data?.me)
  useEffect(() => { if (invalid) logout() }, [invalid, logout])

  if (!isAuthenticated) {
    return (
        <MeContext.Provider value={null}>
          {children}
        </MeContext.Provider>
    )
  }

  if (loading || invalid)
    return <LoadingPage/>

  const canRenderChildren = !loading && data?.me

  return (
      <MeContext.Provider value={data?.me as UserNode}>
        {canRenderChildren && children}
      </MeContext.Provider>
  )
}

export default MeProvider