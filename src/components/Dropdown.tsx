import { FaPencil } from 'react-icons/fa6'
import { FaChevronDown, FaLock, FaMoon } from 'react-icons/fa'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Dropdown = () => {
  return (
      <Menu>
        <MenuButton
            className="inline-flex items-center gap-2 rounded-md bg-indigo-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-indigo-700 data-open:bg-gray-700">
          Options
          <FaChevronDown className="size-4 fill-white/60"/>
        </MenuButton>

        <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <FaPencil className="size-4 fill-white/30"/>
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘E</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <FaLock className="size-4 fill-white/30"/>
              Duplicate
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘D</kbd>
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5"/>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <FaMoon className="size-4 fill-white/30"/>
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘A</kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
  )
}

export default Dropdown