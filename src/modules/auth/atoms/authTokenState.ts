import { atom } from 'recoil'
import { parseStoredAuthToken, persistAuthToken, readStoredAuthValue } from '@auth/session'

const authTokenState = atom<string | undefined>({
  key: 'authTokenState',
  default: undefined,
  effects: [({ setSelf, onSet }) => {
    const saved = parseStoredAuthToken(readStoredAuthValue())
    if (saved) setSelf(saved)
    else persistAuthToken()
    onSet((value, _, isReset) => persistAuthToken(isReset ? undefined : value))
  }],
})

export default authTokenState