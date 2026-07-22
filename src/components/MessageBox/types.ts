export type MessageBoxType =
  | 'info'
  | 'danger'
  | 'success'
  | 'warning'
  | 'default'

import type { Component } from 'vue'

export interface MessageBoxProps {
  /**
   * 訊息盒型態：info | danger | success | warning | default
   */
  type?: MessageBoxType
  /**
   * 自訂 icon，可傳 string 或 Vue component
   */
  icon?: string | Component
}
