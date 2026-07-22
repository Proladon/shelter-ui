import type { StyleValue } from 'vue'

export interface RadioProps {
  /**
   * 目前選中的值（v-model:value）
   */
  value?: any
  /**
   * 原生表單值 / 此單選框代表的值（對應原生 <input value>）。
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
   * 標籤文字
   */
  label?: string
}

export interface RadioGroupProps {
  /**
   * 當前選中的值
   */
  value?: any
  /**
   * 選項陣列
   */
  options?: RadioOption[]
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

export interface RadioOption {
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

export interface RadioSlots {
  /**
   * 預設插槽
   */
  default: () => any
}

export interface RadioEmits {
  /**
   * 值變更事件（帶新值）
   */
  change: [value: any]
  /**
   * 獲得焦點事件
   */
  focus: [event: FocusEvent]
  /**
   * 失去焦點事件
   */
  blur: [event: FocusEvent]
}

export interface RadioGroupEmits {
  /**
   * 值變更事件
   */
  change: [value: any]
}
