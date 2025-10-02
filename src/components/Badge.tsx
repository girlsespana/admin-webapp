import clsx from 'clsx'

type BadgeColor = 'yellow' | 'gray' | 'red' | 'blue' | 'green'
type BadgeSize = 'xs' | 'sm' | 'base' | 'lg'

interface Props {
  text: string
  className?: string
  color?: BadgeColor
  size?: BadgeSize
}

const colors: Record<BadgeColor, string> = {
  yellow: 'bg-yellow-100 text-yellow-800',
  gray: 'bg-gray-100 text-gray-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
}

const sizes: Record<BadgeSize, string> = {
  xs: 'text-xs px-1 py-0.5',
  sm: 'text-sm px-1.5 py-1',
  base: 'text-base px-1.5 py-1',
  lg: 'text-lg px-2 py-1.5',
}

const Badge = ({ className, color = 'blue', size = 'base', text }: Props) => {
  return (
      <span
          className={clsx([
            'inline rounded-lg font-bold',
            colors[color],
            sizes[size],
            className,
          ])}
      >
        {text}
      </span>
  )
}

export default Badge