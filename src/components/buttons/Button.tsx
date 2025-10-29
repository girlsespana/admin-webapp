import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Button as HUButton } from '@headlessui/react'
import { Loader } from '@/components'

export type ButtonColor = 'primary' | 'light' | 'error'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  color?: ButtonColor
}

const colors: Record<ButtonColor, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-500',
  light: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-100 border border-gray-200',
  error: 'bg-red-600 text-white hover:bg-red-600 active:bg-red-500',
}

const Button = ({ children, color = 'primary', isLoading, className, ...rest }: Props) => {
  return (
      <HUButton
          disabled={isLoading}
          className={clsx([
            'flex justify-center items-center gap-2',
            'px-2 py-1.5 text-sm font-medium rounded-lg duration-300',
            'hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
            colors[color],
            className,
          ])}
          {...rest}
      >
        {isLoading && <Loader/>}
        {children}
      </HUButton>
  )
}

export default Button