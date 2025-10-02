// @ts-nocheck
import type { InputHTMLAttributes } from 'react'
import type { IconType } from 'react-icons'
import clsx from 'clsx'
import { Input as HUInput } from '@headlessui/react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType
}

const Input = ({ className, icon: Icon, ...rest }: Props) => {
  return (
      <div className={clsx(['relative', className])}>
        <HUInput
            {...rest}
            className={clsx([
              'w-full py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-400',
              'placeholder:text-gray-400',
              Icon ? 'pl-8' : 'pl-2',
            ])}
        />
        {Icon && <Icon className="text-primary-400 absolute top-1/2 -translate-y-1/2 left-2.5"/>}
      </div>
  )
}

export default Input