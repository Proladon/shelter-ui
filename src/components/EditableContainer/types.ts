export interface EditableContainerProps {
  editable?: boolean
  updateFn?: () => Promise<void>
}

export interface EditableContainerEmits {
  edit: []
  done: []
}
