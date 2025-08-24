import type { StyleValue } from "vue"

export interface CheckboxProps {
  /**
   * 當前選中狀態
   */
  modelValue?: boolean | "indeterminate" | null
  /**
   * 複選框的值
   */
  value?: any
  /**
   * 表單名稱
   */
  name?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * input 元素的 ID
   */
  inputId?: string
  /**
   * input 元素的 class
   */
  inputClass?: string
  /**
   * input 元素的樣式
   */
  inputStyle?: StyleValue
  /**
   * 是否為二進位模式
   */
  binary?: boolean
  /**
   * 是否為不確定狀態
   */
  indeterminate?: boolean
  /**
   * 標籤文字
   */
  label?: string
}

export interface CheckboxGroupProps {
  /**
   * 當前選中的值陣列
   */
  modelValue?: any[]
  /**
   * 選項陣列
   */
  options?: (CheckboxOption | string)[]
  /**
   * 選項標籤的屬性名
   */
  optionLabel?: string
  /**
   * 選項值的屬性名
   */
  optionValue?: string
  /**
   * 選項禁用狀態的屬性名
   */
  optionDisabled?: string
  /**
   * 是否禁用整個群組
   */
  disabled?: boolean
  /**
   * 表單名稱
   */
  name?: string
  /**
   * 佈局方向
   */
  orientation?: "horizontal" | "vertical"
  /**
   * 群組標籤
   */
  label?: string
}

export interface CheckboxOption {
  /**
   * 選項標籤
   */
  label: string
  /**
   * 選項值
   */
  value: any
  /**
   * 是否禁用
   */
  disabled?: boolean
}

export interface CheckboxSlots {
  /**
   * 預設插槽
   */
  default: () => any
  /**
   * 圖示插槽
   */
  icon: () => any
}

export interface CheckboxEmits {
  /**
   * 更新模型值
   */
  "update:modelValue": [value: boolean | "indeterminate" | null]
  /**
   * 值變更事件
   */
  change: [event: Event]
  /**
   * 獲得焦點事件
   */
  focus: [event: FocusEvent]
  /**
   * 失去焦點事件
   */
  blur: [event: FocusEvent]
}

export interface CheckboxGroupEmits {
  /**
   * 更新模型值
   */
  "update:modelValue": [value: any[]]
  /**
   * 值變更事件
   */
  change: [value: any[]]
}
