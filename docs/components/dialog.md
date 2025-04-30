# Dialog 对话框

对话框组件用于在不离开当前页面的情况下与用户进行交互。

## 基础用法

基础的对话框，用于展示内容和收集用户输入。

<SConfigProvider>
    <BasicDemo />
</SConfigProvider>

## API

### 属性

| 属性名      | 说明                             | 类型                                                                     | 默认值      |
| ----------- | -------------------------------- | ------------------------------------------------------------------------ | ----------- |
| type        | 对话框类型                       | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| width       | 对话框宽度                       | `string \| number`                                                       | `400`       |
| open        | 控制对话框是否打开               | `boolean`                                                                | `undefined` |
| defaultOpen | 对话框默认是否打开               | `boolean`                                                                | `undefined` |
| modal       | 是否为模态对话框                 | `boolean`                                                                | `true`      |
| title       | 对话框标题（也可通过 slot 设置） | `string`                                                                 | `undefined` |

### 事件

| 事件名      | 说明                         | 类型                       |
| ----------- | ---------------------------- | -------------------------- |
| update:open | 当对话框的打开状态变化时触发 | `(value: boolean) => void` |
| openChange  | 当对话框的打开状态变化时触发 | `(value: boolean) => void` |

### 插槽

| 插槽名      | 说明                                |
| ----------- | ----------------------------------- |
| trigger     | 用于触发对话框打开的元素            |
| title       | 对话框标题（优先级高于 title 属性） |
| description | 对话框描述                          |
| default     | 对话框内容                          |
| footer      | 对话框底部操作按钮区域              |

<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/Dialog/demos/BasicDemo.vue'
</script>
