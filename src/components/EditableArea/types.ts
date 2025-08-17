export interface EditableAreaProps {
  editable?: boolean
  updateFn?: () => Promise<void>
}

export interface EditableAreaEmits {
  (e: 'edit'): void
  (e: 'done'): void
}
