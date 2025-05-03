import type { App } from 'vue'

// 導入組件
import SConfigProvider from './components/ConfigProvider/index.vue'
import SButton from './components/Button/index.vue'
import SInput from './components/Input/index.vue'
import SSpin from './components/Spin/index.vue'
import SBorderContainer from './components/BorderContainer/index.vue'
import SPopover from './components/Popover/index.vue'
import SEditableArea from './components/EditableArea/index.vue'
import STooltip from './components/Tooltip/index.vue'
import SBadge from './components/Badge/index.vue'
import { generateUnoThemeColors } from '@/core'

// 組件列表
const components = {
  SConfigProvider,
  SButton,
  SSpin,
  SInput,
  SBorderContainer,
  SPopover,
  SEditableArea,
  STooltip,
  SBadge,
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

// 安裝函數
const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
  return app
}

// 默認導出
export default { install, version: '0.1.0', ...components }

// 單獨導出組件
export {
  SButton,
  SInput,
  SSpin,
  SConfigProvider,
  SBorderContainer,
  SPopover,
  SEditableArea,
  STooltip,
  SBadge,
  generateUnoThemeColors,
}
