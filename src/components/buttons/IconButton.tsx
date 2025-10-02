import type { ButtonHTMLAttributes } from 'react'
import type { IconType } from 'react-icons'
import clsx from 'clsx'
import { Button as HUButton } from '@headlessui/react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType
  outlined?: boolean
}

const IconButton = ({ children, outlined, icon: Icon, className, ...rest }: Props) => {
  return (
      <HUButton
          className={clsx([
            'w-10 h-10 shrink-0 text-xl rounded-lg shadow-indigo-20 duration-300 grid place-items-center',
            outlined ? 'text-gray-500 bg-white border border-gray-200' : 'text-white bg-gradient-to-b from-violet-500 to-indigo-500',
            'hover:cursor-pointer hover:shadow-md active:shadow-sm',
            'disabled:opacity-50 disabled:pointer-events-none',
            className,
          ])}
          {...rest}
      >
        <Icon/>
      </HUButton>
  )
}

export default IconButton