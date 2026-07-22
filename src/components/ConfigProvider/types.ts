import type { DesignTokens } from '@/core/theme-utils'

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

/**
 * Runtime theme override. Every token category (and every nested key within
 * it) is optional — pass just the pieces you want to override, e.g. only
 * `{ colors: { primary: '#ff0000' } }`. Anything omitted keeps the built-in
 * default value.
 */
export type ThemeVarsConfig = DeepPartial<DesignTokens>
