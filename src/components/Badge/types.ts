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
  /**
   * Position of the badge
   * @default 'right'
   */
  position?: 'left' | 'center' | 'right'
  /**
   * Offset from the left
   */
  offsetLeft?: string | number
  /**
   * Offset from the right
   */
  offsetRight?: string | number
  /**
   * Offset from the top
   */
  offsetTop?: string | number
  /**
   * Offset from the bottom
   */
  offsetBottom?: string | number
  /**
   * Size of the badge (font size in px)
   * @default 12
   */
  size?: number
}

export interface BadgeEmits {
  (e: 'click', event: MouseEvent): void
}
