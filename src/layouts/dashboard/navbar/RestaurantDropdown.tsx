import { BiStore } from 'react-icons/bi'
import { Text } from '@components'
import { useMe } from '@auth/hooks'

const RestaurantDropdown = () => {
  const me = useMe()

  return (
      <div className="flex items-center gap-2">
        <Text weight="medium">{me?.name}</Text>
      </div>
  )
}

export default RestaurantDropdown