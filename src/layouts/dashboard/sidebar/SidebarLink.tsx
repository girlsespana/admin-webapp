import type { FC } from 'react'
import type { IconType } from 'react-icons'
import { useState } from 'react'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import { Text } from '@components'

export interface SidebarItem {
  name: string
  icon: IconType
  href: string
  children?: Omit<SidebarItem, 'children'>[]
}

interface Props {
  item: SidebarItem
}

interface ItemButtonProps {
  active: boolean
  icon: IconType
  addonIcon?: IconType
  name: string
  onClick: () => void
}

const ItemButton = ({ active, icon: Icon, addonIcon: AddonIcon, name, onClick }: ItemButtonProps) => (
    <button
        onClick={() => onClick()}
        className={clsx([
          'px-2 py-1.5 flex items-center gap-4 rounded-lg justify-between duration-300 hover:cursor-pointer',
          active ? 'bg-gradient-to-br from-violet-100 to-primary-100' : 'bg-white hover:bg-gray-100',
        ])}
    >
      <div className="flex-1 flex justify-start gap-2">
        <Icon
            className={clsx(['text-xl', active ? '!text-primary-600' : '!text-gray-400'])}
        />
        <Text
            size="sm"
            weight="semibold"
            className={clsx([active ? '!text-primary-600' : '!text-gray-600'])}
        >
          {name}
        </Text>
      </div>
      {AddonIcon && <AddonIcon className="block text-gray-600"/>}
    </button>
)

const SidebarLink: FC<Props> = ({ item }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const hasSubItems = (item?.children?.length ?? 0) > 0

  return (
      <>
        <ItemButton
            name={item.name}
            icon={item.icon}
            active={!hasSubItems && location.pathname === item.href}
            addonIcon={hasSubItems ? show ? IoChevronUpOutline : IoChevronDownOutline : undefined}
            onClick={() => {
              setShow(!show)
              !hasSubItems && navigate(item.href)
            }}
        />

        {
            hasSubItems &&
            <div
                className={clsx([
                  'pl-4 w-full border-l-2 border-gray-200 grid transition-all duration-300',
                  show ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                ])}
            >
                <div className="w-full overflow-hidden flex flex-col gap-2">
                  {
                    item.children?.map((child_item) => (
                        <ItemButton
                            key={child_item.href}
                            name={child_item.name}
                            icon={child_item.icon}
                            active={location.pathname === child_item.href}
                            onClick={() => {
                              navigate(child_item.href)
                            }}
                        />
                    ))
                  }
                </div>
            </div>
        }
      </>
  )
}

export default SidebarLink