export interface BadgeProps {
  /**
   * Badge value content
   */
  value?: string | number
  /**
   * Background color of the badge
   */
  color?: string
  /**
   * Text color of the badge
   */
  textColor?: string
  /**
   * Whether to show a dot instead of value
   */
  isDot?: boolean
  /**
   * Maximum value to display. If the value exceeds the max, it will show {max}+
   */
  max?: number
  /**
   * Whether to show the badge
   */
  show?: boolean
}

export interface BadgeEmits {
  (e: 'click', event: MouseEvent): void
}
