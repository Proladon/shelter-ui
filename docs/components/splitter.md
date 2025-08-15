# Splitter 分割器

將版面分割為可調整大小區塊的組件。

## 基本用法

<Demo>
  <BasicDemo />
  <template #code>

    ```vue
    <template>
      <div class="demo-container">
        <h3>Splitter 基本示例</h3>

        <div class="demo-section">
          <h4>水平分割</h4>
          <div class="demo-wrapper">
            <Splitter direction="horizontal" class="h-64">
              <SplitterPanel :default-size="30" class="demo-panel">
                <div class="panel-content">
                  <h5>左側面板</h5>
                  <p>這是左側的內容區域</p>
                </div>
              </SplitterPanel>

              <SplitterResizeHandle />

              <SplitterPanel :default-size="70" class="demo-panel">
                <div class="panel-content">
                  <h5>右側面板</h5>
                  <p>這是右側的內容區域，可以通過拖拽中間的分割線來調整大小。</p>
                </div>
              </SplitterPanel>
            </Splitter>
          </div>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import {
      SHSplitter as Splitter,
      SHSplitterPanel as SplitterPanel,
      SHSplitterResizeHandle as SplitterResizeHandle
    } from '@proladon/shelter-ui'
    </script>
    ```

  </template>
</Demo>

## 水平分割

<Demo>
  <HorizontalDemo />
  <template #code>

    ```vue
    <template>
      <div class="demo-wrapper">
        <Splitter direction="horizontal" class="h-64">
          <SplitterPanel :default-size="30" class="demo-panel">...</SplitterPanel>
          <SplitterResizeHandle />
          <SplitterPanel :default-size="70" class="demo-panel">...</SplitterPanel>
        </Splitter>
      </div>
    </template>

    <script setup lang="ts">
    import { SHSplitter as Splitter, SHSplitterPanel as SplitterPanel, SHSplitterResizeHandle as SplitterResizeHandle } from '@proladon/shelter-ui'
    </script>
    ```

  </template>
</Demo>

## 垂直分割

<Demo>
  <VerticalDemo />
  <template #code>

    ```vue
    <template>
      <div class="demo-wrapper">
        <Splitter direction="vertical" class="h-64">
          <SplitterPanel :default-size="40" class="demo-panel">...</SplitterPanel>
          <SplitterResizeHandle />
          <SplitterPanel :default-size="60" class="demo-panel">...</SplitterPanel>
        </Splitter>
      </div>
    </template>

    <script setup lang="ts">
    import { SHSplitter as Splitter, SHSplitterPanel as SplitterPanel, SHSplitterResizeHandle as SplitterResizeHandle } from '@proladon/shelter-ui'
    </script>
    ```

  </template>
</Demo>

## 嵌套分割

<Demo>
  <NestedDemo />
  <template #code>

    ```vue
    <template>
      <div class="demo-wrapper">
        <Splitter direction="horizontal" class="h-64">...
          <SplitterPanel :default-size="70">
            <Splitter direction="vertical">...</Splitter>
          </SplitterPanel>
        </Splitter>
      </div>
    </template>

    <script setup lang="ts">
    import { SHSplitter as Splitter, SHSplitterPanel as SplitterPanel, SHSplitterResizeHandle as SplitterResizeHandle } from '@proladon/shelter-ui'
    </script>
    ```

  </template>
</Demo>

## 可收縮面板

<Demo>
  <CollapsibleDemo />
  <template #code>

    ```vue
    <template>
      <div class="demo-wrapper">
        <Splitter direction="horizontal" class="h-64">
          <SplitterPanel :default-size="30" :min-size="20" :collapsible="true" :collapsed-size="5">...</SplitterPanel>
          <SplitterResizeHandle />
          <SplitterPanel :default-size="70">...</SplitterPanel>
        </Splitter>
      </div>
    </template>

    <script setup lang="ts">
    import { SHSplitter as Splitter, SHSplitterPanel as SplitterPanel, SHSplitterResizeHandle as SplitterResizeHandle } from '@proladon/shelter-ui'
    </script>
    ```

  </template>
</Demo>

## 控制桿常亮

<Demo>
  <VisibleDemo />
  <template #code>

    ```vue
    <template>
      <Splitter direction="horizontal" class="h-32">
        <SplitterPanel :default-size="50">A</SplitterPanel>
        <SplitterResizeHandle :visable="true" />
        <SplitterPanel :default-size="50">B</SplitterPanel>
      </Splitter>
    </template>

    <script setup lang="ts">
    import { SHSplitter as Splitter, SHSplitterPanel as SplitterPanel, SHSplitterResizeHandle as SplitterResizeHandle } from '@proladon/shelter-ui'
    </script>
    ```

  </template>
</Demo>

## 控制桿顏色

<Demo>
  <ColorDemo />
  <template #code>

    ```vue
    <template>
      <Splitter direction="horizontal" class="h-32">
        <SplitterPanel :default-size="50">A</SplitterPanel>
        <SplitterResizeHandle color="#f97316" />
        <SplitterPanel :default-size="50">B</SplitterPanel>
      </Splitter>
    </template>

    <script setup lang="ts">
    import { SHSplitter as Splitter, SHSplitterPanel as SplitterPanel, SHSplitterResizeHandle as SplitterResizeHandle } from '@proladon/shelter-ui'
    </script>
    ```

  </template>
</Demo>

## API

### Splitter (SplitterGroup)

#### 屬性

| 屬性名           | 說明         | 類型                         | 默認值 |
| ---------------- | ------------ | ---------------------------- | ------ |
| direction        | 分割方向     | `'horizontal' \| 'vertical'` | 必填   |
| gap              | 面板間隙     | `number`                     | `0`    |
| color            | 分隔條顏色   | `string`                     | -      |
| autoSaveId       | 自動保存 ID  | `string \| null`             | `null` |
| keyboardResizeBy | 鍵盤調整步長 | `number`                     | `10`   |

#### 事件

| 事件名 | 說明               | 回調參數          |
| ------ | ------------------ | ----------------- |
| layout | 版面佈局變化時觸發 | `(val: number[])` |

### SplitterPanel

#### 屬性

| 屬性名        | 說明         | 類型                                        | 默認值      |
| ------------- | ------------ | ------------------------------------------- | ----------- |
| defaultSize   | 預設面板大小 | `number`                                    | -           |
| minSize       | 最小面板大小 | `number`                                    | `10`        |
| maxSize       | 最大面板大小 | `number`                                    | `100`       |
| collapsible   | 是否可收縮   | `boolean`                                   | `false`     |
| collapsedSize | 收縮時大小   | `number`                                    | -           |
| padding       | 面板內距     | `'none' \| 'small' \| 'default' \| 'large'` | `'default'` |

#### 事件

| 事件名   | 說明               | 回調參數                           |
| -------- | ------------------ | ---------------------------------- |
| collapse | 面板收縮時觸發     | `()`                               |
| expand   | 面板展開時觸發     | `()`                               |
| resize   | 面板大小變化時觸發 | `(size: number, prevSize: number)` |

### SplitterResizeHandle

#### 屬性

| 屬性名     | 說明             | 類型      | 默認值  |
| ---------- | ---------------- | --------- | ------- |
| visable    | 是否讓控制桿常亮 | `boolean` | `false` |
| color      | 控制桿顏色       | `string`  | -       |
| hoverColor | 滑鼠懸停顏色     | `string`  | -       |
| dragColor  | 拖拽時顏色       | `string`  | -       |
| disabled   | 是否禁用         | `boolean` | `false` |

#### 事件

| 事件名   | 說明               | 回調參數                |
| -------- | ------------------ | ----------------------- |
| dragging | 拖拽狀態變化時觸發 | `(isDragging: boolean)` |

### 插槽 Slots

| 插槽名  | 說明     |
| ------- | -------- |
| default | 面板內容 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Splitter/demos/Basic.vue'
import HorizontalDemo from '@/components/Splitter/demos/Horizontal.vue'
import VerticalDemo from '@/components/Splitter/demos/Vertical.vue'
import NestedDemo from '@/components/Splitter/demos/Nested.vue'
import CollapsibleDemo from '@/components/Splitter/demos/Collapsible.vue'
import VisibleDemo from '@/components/Splitter/demos/Visible.vue'
import ColorDemo from '@/components/Splitter/demos/Color.vue'
</script>
