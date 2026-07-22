import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'
import ShelterUI, * as namedExports from '../index'

/**
 * Vue doesn't expose a public API to enumerate all globally registered
 * components, only to look one up by name (`app.component(name)`). Reaching
 * into `_context.components` is the only way to get the full registered set.
 */
function getRegisteredComponentNames(): string[] {
  const app = createApp({})
  app.use(ShelterUI)
  const ctx = (app as unknown as { _context: { components: Record<string, unknown> } })
    ._context
  return Object.keys(ctx.components)
}

describe('src/index.ts — named exports vs. app.use() registration', () => {
  const namedComponentKeys = Object.keys(namedExports).filter((key) =>
    /^SH[A-Z]/.test(key),
  )

  it('exports a sane number of SH-prefixed components (regex sanity check)', () => {
    expect(namedComponentKeys.length).toBeGreaterThan(40)
  })

  it('every named SH* export is also registered via app.use()', () => {
    const app = createApp({})
    app.use(ShelterUI)
    const missing = namedComponentKeys.filter((key) => !app.component(key))
    expect(missing).toEqual([])
  })

  it('every app.use()-registered component is also named-exported', () => {
    const registered = getRegisteredComponentNames()
    const namedSet = new Set(namedComponentKeys)
    const orphaned = registered.filter((name) => !namedSet.has(name))
    expect(orphaned).toEqual([])
  })
})
