export interface SpinProps {
  /** 是否顯示載入遮罩（v-model:value） */
  value?: boolean
  size?: 'small' | 'medium' | 'large' | number
  description?: string
  rotate?: boolean
  stroke?: string
  strokeWidth?: number
  delay?: number
}
