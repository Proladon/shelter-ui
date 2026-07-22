import type { ComputedRef, InjectionKey } from 'vue'

/** Shape of a button registered with the parent ActiveButtonGroup. */
export interface ActiveButtonRegistration {
  value: string
  disabled?: boolean
  ref?: HTMLElement
}

export const addButtonKey: InjectionKey<
  (button: ActiveButtonRegistration) => void
> = Symbol('addButton')

export const activeValueKey: InjectionKey<ComputedRef<string | undefined>> =
  Symbol('activeValue')

export const handleButtonClickKey: InjectionKey<(value: string) => void> =
  Symbol('handleButtonClick')
