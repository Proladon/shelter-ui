export interface StatusTagProps {
  /**
   * 標籤文字
   */
  value?: string
  /**
   * 標籤類型，決定圓點顏色語意
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  /**
   * 是否顯示 loading 旋轉動畫（取代圓點）
   */
  loading?: boolean
}

export interface StatusTagSlots {
  /**
   * 標籤文字插槽
   */
  default: () => unknown
}
