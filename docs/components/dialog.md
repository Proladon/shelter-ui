# Dialog 对话框

对话框组件用于在不离开当前页面的情况下与用户进行交互。

## 基础用法

基础的对话框，用于展示内容和收集用户输入。

<SHConfigProvider>
    <BasicDemo />
</SHConfigProvider>

## API

### 属性

| 属性名      | 说明                             | 类型                                                                     | 默认值      |
| ----------- | -------------------------------- | ------------------------------------------------------------------------ | ----------- |
| type         | 对话框类型                       | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| width        | 对话框宽度                       | `string \| number`                                                       | `400`       |
| value        | 控制对话框是否打开               | `boolean`                                                                | `undefined` |
| defaultValue | 对话框默认是否打开               | `boolean`                                                                | `undefined` |
| modal        | 是否为模态对话框                 | `boolean`                                                                | `true`      |
| title        | 对话框标题（也可通过 slot 设置） | `string`                                                                 | `undefined` |
| contentClass | 对话框内容区域的额外 class（常用于子组件覆盖内部布局） | `string \| string[] \| Record<string, boolean>`            | `undefined` |
| hideClose    | 是否隐藏默认的关闭按钮           | `boolean`                                                                | `false`     |

### 事件

| 事件名       | 说明                         | 类型                       |
| ------------ | ---------------------------- | -------------------------- |
| update:value | 当对话框的打开状态变化时触发 | `(value: boolean) => void` |

### 插槽

| 插槽名      | 说明                                | 参数                    |
| ----------- | ----------------------------------- | ----------------------- |
| trigger     | 用于触发对话框打开的元素            | `{ Dialog: Component }` |
| title       | 对话框标题（优先级高于 title 属性） | -                        |
| description | 对话框描述                          | -                        |
| default     | 对话框内容                          | -                        |
| footer      | 对话框底部操作按钮区域              | -                        |

> `trigger` 插槽会通过 `Dialog` 作用域参数暴露底层 reka-ui 的 `DialogTrigger` 组件，方便自定义触发元素（例如 `<component :is="Dialog">...</component>`）。目前仓库内没有 demo 或其他组件实际使用此作用域参数，是否为刻意保留的公开 API 待确认。

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Dialog/demos/BasicDemo.vue'
</script>
