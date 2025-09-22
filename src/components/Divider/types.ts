export interface DividerProps {
  /** 分隔線方向 */
  orientation?: "horizontal" | "vertical"
  /** 自定義類名 */
  class?: string
  /** 分隔線樣式 */
  variant?: "solid" | "dashed" | "dotted"
  /** 分隔線粗細 */
  thickness?: "thin" | "medium" | "thick"
}
