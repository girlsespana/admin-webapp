import { AUTH_TOKEN_KEY } from './constants'
import { isTokenCurrent } from './tokenExpiry'

export function parseStoredAuthToken(raw: string | null): string | undefined {
  try {
    const token: unknown = raw ? JSON.parse(raw) : undefined
    return isTokenCurrent(token) ? token : undefined
  } catch { return undefined }
}

export function readStoredAuthValue(): string | null {
  try { return window.localStorage.getItem(AUTH_TOKEN_KEY) } catch { return null }
}

export function persistAuthToken(token?: string) {
  try {
    if (token) window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token))
    else window.localStorage.removeItem(AUTH_TOKEN_KEY)
  } catch { /* In-memory login remains available if browser storage is disabled. */ }
}
