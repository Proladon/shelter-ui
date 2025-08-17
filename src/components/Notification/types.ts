import type { Component } from 'vue'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface NotificationConfig {
  /**
   * 通知標題
   */
  title?: string
  /**
   * 通知內容
   */
  message: string
  /**
   * 通知類型
   */
  type?: NotificationType
  /**
   * 自定義圖標
   */
  icon?: Component
  /**
   * 自定義圖標顏色
   */
  iconColor?: string
  /**
   * 自動關閉延遲時間（毫秒），設為 0 表示不自動關閉
   */
  duration?: number
  /**
   * 是否可手動關閉
   */
  closable?: boolean
  /**
   * 點擊回調
   */
  onClick?: () => void
  /**
   * 關閉回調
   */
  onClose?: () => void
}

export interface NotificationInstance extends NotificationConfig {
  /**
   * 通知實例的唯一標識
   */
  key: string
  /**
   * 創建時間戳
   */
  timestamp: number
}

export interface NotificationProviderProps {
  /**
   * 最大通知數量，超過時移除最舊的通知
   */
  max?: number
  /**
   * 通知容器的位置
   */
  placement?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top'
    | 'bottom'
  /**
   * 通知之間的間距
   */
  gap?: number
  /**
   * 距離邊緣的偏移量
   */
  offset?: number
}

export interface NotificationApi {
  /**
   * 創建通用通知
   */
  create: (config: NotificationConfig) => string
  /**
   * 創建信息通知
   */
  info: (config: Omit<NotificationConfig, 'type'>) => string
  /**
   * 創建成功通知
   */
  success: (config: Omit<NotificationConfig, 'type'>) => string
  /**
   * 創建警告通知
   */
  warning: (config: Omit<NotificationConfig, 'type'>) => string
  /**
   * 創建錯誤通知
   */
  error: (config: Omit<NotificationConfig, 'type'>) => string
  /**
   * 銷毀特定通知
   */
  destroy: (key: string) => void
  /**
   * 銷毀所有通知
   */
  destroyAll: () => void
}

export interface NotificationProps {
  /**
   * 通知配置
   */
  config: NotificationInstance
  /**
   * 關閉回調
   */
  onClose?: (key: string) => void
}

export interface NotificationEmits {
  close: [key: string]
  click: []
}

export interface NotificationSlots {
  /**
   * 自定義圖標插槽
   */
  icon?: () => any
  /**
   * 自定義標題插槽
   */
  title?: () => any
  /**
   * 自定義內容插槽
   */
  default?: () => any
  /**
   * 自定義操作區域插槽
   */
  actions?: () => any
}
