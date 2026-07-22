export type AlertDialogType = 'danger' | 'warning' | 'info' | 'success'

export interface AlertDialogProps {
  /** 控制對話框是否顯示 */
  value?: boolean
  /** 是否為 modal 模式（預設：true） */
  modal?: boolean
  /** 對話框類型，影響圖示與確認按鈕顏色 */
  type?: AlertDialogType
  /** 標題文字 */
  title?: string
  /** 描述文字 */
  description?: string
  /** 確認按鈕文字（預設：'確認'） */
  confirmText?: string
  /** 取消按鈕文字（預設：'取消'） */
  cancelText?: string
  /** 確認按鈕載入狀態 */
  loading?: boolean
}

export interface AlertDialogEmits {
  'update:value': [value: boolean]
  confirm: []
  cancel: []
}

export interface AlertDialogSlots {
  trigger: () => unknown
  title: () => unknown
  description: () => unknown
  footer: () => unknown
}
