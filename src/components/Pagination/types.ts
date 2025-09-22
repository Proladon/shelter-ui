export interface PaginationProps {
  /** 當前頁數 */
  modelValue?: number
  /** 總頁數 */
  total: number
  /** 每頁項目數量 */
  pageSize?: number
  /** 當前頁面附近顯示的頁碼數量 */
  siblingCount?: number
  /** 是否顯示首頁和末頁按鈕 */
  showEdges?: boolean
  /** 是否顯示上一頁下一頁按鈕 */
  showPrevNext?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 自定義類名 */
  class?: string
  /** 文字按鈕 */
  text?: boolean
  /** 幽靈按鈕 */
  ghost?: boolean
  /** 外框按鈕 */
  outline?: boolean
  /** 帶邊框按鈕 */
  borderd?: boolean
  /** 按鈕大小 */
  size?: "large" | "default" | "small"
}

export interface PaginationItemType {
  type: "page" | "ellipsis"
  value?: number
}

export interface PaginationEmits {
  /** 頁數變更事件 */
  "update:modelValue": [page: number]
  /** 頁數變更事件 */
  change: [page: number]
}
