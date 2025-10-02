// @ts-nocheck
import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Textarea as HUTextArea } from '@headlessui/react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

const TextArea = ({ className, ...rest }: Props) => {
  return (
      <HUTextArea
          {...rest}
          className={clsx([
            'w-full px-2 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400',
            'placeholder:text-gray-400',
            className,
          ])}
      />
  )
}

export default TextArea