import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  title: 'Shelter UI',
  description: '基於Vue 3的UnoCSS組件庫',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '組件', link: '/components/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介紹', link: '/guide/' },
            { text: '快速開始', link: '/guide/getting-started' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基礎組件',
          items: [
            {
              text: 'ActiveButtonGroup 活動按鈕組',
              link: '/components/active-button-group',
            },
            { text: 'Badge 徽章', link: '/components/badge' },
            { text: 'Button 按鈕', link: '/components/button' },
            { text: 'Input 輸入框', link: '/components/input' },
            { text: 'Select 選擇器', link: '/components/select' },
            { text: 'Switch 開關', link: '/components/switch' },
            { text: 'Spin 加載中', link: '/components/spin' },
            {
              text: 'BorderContainer 邊框容器',
              link: '/components/border-container',
            },
            { text: 'Dialog 對話框', link: '/components/dialog' },
            { text: 'Popover 彈出框', link: '/components/popover' },
            { text: 'Tooltip 工具提示', link: '/components/tooltip' },
            { text: 'MessageBox 訊息盒', link: '/components/message-box' },
            {
              text: 'EditableArea 可編輯區域',
              link: '/components/editable-area',
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/shelter-ui' },
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
  },
})
