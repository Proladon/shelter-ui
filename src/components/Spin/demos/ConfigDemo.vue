<template>
  <div class="flex flex-col gap-4">
    <div>
      <h4>旋轉效果</h4>
      <div class="flex items-center gap-4">
        <s-spin :rotate="false" />
        <s-spin :rotate="true" />
      </div>
    </div>
    
    <div>
      <h4>延遲顯示</h4>
      <div class="flex flex-col gap-2">
        <p>延遲 1000ms 顯示加載狀態</p>
        <s-spin :delay="1000" :show="delayedSpinning">
          <div class="p-4 border rounded">
            <p>這是一段被包裹的內容</p>
            <p>點擊下方按鈕切換加載狀態，加載狀態會延遲顯示</p>
            <s-button @click="toggleDelayedSpinning" class="mt-2">{{ delayedSpinning ? '停止加載' : '開始加載' }}</s-button>
          </div>
        </s-spin>
      </div>
    </div>
    
    <div>
      <h4>自定義線條寬度</h4>
      <div class="flex items-center gap-4">
        <s-spin :stroke-width="1" />
        <s-spin :stroke-width="2" />
        <s-spin :stroke-width="4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const delayedSpinning = ref(false)
const toggleDelayedSpinning = () => {
  delayedSpinning.value = !delayedSpinning.value
}
</script>