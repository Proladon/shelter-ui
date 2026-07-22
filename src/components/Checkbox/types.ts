import type { StyleValue } from 'vue'

export interface CheckboxProps {
  /**
   * 核取方塊的值（v-model:value）。單獨使用時為 boolean | 'indeterminate'；
   * 在 CheckboxGroup 中則為選中值陣列。
   */
  value?: boolean | 'indeterminate' | null | any[]
  /**
   * 原生表單值 / 群組中代表此選項的值（對應原生 <input value>）。
   * 與 v-model 的 value 是兩個不同概念，故不同名，避免衝突。
   */
  nativeValue?: any
  /**
   * 表單名稱
   */
  name?: string
  /**
   * 尺寸
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否唯讀
   */
  readonly?: boolean
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
  value?: any[]
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
   * 尺寸（套用至所有子選項）
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 是否禁用整個群組
   */
  disabled?: boolean
  /**
   * 是否唯讀整個群組
   */
  readonly?: boolean
  /**
   * 表單名稱
   */
  name?: string
  /**
   * 佈局方向
   */
  orientation?: 'horizontal' | 'vertical'
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
   * 值變更事件（帶新值，單獨使用時為 boolean，群組中為選中值陣列）
   */
  change: [value: boolean | any[]]
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
   * 值變更事件
   */
  change: [value: any[]]
}
