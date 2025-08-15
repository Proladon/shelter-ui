import type {
  SplitterGroupProps,
  SplitterPanelProps,
  SplitterResizeHandleProps,
} from 'reka-ui'

export interface SplitterGroupCustomProps extends SplitterGroupProps {
  variant?: 'default' | 'bordered' | 'card'
  gap?: number
}

export interface SplitterPanelCustomProps extends SplitterPanelProps {
  variant?: 'default' | 'bordered' | 'card'
  padding?: 'none' | 'small' | 'default' | 'large'
}

export interface SplitterResizeHandleCustomProps
  extends SplitterResizeHandleProps {
  variant?: 'default' | 'thick' | 'invisible'
  showHandle?: boolean
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
