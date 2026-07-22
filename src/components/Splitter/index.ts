import SplitterComponent from './index.vue'
import SHSplitterGroup from './SplitterGroup.vue'
import SHSplitterPanel from './SplitterPanel.vue'
import SHSplitterResizeHandle from './SplitterResizeHandle.vue'
import type {
  SplitterGroupCustomProps,
  SplitterPanelCustomProps,
  SplitterResizeHandleCustomProps,
  SplitterGroupSlots,
  SplitterPanelSlots,
  SplitterResizeHandleSlots,
} from './types'

/**
 * @deprecated Use `SHSplitterGroup` + `SHSplitterPanel` + `SHSplitterResizeHandle` instead.
 */
const SHSplitter = SplitterComponent

export { SHSplitter, SHSplitterGroup, SHSplitterPanel, SHSplitterResizeHandle }

export type {
  SplitterGroupCustomProps,
  SplitterPanelCustomProps,
  SplitterResizeHandleCustomProps,
  SplitterGroupSlots,
  SplitterPanelSlots,
  SplitterResizeHandleSlots,
}

export default SHSplitter
