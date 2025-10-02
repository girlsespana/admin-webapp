import {IoFastFood} from 'react-icons/io5'
import {TiHome, TiThList} from 'react-icons/ti'
import {TbLogout} from 'react-icons/tb'
import {useAuth} from '@auth/hooks'
import {IconButton, Text} from '@components'
import SidebarLink, {type SidebarItem} from '@dash-lay/sidebar/SidebarLink'
import {ImWoman} from "react-icons/im";

const links: SidebarItem[] = [
  {
    name: 'Inicio',
    icon: TiHome,
    href: '/',
  },
  {
    name: 'Modelos',
    icon: ImWoman,
    href: '/models',
  },
  {
    name: 'Banners',
    icon: IoFastFood,
    href: '/banners',
  }
]

const MainSidebar = () => {
  const { logout } = useAuth()
  return (
      <div className="w-full h-screen bg-white max-w-[250px] border-r border-gray-100 flex flex-col">
        <div className="w-full h-[60px] flex items-center justify-center">
          <img src="/public/logos/logo.svg" alt="logo" width='120'/>
        </div>
        <div className="w-full flex-grow flex flex-col gap-2 p-4">
          {
            links.map((link) => (
                <SidebarLink key={link.href} item={link}/>
            ))
          }
        </div>
        <div className="p-4  " >
          <div className="flex items-center gap-2 cursor-pointer " onClick={() => logout()}>
            <IconButton outlined icon={TbLogout}/>
            <Text color="gray" weight="medium">Cerrar sesión</Text></div>
        </div>
      </div>
  )
}

export default MainSidebar