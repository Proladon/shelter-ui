import type { App, Plugin } from 'vue'

// 導入組件
import SHConfigProvider from './components/ConfigProvider/index.vue'
import SHButton from './components/Button/index.vue'
import SHInput from './components/Input/index.vue'
import SHTextarea from './components/Textarea/index.vue'
import SHSelect from './components/Select/index.vue'
import SHSpin from './components/Spin/index.vue'
import SHBorderContainer from './components/BorderContainer/index.vue'
import SHPopover from './components/Popover/index.vue'
import SHEditableArea from './components/EditableArea/index.vue'
import SHTooltip from './components/Tooltip/index.vue'
import SHBadge from './components/Badge/index.vue'
import SHChip from './components/Chip/index.vue'
import SHTag from './components/Tag/index.vue'
import SHDialog from './components/Dialog/index.vue'
import SHBlockArea from './components/BlockArea/index.vue'
import {
  SHActiveButtonGroup,
  SHActiveButtonItem,
} from './components/ActiveButtonGroup'
import SHFlexContainer from './components/FlexContainer/index.vue'
import SHMentionableTextArea from './components/MentionableTextArea/index.vue'
import SHContextMenu from './components/ContextMenu/index.vue'
import SHProgress from './components/Progress/index.vue'
import SHSlider from './components/Slider/index.vue'
import SHCollapsible from './components/Collapsible/index.vue'
import SHScrollArea from './components/ScrollArea/index.vue'
import SHSplitter from './components/Splitter/index.vue'
import {
  SplitterGroup as SHSplitterGroup,
  SplitterPanel as SHSplitterPanel,
  SplitterResizeHandle as SHSplitterResizeHandle,
} from './components/Splitter'
import {
  SHNotificationProvider,
  SHNotification,
  useNotification,
} from './components/Notification'
import SHRadio, { RadioGroup as SHRadioGroup } from './components/Radio'
import { SHCheckbox, SHCheckboxGroup } from './components/Checkbox'
import {
  SHCarousel,
  SHCarouselItem,
  SHCarouselNavigation,
  SHCarouselIndicators,
} from './components/Carousel'
import SHCodeEditor from './components/CodeEditor/index.vue'
import { Pagination as SHPagination } from './components/Pagination'
import { Divider as SHDivider } from './components/Divider'
import SHDatePicker from './components/DatePicker/index.vue'
import SHTimePicker from './components/TimePicker/index.vue'
import SHDateTimePicker from './components/DateTimePicker/index.vue'
import SHCalendar from './components/Calendar/index.vue'

// 組件列表
const components = {
  SHConfigProvider,
  SHButton,
  SHSpin,
  SHInput,
  SHTextarea,
  SHSelect,
  SHBorderContainer,
  SHPopover,
  SHEditableArea,
  SHTooltip,
  SHBadge,
  SHChip,
  SHTag,
  SHDialog,
  SHBlockArea,
  SHActiveButtonGroup,
  SHActiveButtonItem,
  SHFlexContainer,
  SHMentionableTextArea,
  SHContextMenu,
  SHProgress,
  SHSlider,
  SHCollapsible,
  SHScrollArea,
  SHSplitter,
  SHSplitterGroup,
  SHSplitterPanel,
  SHSplitterResizeHandle,
  SHNotificationProvider,
  SHNotification,
  SHRadio,
  SHRadioGroup,
  SHCheckbox,
  SHCheckboxGroup,
  SHCarousel,
  SHCarouselItem,
  SHCarouselNavigation,
  SHCarouselIndicators,
  SHCodeEditor,
  SHPagination,
  SHDivider,
  SHDatePicker,
  SHTimePicker,
  SHDateTimePicker,
  SHCalendar,
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
export type { TextareaProps, TextareaEmits } from './components/Textarea/types'
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
export type { TagProps, TagSlots, TagEmits } from './components/Tag/types'
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
export type {
  ContextMenuProps,
  ContextMenuEmits,
  ContextMenuItemOption,
} from './components/ContextMenu/types'
export type { ProgressProps, ProgressSlots } from './components/Progress/types'
export type { SliderProps, SliderSlots } from './components/Slider/types'
export type {
  CollapsibleProps,
  CollapsibleSlots,
  CollapsibleEmits,
} from './components/Collapsible/types'
export type {
  ScrollAreaProps,
  ScrollAreaMethods,
  ScrollAreaSlots,
} from './components/ScrollArea/types'
export type {
  SplitterGroupCustomProps,
  SplitterPanelCustomProps,
  SplitterResizeHandleCustomProps,
  SplitterGroupSlots,
  SplitterPanelSlots,
  SplitterResizeHandleSlots,
} from './components/Splitter/types'
export type {
  NotificationConfig,
  NotificationInstance,
  NotificationProviderProps,
  NotificationApi,
  NotificationProps,
  NotificationEmits,
  NotificationSlots,
  NotificationType,
} from './components/Notification/types'
export type {
  CodeEditorProps,
  CodeEditorEmits,
  CodeEditorSlots,
  CodeEditorInstance,
} from './components/CodeEditor/types'
export type {
  PaginationProps,
  PaginationEmits,
  PaginationItemType,
} from './components/Pagination/types'
export type { DividerProps } from './components/Divider/types'
export type {
  DatePickerProps,
  DatePickerEmits,
  DatePickerExpose,
  DateRange,
} from './components/DatePicker/types'
export type {
  TimePickerProps,
  TimePickerEmits,
  TimePickerExpose,
  TimeRange,
} from './components/TimePicker/types'
export type {
  DateTimePickerProps,
  DateTimePickerEmits,
  DateTimePickerExpose,
  DateTimeRange,
} from './components/DateTimePicker/types'
export type {
  CalendarProps,
  CalendarEmits,
  CalendarExpose,
} from './components/Calendar/types'

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
  SHTextarea,
  SHSelect,
  SHSpin,
  SHConfigProvider,
  SHBorderContainer,
  SHPopover,
  SHEditableArea,
  SHTooltip,
  SHBadge,
  SHChip,
  SHTag,
  SHDialog,
  SHBlockArea,
  SHActiveButtonGroup,
  SHActiveButtonItem,
  SHFlexContainer,
  SHMentionableTextArea,
  SHContextMenu,
  SHProgress,
  SHSlider,
  SHCollapsible,
  SHScrollArea,
  SHSplitter,
  SHSplitterGroup,
  SHSplitterPanel,
  SHSplitterResizeHandle,
  SHNotificationProvider,
  SHNotification,
  useNotification,
  SHRadio,
  SHRadioGroup,
  SHCheckbox,
  SHCheckboxGroup,
  SHCarousel,
  SHCarouselItem,
  SHCarouselNavigation,
  SHCarouselIndicators,
  SHCodeEditor,
  SHPagination,
  SHDivider,
  SHDatePicker,
  SHTimePicker,
  SHDateTimePicker,
  SHCalendar,
}
