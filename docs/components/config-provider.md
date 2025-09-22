---
title: ConfigProvider 配置提供者
---

# ConfigProvider 配置提供者

ConfigProvider 是 Shelter UI 的全局配置組件，用於設置主題變數和樣式前綴。它通過 CSS 變數的方式為整個組件庫提供統一的主題配置。

## 基本用法

使用 ConfigProvider 包裹你的應用，可以為所有子組件提供統一的主題配置。

<Demo>
  <BasicDemo />

<template #code>
```vue
<template>
<SHConfigProvider :theme-config="customTheme">
<div class="config-demo">
<SHButton type="primary">主要按鈕</SHButton>
<SHButton type="secondary">次要按鈕</SHButton>
<SHInput placeholder="請輸入內容" />
<SHBadge :count="5">
<div class="badge-target">通知</div>
</SHBadge>
</div>
</SHConfigProvider>
</template>

    <script setup lang="ts">
    import type { ThemeVarsConfig } from 'shelter-ui'

    const customTheme: ThemeVarsConfig = {
      primary: '#1890ff',
      secondary: '#52c41a',
      bg: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
      },
      text: {
        base: '#333333',
        primary: '#1890ff',
      },
      border: {
        base: '#d9d9d9',
        primary: '#1890ff',
      },
      status: {
        info: '#1890ff',
        danger: '#ff4d4f',
        warning: '#faad14',
        success: '#52c41a',
      },
    }
    </script>
    ```

  </template>
</Demo>

## 自定義主題前綴

你可以通過 `themePrefix` 屬性自定義 CSS 變數的前綴。

<Demo>
  <PrefixDemo />

<template #code>
```vue
<template>
<SHConfigProvider theme-prefix="my-ui">
<div class="prefix-demo">
<SHButton type="primary">自定義前綴按鈕</SHButton>
<p>CSS 變數前綴已更改為 "my-ui"</p>
</div>
</SHConfigProvider>
</template>

    <script setup lang="ts">
    // 這樣會生成類似 --my-ui-primary 的 CSS 變數
    </script>
    ```

  </template>
</Demo>

## 主題配置說明

ConfigProvider 接受一個 `ThemeVarsConfig` 類型的主題配置對象，包含以下屬性：

### 主色調

- `primary`: 主要顏色，用於按鈕、鏈接等重要元素
- `secondary`: 次要顏色

### 背景色

- `bg.primary`: 主要背景色
- `bg.secondary`: 次要背景色

### 文字顏色

- `text.base`: 基礎文字顏色
- `text.primary`: 主要文字顏色

### 邊框顏色

- `border.base`: 基礎邊框顏色
- `border.primary`: 主要邊框顏色

### 狀態顏色

- `status.info`: 信息狀態顏色
- `status.danger`: 危險狀態顏色
- `status.warning`: 警告狀態顏色
- `status.success`: 成功狀態顏色

## 顏色變體

ConfigProvider 會自動為每個顏色生成以下變體：

- **原色**: 配置的原始顏色
- **變暗版本**: 自動生成的深色版本（後綴 `-darken`）
- **變亮版本**: 自動生成的淺色版本（後綴 `-lighten`）
- **透明版本**: 自動生成的半透明版本（後綴 `-fade`）

例如，如果配置了 `primary: '#1890ff'`，系統會自動生成：

- `--sh-primary`: #1890ff
- `--sh-primary-darken`: 深色版本
- `--sh-primary-lighten`: 淺色版本
- `--sh-primary-fade`: 半透明版本

## 在 UnoCSS 中使用

配置的主題變數會自動注入到 CSS 變數中，可以在 UnoCSS 類名中使用：

```html
<!-- 使用主題顏色 -->
<div class="bg-primary text-white">主要背景</div>
<div class="border border-primary">主要邊框</div>
<div class="text-danger">危險文字</div>

<!-- 使用顏色變體 -->
<div class="bg-primary-lighten">淺色背景</div>
<div class="text-primary-darken">深色文字</div>
```

## API

### 屬性

| 屬性名      | 說明              | 類型              | 默認值         |
| ----------- | ----------------- | ----------------- | -------------- |
| themeConfig | 主題配置對象      | `ThemeVarsConfig` | `defaultTheme` |
| themePrefix | 主題變數 CSS 前綴 | `string`          | `'sh'`         |

### 插槽 Slots

| 插槽名  | 說明           |
| ------- | -------------- |
| default | 需要配置的內容 |

## 使用建議

1. **全局配置**: 建議在應用的根組件處使用 ConfigProvider，為整個應用提供統一的主題配置。
2. **局部覆蓋**: 可以在應用的任何位置使用 ConfigProvider 來局部覆蓋主題配置。
3. **主題切換**: 通過動態改變 `themeConfig` 的值來實現主題切換功能。
4. **與設計系統整合**: 配合設計系統的顏色規範來配置主題變數。

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/ConfigProvider/demos/BasicDemo.vue'
import PrefixDemo from '@/components/ConfigProvider/demos/PrefixDemo.vue'
</script>
