import type { App, Plugin } from 'vue'
import './generated/baseline.css'

// 導入組件
import SHConfigProvider from './components/ConfigProvider/index.vue'
import SHButton from './components/Button'
import SHInput from './components/Input'
import { SHInputGroup, SHInputGroupAddon } from './components/InputGroup'
import SHNumberInput from './components/NumberInput/index.vue'
import SHTextarea from './components/Textarea/index.vue'
import SHSelect from './components/Select/index.vue'
import SHSpin from './components/Spin'
import SHBaseContainer from './components/BaseContainer'
import SHPopover from './components/Popover'
import SHEditableContainer from './components/EditableContainer'
import SHTooltip from './components/Tooltip'
import SHBadge from './components/Badge'
import SHChip from './components/Chip/index.vue'
import SHTag from './components/Tag/index.vue'
import SHStatusTag from './components/StatusTag/index.vue'
import SHSwitch from './components/Switch/index.vue'
import SHDialog from './components/Dialog'
import SHAlertDialog from './components/AlertDialog/index.vue'
import SHBlockArea from './components/BlockArea/index.vue'
import {
  SHActiveButtonGroup,
  SHActiveButtonItem,
} from './components/ActiveButtonGroup'
import SHFlexContainer from './components/FlexContainer'
import SHMentionableTextArea from './components/MentionableTextArea/index.vue'
import SHContextMenu from './components/ContextMenu/index.vue'
import SHProgress from './components/Progress/index.vue'
import SHSlider from './components/Slider/index.vue'
import SHCollapsible from './components/Collapsible/index.vue'
import SHScrollArea from './components/ScrollArea/index.vue'
import {
  SHSplitter,
  SHSplitterGroup,
  SHSplitterPanel,
  SHSplitterResizeHandle,
} from './components/Splitter'
import {
  SHNotificationProvider,
  SHNotification,
  useNotification,
} from './components/Notification'
import SHRadio, { SHRadioGroup } from './components/Radio'
import { SHCheckbox, SHCheckboxGroup } from './components/Checkbox'
import {
  SHCarousel,
  SHCarouselItem,
  SHCarouselNavigation,
  SHCarouselIndicators,
} from './components/Carousel'
import { SHPagination } from './components/Pagination'
import { SHDivider } from './components/Divider'
import SHTimePicker from './components/TimePicker/index.vue'
import SHDatePicker from './components/DatePicker/index.vue'
import SHCalendar from './components/Calendar/index.vue'
import SHMessageBox from './components/MessageBox'
import SHUploadZone from './components/UploadZone/index.vue'
import SHPinInput from './components/PinInput/index.vue'
import SHChatInput from './components/ChatInput/index.vue'
import { SHChatMessage } from './components/ChatMessage'

// 組件列表
const components = {
  SHConfigProvider,
  SHButton,
  SHSpin,
  SHInput,
  SHInputGroup,
  SHInputGroupAddon,
  SHNumberInput,
  SHTextarea,
  SHSelect,
  SHBaseContainer,
  SHPopover,
  SHEditableContainer,
  SHTooltip,
  SHBadge,
  SHChip,
  SHTag,
  SHStatusTag,
  SHDialog,
  SHAlertDialog,
  SHBlockArea,
  SHMessageBox,
  SHSwitch,
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
  SHPagination,
  SHDivider,
  SHTimePicker,
  SHDatePicker,
  SHCalendar,
  SHUploadZone,
  SHPinInput,
  SHChatInput,
  SHChatMessage,
}

// 單獨導出組件（須與上方 components 清單一致，由 src/__tests__/index.test.ts 驗證）
export {
  SHConfigProvider,
  SHButton,
  SHSpin,
  SHInput,
  SHInputGroup,
  SHInputGroupAddon,
  SHNumberInput,
  SHTextarea,
  SHSelect,
  SHBaseContainer,
  SHPopover,
  SHEditableContainer,
  SHTooltip,
  SHBadge,
  SHChip,
  SHTag,
  SHStatusTag,
  SHDialog,
  SHAlertDialog,
  SHBlockArea,
  SHMessageBox,
  SHSwitch,
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
  SHPagination,
  SHDivider,
  SHTimePicker,
  SHDatePicker,
  SHCalendar,
  SHUploadZone,
  SHPinInput,
  SHChatInput,
  SHChatMessage,
}

// useNotification 為 composable，非組件，不進入 components 註冊清單
export { useNotification }

// 類型聲明
export type { ThemeVarsConfig } from './components/ConfigProvider/types'
export type { ButtonProps, ButtonEmits } from './components/Button/types'
export type { InputProps, InputEmits } from './components/Input/types'
export type {
  InputGroupProps,
  InputGroupAddonProps,
} from './components/InputGroup/types'
export type {
  NumberInputProps,
  NumberInputEmits,
  NumberInputSlots,
} from './components/NumberInput/types'
export type { TextareaProps, TextareaEmits } from './components/Textarea/types'
export type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectSlots,
} from './components/Select/types'
export type { SpinProps } from './components/Spin/types'
export type {
  BaseContainerProps,
  BaseContainerEmits,
} from './components/BaseContainer/types'
export type { PopoverProps, PopoverEmits } from './components/Popover/types'
export type {
  EditableContainerProps,
  EditableContainerEmits,
} from './components/EditableContainer/types'
export type { TooltipProps, TooltipEmits } from './components/Tooltip/types'
export type { BadgeProps, BadgeEmits } from './components/Badge/types'
export type {
  ChipProps,
  ChipEmits,
  ChipSlots,
} from './components/Chip/types'
export type { TagProps, TagSlots } from './components/Tag/types'
export type {
  StatusTagProps,
  StatusTagSlots,
} from './components/StatusTag/types'
export type { DialogProps, DialogEmits } from './components/Dialog/types'
export type {
  AlertDialogProps,
  AlertDialogEmits,
  AlertDialogType,
} from './components/AlertDialog/types'
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
export type {
  ProgressProps,
  ProgressSlots,
  ProgressEmits,
} from './components/Progress/types'
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
  RadioProps,
  RadioGroupProps,
  RadioOption,
  RadioSlots,
  RadioEmits,
  RadioGroupEmits,
} from './components/Radio/types'
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxOption,
  CheckboxSlots,
  CheckboxEmits,
  CheckboxGroupEmits,
} from './components/Checkbox/types'
export type {
  CarouselProps,
  CarouselItem,
  CarouselSlots,
  CarouselEmits,
  CarouselNavigationProps,
  CarouselNavigationEmits,
  CarouselIndicatorsProps,
  CarouselIndicatorsEmits,
} from './components/Carousel/types'
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
  CalendarProps,
  CalendarEmits,
  CalendarExpose,
} from './components/Calendar/types'
export type {
  MessageBoxProps,
  MessageBoxType,
} from './components/MessageBox/types'
export type { SwitchProps, SwitchEmits } from './components/Switch/types'
export type {
  UploadZoneProps,
  UploadZoneEmits,
  UploadZoneFile,
  UploadZoneStatus,
  UploadZoneSize,
  UploadZoneSlots,
} from './components/UploadZone/types'
export type {
  PinInputProps,
  PinInputEmits,
  PinInputSize,
  PinInputType,
} from './components/PinInput/types'
export type {
  ChatInputProps,
  ChatInputEmits,
} from './components/ChatInput/types'
export type {
  ChatMessageProps,
  ChatMessageEmits,
  ChatMessageSlots,
  ChatMessagePosition,
  ChatMessageStatus,
} from './components/ChatMessage/types'

// 安裝函數
const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
  return app
}

// 版本號（單一來源：package.json，透過 vite `define` 注入）
const version = __SHELTER_UI_VERSION__

// Vue 插件對象
const ShelterUI: Plugin = {
  install,
}

// 默認導出為 Vue 插件
export default ShelterUI

// 單獨導出版本號
export { version }
