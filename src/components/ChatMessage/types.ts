export type ChatMessagePosition = 'left' | 'right'
export type ChatMessageStatus = 'sending' | 'sent' | 'failed'

export interface ChatMessageProps {
  /** 頭像圖片 URL */
  avatar?: string
  /** 頭像 fallback 文字（無法載入圖片時顯示） */
  avatarFallback?: string
  /** 使用者名稱 */
  username?: string
  /** 訊息時間 */
  time?: string
  /** 訊息本體 */
  content?: string
  /** 訊息對齊方向：left = 收到的訊息，right = 自己發送的訊息 */
  position?: ChatMessagePosition
  /** 訊息狀態 */
  status?: ChatMessageStatus
}

export interface ChatMessageSlots {
  /** 自訂頭像 */
  avatar: () => unknown
  /** 自訂使用者名稱 */
  username: () => unknown
  /** 自訂訊息本體 */
  content: () => unknown
  /** 自訂訊息時間 */
  time: () => unknown
}
