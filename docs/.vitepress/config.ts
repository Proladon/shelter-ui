import { defineConfig } from 'vitepress'

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
            { text: 'Button 按鈕', link: '/components/button' },
            { text: 'Input 輸入框', link: '/components/input' },
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
    ssr: {
      noExternal: ['unocss'],
    },
  },
})