import type { Component } from "vue"

export interface TagProps {
  /**
   * 標籤文字
   */
  value?: string
  /**
   * 標籤類型
   */
  type?: "default" | "primary" | "success" | "info" | "warning" | "danger"
  /**
   * 尺寸
   */
  size?: "small" | "medium" | "large"
  /**
   * 是否圓角
   */
  rounded?: boolean
  /**
   * 是否帶邊框
   */
  bordered?: boolean
  /**
   * 圖示組件
   */
  icon?: Component
}

export interface TagSlots {
  /**
   * 預設插槽
   */
  default: () => any
  /**
   * 圖示插槽
   */
  icon: () => any
}
