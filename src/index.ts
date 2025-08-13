import type { App, Plugin } from 'vue'

// 導入組件
import SHConfigProvider from './components/ConfigProvider/index.vue'
import SHButton from './components/Button/index.vue'
import SHInput from './components/Input/index.vue'
import SHSelect from './components/Select/index.vue'
import SHSpin from './components/Spin/index.vue'
import SHBorderContainer from './components/BorderContainer/index.vue'
import SHPopover from './components/Popover/index.vue'
import SHEditableArea from './components/EditableArea/index.vue'
import SHTooltip from './components/Tooltip/index.vue'
import SHBadge from './components/Badge/index.vue'
import SHChip from './components/Chip/index.vue'
import SHDialog from './components/Dialog/index.vue'
import SHBlockArea from './components/BlockArea/index.vue'
import {
  SHActiveButtonGroup,
  SHActiveButtonItem,
} from './components/ActiveButtonGroup'
import SHFlexContainer from './components/FlexContainer/index.vue'
import SHMentionableTextArea from './components/MentionableTextArea/index.vue'

// 組件列表
const components = {
  SHConfigProvider,
  SHButton,
  SHSpin,
  SHInput,
  SHSelect,
  SHBorderContainer,
  SHPopover,
  SHEditableArea,
  SHTooltip,
  SHBadge,
  SHChip,
  SHDialog,
  SHBlockArea,
  SHActiveButtonGroup,
  SHActiveButtonItem,
  SHFlexContainer,
  SHMentionableTextArea,
}

/**
 * Say hello function - returns a greeting message
 * @param name - Optional name to greet, defaults to "world"
 * @returns A greeting message
 */
export function sayHello(name: string = 'world'): string {
  return `Hello, ${name}!`
}

// 類型聲明
export type { ThemeVarsConfig } from './components/ConfigProvider/types'
export type { ButtonProps, ButtonEmits } from './components/Button/types'
export type { InputProps, InputEmits } from './components/Input/types'
export type {
  SelectProps,
  SelectEmits,
  SelectOption,
} from './components/Select/types'
export type { SpinProps, SpinEmits } from './components/Spin/types'
export type {
  BorderContainerProps,
  BorderContainerEmits,
} from './components/BorderContainer/types'
export type { PopoverProps, PopoverEmits } from './components/Popover/types'
export type {
  EditableAreaProps,
  EditableAreaEmits,
} from './components/EditableArea/types'
export type { TooltipProps, TooltipEmits } from './components/Tooltip/types'
export type { BadgeProps, BadgeEmits } from './components/Badge/types'
export type { ChipProps, ChipEmits } from './components/Chip/types'
export type { DialogProps, DialogEmits } from './components/Dialog/types'
export type {
  BlockAreaProps,
  BlockAreaSlots,
} from './components/BlockArea/types'
export type { FlexContainerProps } from './components/FlexContainer/types'
export type {
  ActiveButtonGroupProps,
  ActiveButtonGroupEmits,
  ActiveButtonItemProps,
} from './components/ActiveButtonGroup/types'
export type {
  MentionableTextAreaProps,
  MentionableTextAreaEmits,
  MentionItem,
  MentionData,
} from './components/MentionableTextArea/types'

// 安裝函數
const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
  return app
}

// 版本號
const version = '0.1.0'

// Vue 插件對象
const ShelterUI: Plugin = {
  install,
}

// 默認導出為 Vue 插件
export default ShelterUI

// 單獨導出版本號
export { version }

// 單獨導出組件
export {
  SHButton,
  SHInput,
  SHSelect,
  SHSpin,
  SHConfigProvider,
  SHBorderContainer,
  SHPopover,
  SHEditableArea,
  SHTooltip,
  SHBadge,
  SHChip,
  SHDialog,
  SHBlockArea,
  SHActiveButtonGroup,
  SHActiveButtonItem,
  SHFlexContainer,
  SHMentionableTextArea,
}
