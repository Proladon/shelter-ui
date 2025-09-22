export interface CodeEditorProps {
  /** 綁定的代碼值 */
  modelValue?: string
  /** 程式語言 */
  language?: string
  /** 編輯器主題 */
  theme?: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  /** Monaco Editor 選項 */
  options?: any
  /** 編輯器寬度 */
  width?: string | number
  /** 編輯器高度 */
  height?: string | number
  /** 是否只讀 */
  readOnly?: boolean
  /** 載入中文字 */
  loading?: string
  /** 是否顯示小地圖 */
  minimap?: boolean
  /** 行號顯示模式 */
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval'
  /** 文字換行模式 */
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded'
  /** 字體大小 */
  fontSize?: number
  /** Tab 大小 */
  tabSize?: number
  /** 是否使用空格代替 Tab */
  insertSpaces?: boolean
  /** 是否自動佈局 */
  automaticLayout?: boolean
}

export interface CodeEditorEmits {
  'update:modelValue': [value: string]
  change: [value: string, event: any]
  ready: [editor: any]
  focus: [event: any]
  blur: [event: any]
  keydown: [event: any]
  keyup: [event: any]
  mousedown: [event: any]
  mouseup: [event: any]
  contextmenu: [event: any]
}

export interface CodeEditorSlots {
  /** 載入狀態插槽 */
  loading?: () => any
  /** 預設插槽（載入狀態） */
  default?: () => any
}

export type CodeEditorInstance = {
  /** Monaco Editor 實例 */
  editor: any | null
  /** 獲取編輯器值 */
  getValue: () => string
  /** 設置編輯器值 */
  setValue: (value: string) => void
  /** 聚焦編輯器 */
  focus: () => void
  /** 格式化代碼 */
  format: () => void
  /** 重新佈局 */
  layout: () => void
}
