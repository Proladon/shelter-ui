export interface ChatInputProps {
  /**
   * 輸入框的值（v-model）
   */
  value?: string
  /**
   * 占位符文字
   */
  placeholder?: string
  /**
   * 預設顯示的行數
   */
  rows?: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否顯示字元計數
   */
  showWordLimit?: boolean
  /**
   * 最大字元長度
   */
  maxlength?: number
  /**
   * 送出按鈕是否載入中
   */
  submitLoading?: boolean
  /**
   * 接受的檔案類型（傳遞給 file input 的 accept 屬性）
   */
  fileAccept?: string
  /**
   * 接受的圖片類型（傳遞給 image input 的 accept 屬性）
   */
  imageAccept?: string
  /**
   * 是否隱藏檔案上傳按鈕
   */
  hideFileUpload?: boolean
  /**
   * 是否隱藏圖片上傳按鈕
   */
  hideImageUpload?: boolean
}

export interface ChatInputEmits {
  (e: 'update:value', value: string): void
  (e: 'submit', value: string): void
  (e: 'fileSelect', files: FileList): void
  (e: 'imageSelect', files: FileList): void
  (e: 'pressEnter', event: KeyboardEvent): void
}
