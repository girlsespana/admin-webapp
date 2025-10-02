import type { ReactNode } from 'react'
import Sidebar from '@dash-lay/sidebar'

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
      <div className="w-full h-screen bg-gray-100 flex">
        <Sidebar/>
        <div className="flex-grow flex flex-col">
          <div className="flex-grow max-w-full max-h-full overflow-auto flex flex-col py-6 px-4 bg-white">
            {children}
          </div>
        </div>
      </div>
  )
}

export default DashboardLayout