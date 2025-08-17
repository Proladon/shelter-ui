export interface ScrollAreaProps {
  /**
   * 捲軸顯示策略
   * - auto: 當內容溢出時顯示捲軸
   * - always: 總是顯示捲軸
   * - scroll: 滾動時顯示捲軸
   * - hover: hover 或滾動時顯示捲軸
   */
  type?: 'auto' | 'always' | 'scroll' | 'hover'

  /**
   * 停止互動後隱藏捲軸的延遲時間（毫秒）
   * 僅在 type 為 'scroll' 或 'hover' 時有效
   */
  scrollHideDelay?: number

  /**
   * 讀取方向
   */
  dir?: 'ltr' | 'rtl'

  /**
   * 是否允許水平滾動
   */
  scrollX?: boolean

  /**
   * 是否允許垂直滾動
   */
  scrollY?: boolean

  /**
   * 自定義根元素的 class
   */
  class?: string

  /**
   * 自定義根元素的 style
   */
  style?: string | Record<string, any>
}

export interface ScrollAreaMethods {
  /**
   * 滾動到頂部
   */
  scrollTop: () => void

  /**
   * 滾動到左上角
   */
  scrollTopLeft: () => void

  /**
   * 滾動到底部
   */
  scrollBottom: () => void

  /**
   * 滾動到指定位置
   */
  scrollTo: (options: ScrollToOptions) => void

  /**
   * 取得 viewport 元素
   */
  getViewport: () => HTMLElement | null
}

export interface ScrollAreaSlots {
  /**
   * 預設插槽 - 滾動區域的內容
   */
  default?: () => any
}
