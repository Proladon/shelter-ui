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

        <div class="demo-section">
          <h4>垂直分割</h4>
          <div class="demo-wrapper">
            <Splitter direction="vertical" class="h-64">
              <SplitterPanel :default-size="40" class="demo-panel">
                <div class="panel-content">
                  <h5>上方面板</h5>
                  <p>這是上方的內容區域</p>
                </div>
              </SplitterPanel>

              <SplitterResizeHandle />

              <SplitterPanel :default-size="60" class="demo-panel">
                <div class="panel-content">
                  <h5>下方面板</h5>
                  <p>這是下方的內容區域</p>
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

## API

### Splitter (SplitterGroup)

#### 屬性

| 屬性名           | 說明         | 類型                                | 默認值      |
| ---------------- | ------------ | ----------------------------------- | ----------- |
| direction        | 分割方向     | `'horizontal' \| 'vertical'`        | 必填        |
| variant          | 分割器變體   | `'default' \| 'bordered' \| 'card'` | `'default'` |
| gap              | 面板間隙     | `number`                            | `0`         |
| autoSaveId       | 自動保存 ID  | `string \| null`                    | `null`      |
| keyboardResizeBy | 鍵盤調整步長 | `number`                            | `10`        |

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
| variant       | 面板變體     | `'default' \| 'bordered' \| 'card'`         | `'default'` |
| padding       | 面板內距     | `'none' \| 'small' \| 'default' \| 'large'` | `'default'` |

#### 事件

| 事件名   | 說明               | 回調參數                           |
| -------- | ------------------ | ---------------------------------- |
| collapse | 面板收縮時觸發     | `()`                               |
| expand   | 面板展開時觸發     | `()`                               |
| resize   | 面板大小變化時觸發 | `(size: number, prevSize: number)` |

### SplitterResizeHandle

#### 屬性

| 屬性名     | 說明               | 類型                                  | 默認值      |
| ---------- | ------------------ | ------------------------------------- | ----------- |
| variant    | 控制桿變體         | `'default' \| 'thick' \| 'invisible'` | `'default'` |
| showHandle | 是否顯示拖拽指示器 | `boolean`                             | `true`      |
| disabled   | 是否禁用           | `boolean`                             | `false`     |

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
</script>
