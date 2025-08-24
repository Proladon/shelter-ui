import type { StyleValue } from "vue"

export interface CarouselProps {
  /**
   * 當前活動項目的索引
   */
  modelValue?: number
  /**
   * 輪播項目陣列
   */
  items?: CarouselItem[]
  /**
   * 是否自動播放
   */
  autoplay?: boolean
  /**
   * 自動播放間隔時間（毫秒）
   */
  interval?: number
  /**
   * 是否顯示指示器
   */
  showIndicators?: boolean
  /**
   * 是否顯示導航箭頭
   */
  showNavigation?: boolean
  /**
   * 是否循環播放
   */
  loop?: boolean
  /**
   * 是否暫停自動播放在懸停時
   */
  pauseOnHover?: boolean
  /**
   * 動畫持續時間（毫秒）
   */
  duration?: number
  /**
   * 動畫效果類型
   */
  effect?: "slide" | "fade"
  /**
   * 輪播容器高度
   */
  height?: string | number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 自定義樣式
   */
  style?: StyleValue
  /**
   * 自定義類名
   */
  class?: string
}

export interface CarouselItem {
  /**
   * 項目唯一標識
   */
  id?: string | number
  /**
   * 項目內容
   */
  content?: string
  /**
   * 圖片 URL
   */
  image?: string
  /**
   * 圖片替代文字
   */
  alt?: string
  /**
   * 標題
   */
  title?: string
  /**
   * 描述
   */
  description?: string
  /**
   * 鏈接
   */
  href?: string
  /**
   * 是否在新視窗打開
   */
  target?: "_blank" | "_self"
  /**
   * 自定義數據
   */
  data?: Record<string, any>
}

export interface CarouselSlots {
  /**
   * 預設插槽
   */
  default: () => any
  /**
   * 項目插槽
   */
  item: (props: { item: CarouselItem; index: number; active: boolean }) => any
  /**
   * 指示器插槽
   */
  indicator: (props: { index: number; active: boolean }) => any
  /**
   * 前一個按鈕插槽
   */
  "prev-button": () => any
  /**
   * 下一個按鈕插槽
   */
  "next-button": () => any
}

export interface CarouselEmits {
  /**
   * 更新模型值
   */
  "update:modelValue": [value: number]
  /**
   * 項目變更事件
   */
  change: [current: number, previous: number]
  /**
   * 項目點擊事件
   */
  "item-click": [item: CarouselItem, index: number]
  /**
   * 自動播放開始事件
   */
  "autoplay-start": []
  /**
   * 自動播放停止事件
   */
  "autoplay-stop": []
}

export interface CarouselNavigationProps {
  /**
   * 當前索引
   */
  currentIndex: number
  /**
   * 總項目數
   */
  totalItems: number
  /**
   * 是否循環
   */
  loop?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
}

export interface CarouselNavigationEmits {
  /**
   * 前一個
   */
  prev: []
  /**
   * 下一個
   */
  next: []
}

export interface CarouselIndicatorsProps {
  /**
   * 當前索引
   */
  currentIndex: number
  /**
   * 總項目數
   */
  totalItems: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 指示器位置
   */
  position?: "bottom" | "top" | "left" | "right"
}

export interface CarouselIndicatorsEmits {
  /**
   * 指示器點擊
   */
  "indicator-click": [index: number]
}
