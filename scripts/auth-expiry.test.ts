import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isTokenCurrent, tokenExpiresAt, watchTokenExpiry } from '../src/modules/auth/tokenExpiry'
import { parseStoredAuthToken } from '../src/modules/auth/session'

function jwt(exp: unknown) {
  return `header.${Buffer.from(JSON.stringify({ exp })).toString('base64url')}.signature`
}

test('expiry is enforced at the exact deadline and malformed tokens are rejected', () => {
  assert.equal(tokenExpiresAt(jwt(86400)), 86400000)
  assert.equal(isTokenCurrent(jwt(86400), 86399999), true)
  assert.equal(isTokenCurrent(jwt(86400), 86400000), false)
  for (const token of [null, '', 'broken', 'a.b.c', jwt(null), jwt('86400'), jwt(0), jwt(-1)]) {
    assert.equal(isTokenCurrent(token, 0), false)
  }
})

test('a saved expired token cannot restore a session, even with future metadata', () => {
  assert.equal(parseStoredAuthToken(JSON.stringify(jwt(1))), undefined)
  for (const raw of [null, '', 'invalid-json', 'null', '{}', '[]']) assert.equal(parseStoredAuthToken(raw), undefined)
  const token = jwt(Math.floor(Date.now() / 1000) + 86400)
  assert.equal(parseStoredAuthToken(JSON.stringify(token)), token)
})

test('open sessions expire on time and listeners and timers are cleaned up', t => {
  const events = new EventTarget()
  Object.defineProperty(globalThis, 'window', { value: events, configurable: true })
  Object.defineProperty(globalThis, 'document', { value: events, configurable: true })
  t.after(() => { Reflect.deleteProperty(globalThis, 'window'); Reflect.deleteProperty(globalThis, 'document') })
  t.mock.timers.enable({ apis: ['Date', 'setTimeout'], now: 0 })
  let expired = 0
  const stop = watchTokenExpiry(jwt(86400), () => { expired++ })
  t.mock.timers.tick(86399999)
  assert.equal(expired, 0)
  t.mock.timers.tick(1)
  assert.equal(expired, 1)
  events.dispatchEvent(new Event('focus'))
  assert.equal(expired, 1)
  stop()

  const stopBeforeExpiry = watchTokenExpiry(jwt(172800), () => { expired++ })
  stopBeforeExpiry()
  t.mock.timers.tick(86400000)
  events.dispatchEvent(new Event('visibilitychange'))
  assert.equal(expired, 1)
})

test('returning to a suspended tab checks the current clock', t => {
  const events = new EventTarget()
  Object.defineProperty(globalThis, 'window', { value: events, configurable: true })
  Object.defineProperty(globalThis, 'document', { value: events, configurable: true })
  t.after(() => { Reflect.deleteProperty(globalThis, 'window'); Reflect.deleteProperty(globalThis, 'document') })
  t.mock.timers.enable({ apis: ['Date', 'setTimeout'], now: 0 })
  let expired = 0
  const stop = watchTokenExpiry(jwt(86400), () => { expired++ })
  t.mock.timers.setTime(86400001)
  events.dispatchEvent(new Event('visibilitychange'))
  assert.equal(expired, 1)
  stop()
})
