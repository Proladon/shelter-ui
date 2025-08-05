## Content Structrue Example

````
---
title: <Component Name>
---

## Description

## 基本用法

<Demo>
  <BasicDemo />

  <template #code>
    ```vue
    <template>
        <!-- code here -->
    </template>
    ```
  </template>
</Demo>


### 屬性

| 屬性名   | 說明               | 類型                                                                     | 默認值      |
| -------- | ------------------ | ------------------------------------------------------------------------ | ----------- |



### 事件 Events

| 事件名 | 說明           | 回調參數                      |
| ------ | -------------- | ----------------------------- |


### 插槽 Slots

| 插槽名  | 說明       |
| ------- | ---------- |


<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/<Component Name>/demos/BasicDemo.vue'
import XXXDemo from '@/components/<Component Name>/demos/XXXDemo.vue'
...
</script>
````

## Example files

- `docs/components/button.md`
