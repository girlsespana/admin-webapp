import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
      <div className="min-h-screen flex flex-col bg-primary-100">
        {children}
      </div>
  )
}

export default AuthLayout