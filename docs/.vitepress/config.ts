import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitepress"
import UnoCSS from "unocss/vite"
import { resolve } from "node:path"

export default defineConfig({
  title: "Shelter UI",
  description: "基於Vue 3的UnoCSS組件庫",
  base: "/shelter-ui/",
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "組件", link: "/components/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "介紹", link: "/guide/" },
            { text: "快速開始", link: "/guide/getting-started" },
          ],
        },
      ],
      "/components/": [
        {
          text: "基礎組件",
          items: [
            {
              text: "ActiveButtonGroup 活動按鈕組",
              link: "/components/active-button-group",
            },
            { text: "Badge 徽章", link: "/components/badge" },
            { text: "BlockArea 禁用區域", link: "/components/block-area" },
            { text: "Button 按鈕", link: "/components/button" },
            { text: "Carousel 輪播", link: "/components/carousel" },
            { text: "Checkbox 複選框", link: "/components/checkbox" },
            { text: "Chip 標籤", link: "/components/chip" },
            { text: "CodeEditor 代碼編輯器", link: "/components/code-editor" },
            { text: "Collapsible 折疊面板", link: "/components/collapsible" },
            {
              text: "ConfigProvider 配置提供者",
              link: "/components/config-provider",
            },
            { text: "Divider 分隔線", link: "/components/divider" },
            { text: "Tag 標籤", link: "/components/tag" },
            { text: "ContextMenu 右鍵選單", link: "/components/context-menu" },
            {
              text: "FlexContainer 彈性容器",
              link: "/components/flex-container",
            },
            { text: "Input 輸入框", link: "/components/input" },
            { text: "Textarea 多行文字輸入框", link: "/components/textarea" },
            { text: "Select 選擇器", link: "/components/select" },
            { text: "Switch 開關", link: "/components/switch" },
            { text: "Spin 加載中", link: "/components/spin" },
            { text: "ScrollArea 滾動區域", link: "/components/scroll-area" },
            {
              text: "BorderContainer 邊框容器",
              link: "/components/border-container",
            },
            { text: "Dialog 對話框", link: "/components/dialog" },
            { text: "Popover 彈出框", link: "/components/popover" },
            { text: "Tooltip 工具提示", link: "/components/tooltip" },
            { text: "MessageBox 訊息盒", link: "/components/message-box" },
            {
              text: "EditableArea 可編輯區域",
              link: "/components/editable-area",
            },
            {
              text: "Notification 通知",
              link: "/components/notification",
            },
            {
              text: "MentionableTextArea 可提及文本域",
              link: "/components/mentionable-textarea",
            },
            { text: "Progress 進度條", link: "/components/progress" },
            { text: "Pagination 分頁", link: "/components/pagination" },
            { text: "Radio 單選框", link: "/components/radio" },
            { text: "Slider 滑桿", link: "/components/slider" },
            { text: "Splitter 分割器", link: "/components/splitter" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/proladon/shelter-ui" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present",
    },
  },
  vite: {
    plugins: [UnoCSS()],
    ssr: {
      noExternal: ["unocss"],
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../src"),
      },
    },
  },
})
