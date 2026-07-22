import { computed, toValue, type MaybeRefOrGetter } from 'vue'

export type ComponentSize = 'small' | 'medium' | 'large'

/**
 * Builds the `{prefix}--{size}` BEM modifier class, defaulting to 'medium'
 * to match D1's component-size convention.
 */
export function useComponentSize(
  prefix: string,
  size: MaybeRefOrGetter<ComponentSize | undefined>,
) {
  return computed(() => `${prefix}--${toValue(size) ?? 'medium'}`)
}
