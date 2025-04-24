# Input 輸入框

輸入框用於接收用戶輸入的文本信息。

## 基本用法

使用 `v-model` 進行雙向綁定。

```vue
<template>
  <s-input v-model="input" placeholder="請輸入內容" />
  <div class="mt-2">輸入的內容：{{ input }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
</script>
```

## 禁用狀態

使用 `disabled` 屬性禁用輸入框。

```vue
<template>
  <s-input v-model="input" disabled placeholder="禁用狀態" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
</script>
```

## 不同尺寸

使用 `size` 屬性設置不同的輸入框尺寸。

```vue
<template>
  <div class="flex flex-col gap-4">
    <s-input v-model="input1" size="small" placeholder="小尺寸" />
    <s-input v-model="input2" placeholder="默認尺寸" />
    <s-input v-model="input3" size="large" placeholder="大尺寸" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>
```

## 不同類型

使用 `type` 屬性設置不同的輸入框類型。

```vue
<template>
  <div class="flex flex-col gap-4">
    <s-input v-model="text" placeholder="文本輸入框" />
    <s-input v-model="password" type="password" placeholder="密碼輸入框" />
    <s-input v-model="number" type="number" placeholder="數字輸入框" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const password = ref('')
const number = ref('')
</script>
```

## 事件處理

監聽輸入框的 `focus` 和 `blur` 事件。

```vue
<template>
  <s-input 
    v-model="input" 
    placeholder="請輸入內容" 
    @focus="handleFocus" 
    @blur="handleBlur" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')

const handleFocus = (event: FocusEvent) => {
  console.log('輸入框獲得焦點', event)
}

const handleBlur = (event: FocusEvent) => {
  console.log('輸入框失去焦點', event)
}
</script>
```

## 可清除的輸入框

使用 `clearable` 屬性可以添加清除按鈕。

```vue
<template>
  <s-input v-model="input" clearable placeholder="可清除的輸入框" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
</script>
```

## 前綴和後綴

使用 `prefix` 和 `suffix` 插槽添加前綴和後綴內容。

```vue
<template>
  <div class="flex flex-col gap-4">
    <s-input v-model="input1" placeholder="帶前綴的輸入框">
      <template #prefix>@</template>
    </s-input>
    <s-input v-model="input2" placeholder="帶後綴的輸入框">
      <template #suffix>.com</template>
    </s-input>
    <s-input v-model="input3" clearable placeholder="帶後綴和清除按鈕的輸入框">
      <template #suffix>kg</template>
    </s-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>
```

## API

### 屬性

| 屬性名 | 說明 | 類型 | 默認值 |
| --- | --- | --- | --- |
| modelValue | 綁定值 | `string` | `''` |
| type | 輸入框類型 | `string` | `'text'` |
| placeholder | 輸入框佔位文本 | `string` | `''` |
| size | 輸入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清除 | `boolean` | `false` |

### 事件

| 事件名 | 說明 | 回調參數 |
| --- | --- | --- |
| update:modelValue | 在輸入值變化時觸發 | `(value: string) => void` |
| focus | 在輸入框獲得焦點時觸發 | `(event: FocusEvent) => void` |
| blur | 在輸入框失去焦點時觸發 | `(event: FocusEvent) => void` |