import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  title: 'Shelter UI',
  description: '基於Vue 3的UnoCSS組件庫',
  base: '/shelter-ui/',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '組件', link: '/components/' },
      { text: '範例', link: '/guide/dashboard' },
    ],
    search: {
      provider: 'local',
    },
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介紹', link: '/guide/' },
            { text: 'Dashboard 範例', link: '/guide/dashboard' },
            { text: '快速開始', link: '/guide/getting-started' },
            { text: 'Design System 設計規範', link: '/guide/design-system' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基礎組件',
          items: [
            { text: 'Button 按鈕', link: '/components/button' },
            { text: 'Input 輸入框', link: '/components/input' },
            { text: 'InputGroup 輸入框組合', link: '/components/input-group' },
            {
              text: 'NumberInput 數字輸入框',
              link: '/components/number-input',
            },
            { text: 'Textarea 多行文字輸入框', link: '/components/textarea' },
            { text: 'Select 選擇器', link: '/components/select' },
            { text: 'Checkbox 複選框', link: '/components/checkbox' },
            { text: 'Radio 單選框', link: '/components/radio' },
            { text: 'Switch 開關', link: '/components/switch' },
            { text: 'PinInput 驗證碼輸入框', link: '/components/pin-input' },
            { text: 'Badge 徽章', link: '/components/badge' },
            { text: 'Tag 標籤', link: '/components/tag' },
            { text: 'StatusTag 狀態標籤', link: '/components/status-tag' },
            { text: 'Chip 標籤', link: '/components/chip' },
            { text: 'Divider 分隔線', link: '/components/divider' },
            { text: 'UploadZone 上傳區域', link: '/components/file-upload' },
            { text: 'Progress 進度條', link: '/components/progress' },
            { text: 'Spin 加載中', link: '/components/spin' },
            {
              text: 'FlexContainer 彈性容器',
              link: '/components/flex-container',
            },
            {
              text: 'BaseContainer 基礎容器',
              link: '/components/base-container',
            },
            {
              text: 'ConfigProvider 配置提供者',
              link: '/components/config-provider',
            },
          ],
        },
        {
          text: '常用組件',
          items: [
            {
              text: 'ActiveButtonGroup 活動按鈕組',
              link: '/components/active-button-group',
            },
            { text: 'Carousel 輪播', link: '/components/carousel' },
            { text: 'Collapsible 折疊面板', link: '/components/collapsible' },
            { text: 'ContextMenu 右鍵選單', link: '/components/context-menu' },
            {
              text: 'AlertDialog 警告對話框',
              link: '/components/alert-dialog',
            },
            { text: 'Dialog 對話框', link: '/components/dialog' },
            { text: 'Popover 彈出框', link: '/components/popover' },
            { text: 'Tooltip 工具提示', link: '/components/tooltip' },
            { text: 'MessageBox 訊息盒', link: '/components/message-box' },
            { text: 'Notification 通知', link: '/components/notification' },
            { text: 'Pagination 分頁', link: '/components/pagination' },
            { text: 'Slider 滑桿', link: '/components/slider' },
            { text: 'Splitter 分割器', link: '/components/splitter' },
            {
              text: 'MentionableTextArea 可提及文本域',
              link: '/components/mentionable-textarea',
            },
            {
              text: 'EditableContainer 可編輯容器',
              link: '/components/editable-container',
            },
            { text: 'ScrollArea 滾動區域', link: '/components/scroll-area' },
            { text: 'BlockArea 禁用區域', link: '/components/block-area' },
          ],
        },
        {
          text: '對話組件 Chat',
          items: [
            { text: 'ChatMessage 對話訊息', link: '/components/chat-message' },
            { text: 'ChatInput 對話輸入框', link: '/components/chat-input' },
          ],
        },
        {
          text: '日期組件',
          items: [
            { text: 'Calendar 日曆', link: '/components/calendar' },
            { text: 'DatePicker 日期選擇器', link: '/components/date-picker' },
            { text: 'TimePicker 時間選擇器', link: '/components/time-picker' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/proladon/shelter-ui' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present',
    },
  },
  vite: {
    plugins: [UnoCSS()],
    ssr: {
      noExternal: ['unocss'],
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
      },
    },
    optimizeDeps: {},
  },
})
