import type {
  SplitterGroupProps,
  SplitterPanelProps,
  SplitterResizeHandleProps,
} from 'reka-ui'

export interface SplitterGroupCustomProps extends SplitterGroupProps {
  gap?: number
  color?: string
}

/**
 * @deprecated Use `SplitterGroupCustomProps` instead (paired with `SHSplitterGroup` +
 * `SHSplitterPanel` + `SHSplitterResizeHandle`).
 */
export interface SplitterProps extends Omit<SplitterGroupCustomProps, 'variant'> {
  direction: 'horizontal' | 'vertical'
}

export interface SplitterPanelCustomProps extends SplitterPanelProps {
  padding?: 'none' | 'small' | 'default' | 'large'
}

export interface SplitterResizeHandleCustomProps
  extends SplitterResizeHandleProps {
  visible?: boolean
  color?: string
  hoverColor?: string
  dragColor?: string
}

export interface SplitterGroupSlots {
  default?: any
}

export interface SplitterPanelSlots {
  default?: any
}

export interface SplitterResizeHandleSlots {
  default?: any
}
