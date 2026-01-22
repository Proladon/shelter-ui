export interface EditableContainerProps {
  editable?: boolean
  updateFn?: () => Promise<void>
}

export interface EditableContainerEmits {
  (e: 'edit'): void
  (e: 'done'): void
}
