export type UploadZoneStatus = 'idle' | 'uploading' | 'success' | 'error'
export type UploadZoneSize = 'sm' | 'md' | 'lg'

export interface UploadZoneFile {
  /** Unique id (generated internally) */
  id: string
  /** Original File object */
  raw: File
  /** Display name */
  name: string
  /** File size in bytes */
  size: number
  /** MIME type */
  type: string
  /** Upload status */
  status: UploadZoneStatus
  /** Upload progress 0–100 */
  progress: number
  /** Error message when status is 'error' */
  error?: string
  /** Preview URL (for image files) */
  previewUrl?: string
}

export interface UploadZoneProps {
  /**
   * v-model: the current file list
   */
  modelValue?: UploadZoneFile[]
  /**
   * Accepted MIME types or file extensions, same as `<input accept>`.
   * E.g. "image/*,.pdf"
   */
  accept?: string
  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean
  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Maximum number of files allowed (only applies when multiple=true).
   * 0 means unlimited.
   * @default 0
   */
  maxCount?: number
  /**
   * Maximum file size in bytes per file.
   * 0 means unlimited.
   * @default 0
   */
  maxSize?: number
  /**
   * Size variant of the drop zone
   * @default 'md'
   */
  size?: UploadZoneSize
}

export interface UploadZoneEmits {
  (e: 'update:modelValue', files: UploadZoneFile[]): void
  /** Fires after files are selected and validated */
  (e: 'change', files: UploadZoneFile[]): void
  /** Fires when a file exceeds maxSize */
  (e: 'exceed-size', file: File): void
  /** Fires when the file count exceeds maxCount */
  (e: 'exceed-count', files: File[]): void
  /** Fires when a file is removed */
  (e: 'remove', file: UploadZoneFile): void
}

export interface UploadZoneSlots {
  /** Custom content for the drop zone trigger */
  trigger?: () => unknown
  /** Custom content shown below the file list */
  tip?: () => unknown
}
