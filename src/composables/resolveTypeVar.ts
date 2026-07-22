import { computed, toValue, type MaybeRefOrGetter } from 'vue'

export type SemanticType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'

/**
 * Resolves a D2 semantic `type` value to its `var(--sh-*)` color reference.
 * 'default' maps to the base text color; 'primary' to the primary token;
 * everything else to the matching `--sh-status-*` token.
 */
export function resolveTypeVar(type: MaybeRefOrGetter<SemanticType | string | undefined>) {
  return computed(() => {
    const t = toValue(type) ?? 'default'
    if (t === 'default') return 'var(--sh-text-base)'
    if (t === 'primary') return 'var(--sh-primary)'
    if (['success', 'warning', 'danger', 'info'].includes(t)) return `var(--sh-status-${t})`
    return `var(--sh-${t})`
  })
}
