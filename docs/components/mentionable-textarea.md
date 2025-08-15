# MentionableTextArea 可提及文本域

MentionableTextArea 是一個支持提及功能的多行文本輸入組件。用戶可以通過輸入特定的觸發字符（如 @、#、:）來觸發下拉選單，選擇用戶、議題或表情符號等內容。

## 基本用法

<Demo>
    <BasicDemo />
<template #code>

```vue
<template>
  <div class="space-y-4">
    <MentionableTextArea
      v-model="value"
      label="基本使用"
      placeholder="輸入 @, # 或 : 來觸發提及功能"
      :rows="4"
    />

    <div class="mt-4 p-3 bg-muted rounded">
      <h3 class="text-sm font-medium mb-2">當前值：</h3>
      <pre class="text-xs">{{ value }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MentionableTextArea from '../index.vue'

const value = ref('嘗試輸入 @user 或 #issue 或 :emoji')
</script>
```

</template>
</Demo>

## 自定義數據

<Demo>
    <CustomDataDemo />

<template #code>

```vue
<template>
  <div class="space-y-4">
    <MentionableTextArea
      v-model="value"
      label="自定義數據"
      placeholder="輸入 @ 來提及自定義用戶列表"
      :rows="4"
      :user-list="customUsers"
      :issue-list="customIssues"
      :emoji-list="customEmojis"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MentionableTextArea from '../index.vue'
import type { MentionItem } from '../types'

const value = ref('使用自定義數據：@')

const customUsers: MentionItem[] = [
  { value: '@張小明', listValue: '張小明 - 前端工程師' },
  { value: '@李小華', listValue: '李小華 - 後端工程師' },
  { value: '@王小美', listValue: '王小美 - UI/UX 設計師' },
  { value: '@陳小強', listValue: '陳小強 - 產品經理' },
]
</script>
```

</template>

</Demo>

## 事件處理

<Demo>
    <EventDemo />

<template #code>

```vue
<template>
  <div class="space-y-4">
    <MentionableTextArea
      v-model="value"
      label="事件處理"
      placeholder="監聽各種事件"
      :rows="4"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @mention="handleMention"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MentionableTextArea from '../index.vue'

const value = ref('')

function handleChange(newValue: string) {
  console.log('值改變:', newValue)
}

function handleMention(trigger: string, searchValue: string) {
  console.log('觸發提及:', { trigger, searchValue })
}
</script>
```

</template>

</Demo>

## 狀態控制

<Demo>
    <StateDemo />

<template #code>

```vue
<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-sm font-semibold mb-2">正常狀態</h3>
      <MentionableTextArea
        v-model="normalValue"
        placeholder="正常可編輯狀態"
        :rows="3"
      />
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2">禁用狀態</h3>
      <MentionableTextArea
        v-model="disabledValue"
        placeholder="禁用狀態"
        :rows="3"
        disabled
      />
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2">只讀狀態</h3>
      <MentionableTextArea
        v-model="readonlyValue"
        placeholder="只讀狀態"
        :rows="3"
        readonly
      />
    </div>
  </div>
</template>
```

</template>

</Demo>

## API

### 屬性

| 屬性名      | 說明               | 類型          | 默認值                  |
| ----------- | ------------------ | ------------- | ----------------------- |
| modelValue  | 綁定值             | string        | ''                      |
| placeholder | 占位符文本         | string        | '輸入 @, # 或 : 來提及' |
| rows        | 文本域行數         | number        | 5                       |
| disabled    | 是否禁用           | boolean       | false                   |
| readonly    | 是否只讀           | boolean       | false                   |
| triggers    | 觸發字符列表       | string[]      | ['@', '#', ':']         |
| userList    | 自定義用戶列表     | MentionItem[] | undefined               |
| issueList   | 自定義議題列表     | MentionItem[] | undefined               |
| emojiList   | 自定義表情符號列表 | MentionItem[] | undefined               |
| label       | 標籤文本           | string        | ''                      |
| class       | 自定義樣式類       | string        | ''                      |

### 事件 Events

| 事件名            | 說明               | 回調參數                               |
| ----------------- | ------------------ | -------------------------------------- |
| update:modelValue | v-model 雙向綁定   | (value: string)                        |
| change            | 值改變時觸發       | (value: string)                        |
| focus             | 獲得焦點時觸發     | (event: FocusEvent)                    |
| blur              | 失去焦點時觸發     | (event: FocusEvent)                    |
| mention           | 觸發提及功能時觸發 | (trigger: string, searchValue: string) |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/MentionableTextArea/demos/BasicDemo.vue'
import CustomDataDemo from '@/components/MentionableTextArea/demos/CustomDataDemo.vue'
import EventDemo from '@/components/MentionableTextArea/demos/EventDemo.vue'
import StateDemo from '@/components/MentionableTextArea/demos/StateDemo.vue'
</script>
