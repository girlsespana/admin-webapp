import { FaCheck } from 'react-icons/fa'
import { Checkbox as HUCheckbox } from '@headlessui/react'

interface Props {
  enabled: boolean
  onChange?: (checked: boolean) => void
}

const ToggleSwitch = ({ enabled, onChange }: Props) => {
  return (
      <HUCheckbox
          checked={enabled}
          onChange={(checked) => onChange?.(checked)}
          className="group border border-gray-200 size-5 bg-white rounded-md data-checked:bg-indigo-600 grid place-items-center"
      >
        <FaCheck className="hidden size-3 fill-white group-data-checked:block"/>
      </HUCheckbox>
  )
}

export default ToggleSwitch