import type {
  SplitterGroupProps,
  SplitterPanelProps,
  SplitterResizeHandleProps,
} from 'reka-ui'

export interface SplitterGroupCustomProps extends SplitterGroupProps {
  gap?: number
  color?: string
}

export interface SplitterPanelCustomProps extends SplitterPanelProps {
  padding?: 'none' | 'small' | 'default' | 'large'
}

export interface SplitterResizeHandleCustomProps
  extends SplitterResizeHandleProps {
  visable?: boolean
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
