export interface ContextMenuItemOption {
  /**
   * Menu item type
   */
  type?: 'item' | 'separator' | 'checkbox' | 'radio' | 'sub' | 'label'
  /**
   * Menu item label
   */
  label?: string
  /**
   * Menu item value (for radio and checkbox items)
   */
  value?: string | number
  /**
   * Menu item icon (can be a string for icon name or a Vue component)
   */
  icon?: string | any
  /**
   * Keyboard shortcut display
   */
  shortcut?: string
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
  /**
   * For checkbox items - checked state
   */
  checked?: boolean
  /**
   * For sub menus - child items
   */
  children?: ContextMenuItemOption[]
  /**
   * Click handler for menu items
   */
  onClick?: (item: ContextMenuItemOption) => void
}

export interface ContextMenuProps {
  /**
   * Menu items configuration
   */
  items?: ContextMenuItemOption[]
  /**
   * Trigger element content
   */
  triggerContent?: string
  /**
   * Trigger element class
   */
  triggerClass?: string
  /**
   * For radio groups - current selected value
   */
  radioValue?: string | number
  /**
   * Radio group name (for grouping radio items)
   */
  radioGroup?: string
}

export interface ContextMenuEmits {
  (e: 'item-click', item: ContextMenuItemOption): void
  (e: 'checkbox-change', item: ContextMenuItemOption, checked: boolean): void
  (e: 'radio-change', value: string | number): void
  (e: 'update:radioValue', value: string | number): void
}
