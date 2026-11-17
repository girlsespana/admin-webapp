// Used for UI session cleanup. The API verifies the token signature and expiry.
export function tokenExpiresAt(token: unknown): number | null {
  if (typeof token !== 'string') return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3 || parts.some(part => !part)) return null
    const encoded = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '=')))
    const exp = payload?.exp
    return typeof exp === 'number' && Number.isFinite(exp) && exp > 0 && Number.isFinite(exp * 1000)
      ? exp * 1000 : null
  } catch { return null }
}

export function isTokenCurrent(token: unknown, now = Date.now()): token is string {
  const expiresAt = tokenExpiresAt(token)
  return expiresAt !== null && expiresAt > now
}

export function watchTokenExpiry(token: string, onExpire: () => void): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined
  let expired = false
  const check = () => {
    if (timer !== undefined) clearTimeout(timer)
    if (expired) return
    const remaining = (tokenExpiresAt(token) ?? 0) - Date.now()
    if (remaining <= 0) {
      expired = true
      onExpire()
    } else {
      timer = setTimeout(check, Math.min(remaining, 2_147_483_647))
    }
  }
  window.addEventListener('focus', check)
  document.addEventListener('visibilitychange', check)
  check()
  return () => {
    if (timer !== undefined) clearTimeout(timer)
    window.removeEventListener('focus', check)
    document.removeEventListener('visibilitychange', check)
  }
}
