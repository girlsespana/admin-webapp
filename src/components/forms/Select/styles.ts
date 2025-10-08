import { GroupBase, StylesConfig } from 'react-select'

export const controlStyles = {
  borderRadius: 'rounded-lg',
  borderRadiusRight: 'rounded-r-lg',
  base: 'w-full bg-white font-semibold focus:ring-primary-500 block rounded-lg border border-neutral-500/50 text-sm',
  focus: 'ring-1 ring-primary-500',
  nonFocus: 'border-gray-300 hover:border-gray-400',
}
export const placeholderStyles = 'text-neutral-400 p-0'
export const selectInputStyles = 'p-0'
export const valueContainerStyles = 'p-2'
export const singleValueStyles = ''
export const multiValueStyles = 'bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5'
export const multiValueLabelStyles = 'leading-6 py-0.5'
export const multiValueRemoveStyles = 'border border-gray-200 bg-white hover:bg-gray-100 hover:text-black text-gray-500 hover:border-red-300 rounded-md'
export const indicatorsContainerStyles = 'p-1 gap-1'
export const clearIndicatorStyles = 'cursor-pointer text-gray-500 p-1 rounded-md hover:bg-gray-100 hover:text-black'
export const indicatorSeparatorStyles = 'bg-neutral-700'
export const dropdownIndicatorStyles = 'p-1 cursor-pointer hover:bg-gray-100 text-black rounded-md hover:text-primary-500'
export const menuStyles = 'p-1.5 mt-2 bg-white rounded-lg'
export const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm'
export const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded-lg',
  focus: 'bg-primary-500 active:bg-neutral-600',
  selected: 'bg-primary-300',
}
export const noOptionsMessageStyles = 'text-neutral-400 p-2 bg-neutral-800 border border-dashed border-neutral-400 rounded-lg'
export const loadingMessageStyles = 'text-neutral-400 p-2 bg-neutral-700 rounded-lg'

export const defaultSelectStyles = <
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option> = GroupBase<Option>
>(): StylesConfig<Option, IsMulti, Group> => ({
  input: (base) => ({
    ...base,
    'input:focus': {
      boxShadow: 'none',
    },
  }),
  // On mobile, the label will truncate automatically, so we want to
  // override that behaviour.
  multiValueLabel: (base) => ({
    ...base,
    whiteSpace: 'normal',
    overflow: 'visible',
  }),
  control: (base) => ({
    ...base,
    transition: 'none',
  }),
})