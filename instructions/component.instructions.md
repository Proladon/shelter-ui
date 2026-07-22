---
applyTo: 'src/components/**/*'
description: 'src/components 中組件的定義、API 與結構規範（權威來源：IMPROVEMENT_PLAN.md 決策 D1–D7）'
---

# 組件定義與結構指南

此文件是 `src/components` 下所有組件的權威規範。規則已定案（見 `IMPROVEMENT_PLAN.md` 的 D1–D10），新組件開發與既有組件重構一律按此執行，不再重新討論。

> 這裡不重複 D7 樣式/token 的完整規則，只列出與組件開發直接相關的摘要；完整 token 用法見 `instructions/theming.instructions.md`。

## 資料夾結構（D6）

每個組件**必備**：

```
src/components/ComponentName/
  ├── index.ts        # barrel：匯出組件（SH 前綴名）與所有 public types
  ├── index.vue        # 主實作（多組件資料夾可用 ComponentName.vue + index.ts 聚合，如 Radio/RadioGroup）
  ├── types.ts        # Props / Emits / Slots / Expose
  └── demos/          # 文檔範例，命名 XxxDemo.vue（見 docs/WRITING_GUIDE.md）
```

- `index.ts` barrel 一律匯出 **SH 前綴名**（如 `SHRadioGroup`），根目錄 `src/index.ts` 只做 re-export，不再做 import 改名。
- 共用邏輯不要複製貼上：跨元件共用的邏輯放 `src/composables/`（如 `useComponentSize`）或 `src/utils/`（如 `resolveTypeVar`、`statusIconMap`）。

## 命名規範

| 對象           | 規則                                              | 範例                    |
| -------------- | ------------------------------------------------- | ----------------------- |
| 組件資料夾     | PascalCase                                        | `Button`、`ActiveButtonGroup` |
| 組件註冊名     | `SH` 前綴                                          | `SHButton`               |
| Props 介面     | `ComponentNameProps`                              | `ButtonProps`            |
| Emits 介面     | `ComponentNameEmits`                              | `ButtonEmits`            |
| Slots 介面     | `ComponentNameSlots`（有 slot 才需要）             | `ButtonSlots`            |
| Demo 檔案      | `XxxDemo.vue`                                     | `BasicDemo.vue`          |

引號一律 single quote（遵守 Prettier 設定）；import 規則：同資料夾內引用用相對路徑（`./types`），跨資料夾一律 `@/` alias（`@/components/Calendar`），不要用多層 `../../`。

## D1. Size 尺寸

- 統一為 `'small' | 'medium' | 'large'`，**預設 `'medium'`**（不是 `'default'`）。
- 所有互動型組件**必須**提供 `size` prop：Button、Input、Textarea、Select、NumberInput、Switch、Checkbox、Radio、DatePicker、TimePicker、Pagination、PinInput、Slider、Tag、UploadZone。
- 純數字尺寸僅用於圖形類（Badge 字級、Spin/Spinner 直徑），維持 `size?: number`，但要在 types.ts 用註解說明單位（如 `/** 直徑，單位 px */`）。

## D2. 語意色（semantic type）

- prop 名統一為 **`type`**，值統一為 `'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'`。
- **`color` 保留給自由色值**（`string`，接受 hex/css color），只用在 Progress、Badge、Divider、Splitter 這類本來就需要任意色的組件；不要把 `type` 和 `color` 混用在同一個語意色概念上。
- `type` 不得承載非語意色意義。文字按鈕等樣式修飾一律用獨立的 boolean prop（`text` / `ghost` / `dashed` / `outline`），不要塞進 `type` 的 union（例如不可有 `type: 'text'`）。這些 boolean 修飾同時為 true 時的優先序：`text > ghost > dashed > outline > 實心`。
- 若組件已有其他語意用途的 `type`（如捲軸行為、面板模式），改名避開撞名（例如 ScrollArea 的捲軸 `type` 改叫 `visibility`），不要讓 `type` 身兼二義。

## D3. v-model — 一律 `defineModel`

- 主值 v-model 一律 `value` / `update:value`，**實作一律用 `defineModel<T>('value')`**，不要手寫 `props.value` + `emit('update:value', ...)`。
- 次要狀態可以有自己的具名 model（例如面板開合 `v-model:open`），同樣用 `defineModel<boolean>('open')` 實作，但**主值永遠是 `value`**，不要為了語意清楚就把主值改名。
- **`defineModel` 與 `types.ts` 的相處方式**（非顯而易見，务必遵守）：`XxxProps` 介面仍要包含 `value`（供文件/`components-catalog.json`/IDE 提示閱讀），但 `defineProps` 呼叫要用 `Omit` 排除它，否則會與 `defineModel` 產生重複宣告：

  ```ts
  // ✅ 正確
  const props = withDefaults(defineProps<Omit<ExampleProps, 'value'>>(), {
    size: 'medium',
  })
  const value = defineModel<string>('value', { default: '' })

  // ❌ 錯誤：value 同時被 defineProps 和 defineModel 宣告
  const props = withDefaults(defineProps<ExampleProps>(), { value: '' })
  const value = defineModel<string>('value')
  ```

## D4. 事件（Events）

- `change` 一律帶**值**，不帶原生 `Event`。需要原生事件時另開 `focus` / `blur` / `click`，payload 是原生事件物件。
- 表單類組件標配 `focus`、`blur` 事件。
- Emits 型別一律用 **named-tuple 語法**，不要用 call-signature：

  ```ts
  // ✅ 正確
  export interface ExampleEmits {
    change: [value: string]
    focus: [e: FocusEvent]
    blur: [e: FocusEvent]
  }

  // ❌ 錯誤（call-signature，已淘汰）
  export interface ExampleEmits {
    (e: 'change', value: string): void
  }
  ```

- 原生事件的 emit 參數名一律叫 `e`，不要叫 `event`、`focusEvent`、`blurEvent` 等。

## D5. 通用 props 矩陣

新組件（或修改既有組件時）對照下表補齊適用的 prop，不要漏掉：

| prop | 適用範圍 | 備註 |
| --- | --- | --- |
| `disabled` | 所有互動組件 | |
| `loading` | 有非同步主要動作的組件（Button、Select、Switch、StatusTag、確認類對話框） | 統一叫 `loading`，不要叫 `confirmLoading`/`submitLoading` 等變體 |
| `readonly` | 所有輸入類 | |
| `clearable` | 可清空的輸入類（Input、Select、NumberInput、DatePicker、TimePicker、Textarea） | 要有對應的 `clear` 事件 |
| `placeholder` | 文字輸入類 | 遮罩字元、佔位日期等其他語意不要也叫 `placeholder`，另外取名（如 PinInput 的遮罩字元叫 `mask`） |
| `block` | 需要撐滿容器寬度的組件（Button、Select 等） | 不要叫 `fullWidth` |
| `bordered` / `rounded` | 外觀類 | 拼字是 `bordered`，不是 `borderd` |

## D6. 元件內部結構

- Props 一律 `withDefaults(defineProps<XxxProps>(), {...})`，型別從 `types.ts` 匯入，**禁止在 `index.vue` 內 inline 重複宣告**同樣的 props 型別。
- 有定義 `XxxSlots` 就必須用 `defineSlots<XxxSlots>()` 接上，不要讓 slot 只存在於 template 卻沒有型別定義。
- 跨組件共用的狀態（例如 Tab 群組的當前選中值、Provider 的設定）一律用 `InjectionKey<T>` + 該組件資料夾內的 `context.ts`，**不要用魔法字串 `provide('someKey', ...)`**。

## 完整範例

### `src/components/Example/types.ts`

```typescript
export interface ExampleProps {
  /** 主要值（v-model:value） */
  value?: string
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
}

export interface ExampleEmits {
  change: [value: string]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
}

export interface ExampleSlots {
  default?: (props: Record<string, never>) => any
  icon?: (props: Record<string, never>) => any
}
```

### `src/components/Example/index.vue`

```vue
<script setup lang="ts">
import type { ExampleProps, ExampleEmits, ExampleSlots } from './types'

defineOptions({ name: 'SHExample' })

const props = withDefaults(defineProps<Omit<ExampleProps, 'value'>>(), {
  size: 'medium',
  type: 'default',
  disabled: false,
  readonly: false,
})

const value = defineModel<string>('value', { default: '' })
const emit = defineEmits<ExampleEmits>()
defineSlots<ExampleSlots>()

const handleBlur = (e: FocusEvent) => {
  emit('blur', e)
  emit('change', value.value)
}
</script>

<template>
  <div
    class="sh-example"
    :class="[
      `sh-example--${size}`,
      `sh-example--${type}`,
      { 'sh-example--disabled': disabled },
    ]"
  >
    <slot name="icon" />
    <input
      v-model="value"
      class="sh-example__input"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      @focus="emit('focus', $event)"
      @blur="handleBlur"
    />
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.sh-example {
  @apply flex items-center gap-2 border border-solid border-border.base;
  @apply rounded-[length:var(--sh-radius-md)];
  &:focus-within {
    box-shadow: var(--sh-focus-ring);
  }
}
</style>
```

### `src/components/Example/index.ts`

```typescript
import SHExample from './index.vue'

export * from './types'
export { SHExample }
export default SHExample
```

新增組件後，記得依照 `instructions/cmpExport.instructions.md` 的 checklist 把它接進根目錄 `src/index.ts`、`components-catalog.json` 與 docs。
