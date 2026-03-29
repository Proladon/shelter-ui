# Shelter UI

Shelter UI 是一套基於 **Vue 3** 的輕量級 UI 組件庫，以 **UnoCSS** 驅動樣式系統，並提供完整的 **TypeScript** 支援。涵蓋 40+ 個高品質組件，從基礎表單元素到複雜的業務組件，滿足各種開發場景的需求。

## 核心特性

| 特性           | 說明                                                               |
| -------------- | ------------------------------------------------------------------ |
| **Vue 3**      | 基於 Composition API 與 `<script setup>` 構建，完整支援 Vue 3 生態 |
| **TypeScript** | 每個組件均附帶完整型別定義，享受一流的型別推導體驗                 |
| **UnoCSS**     | 原子化 CSS 引擎驅動，極小的運行時開銷且高度可定制                  |
| **按需引入**   | Tree-shaking 友好，僅打包實際使用的組件，保持最小 bundle 體積      |
| **主題系統**   | 透過 `ConfigProvider` 靈活覆蓋設計 Token，快速適配品牌風格         |

## 組件總覽

Shelter UI 目前提供以下組件：

**表單**
`Input` · `Textarea` · `NumberInput` · `PinInput` · `Select` · `Checkbox` · `Radio` · `Switch` · `Slider` · `DatePicker` · `TimePicker` · `InputGroup`

**反饋**
`Dialog` · `AlertDialog` · `MessageBox` · `Notification` · `Tooltip` · `Popover` · `Spin` · `Progress`

**導航 / 佈局**
`Pagination` · `Collapsible` · `Splitter` · `ScrollArea` · `FlexContainer` · `BaseContainer` · `EditableContainer` · `BlockArea`

**數據展示**
`Badge` · `Tag` · `StatusTag` · `Chip` · `Carousel` · `Calendar` · `ChatMessage` · `MentionableTextarea`

**其他**
`Button` · `ActiveButtonGroup` · `Divider` · `ContextMenu` · `FileUpload` · `ConfigProvider`

## 設計原則

- **一致性**：統一的視覺語言與互動模式，降低使用者的學習成本
- **可定制**：豐富的主題 Token 與 Variant 配置，輕鬆匹配不同設計需求
- **易用性**：直覺的 Props API 設計，減少樣板程式碼
- **可擴展**：模組化架構，方便二次封裝與功能延伸

## 瀏覽器支援

支援所有現代瀏覽器（Chrome、Firefox、Safari、Edge）。

## 授權

MIT License © [Proladon](https://github.com/proladon)
