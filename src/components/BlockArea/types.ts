import type { Component } from "vue"

export interface BlockAreaProps {
  /**
   * 是否啟用區域 (true: 正常, false: 禁用)
   */
  active?: boolean
  /**
   * 要顯示的圖示組件
   */
  icon?: Component
  /**
   * 要顯示的文字
   */
  text?: string
}

export interface BlockAreaSlots {
  /**
   * 預設內容插槽
   */
  default: () => any
  /**
   * 圖示插槽
   */
  icon: () => any
  /**
   * 文字插槽
   */
  text: () => any
}
