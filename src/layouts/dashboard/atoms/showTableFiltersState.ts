import { atom } from 'recoil'
import { localStorageEffect } from '@atoms'

const showTableFiltersState = atom<boolean>({
  key: 'showTableFiltersState',
  default: false,
  effects: [
    localStorageEffect<boolean>('showTableFilters'),
  ],
})

export default showTableFiltersState