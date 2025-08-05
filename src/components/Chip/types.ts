import type { Component } from "vue"

export interface ChipProps {
  /**
   * 標籤文字
   */
  label?: string
  /**
   * 圖片網址
   */
  image?: string
  /**
   * 圖示組件
   */
  icon?: Component
  /**
   * 是否可移除
   */
  removable?: boolean
  /**
   * 移除圖示組件
   */
  removeIcon?: Component
}

export interface ChipSlots {
  /**
   * 預設插槽
   */
  default: () => any
  /**
   * 圖示插槽
   */
  icon: () => any
  /**
   * 移除圖示插槽
   */
  removeicon: (scope: {
    removeCallback: (event: Event) => void
    keydownCallback: (event: Event) => void
  }) => any
}

export interface ChipEmits {
  /**
   * 移除事件
   */
  remove: [event: Event]
  /**
   * 移除圖示點擊事件
   */
  removeicon: [event: Event]
}
