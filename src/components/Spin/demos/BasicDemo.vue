<template>
  <div class="flex flex-col gap-4">
    <div>
      <h4>基本用法</h4>
      <s-spin />
    </div>
    
    <div>
      <h4>不同尺寸</h4>
      <div class="flex items-center gap-4">
        <s-spin size="small" />
        <s-spin />
        <s-spin size="large" />
      </div>
    </div>
    
    <div>
      <h4>帶描述文字</h4>
      <s-spin description="加載中..." />
    </div>
    
    <div>
      <h4>自定義顏色</h4>
      <div class="flex items-center gap-4">
        <s-spin stroke="#1890ff" />
        <s-spin stroke="#52c41a" />
        <s-spin stroke="#faad14" />
        <s-spin stroke="#ff4d4f" />
      </div>
    </div>
    
    <div>
      <h4>包裹內容</h4>
      <s-spin :show="spinning">
        <div class="p-4 border rounded">
          <p>這是一段被包裹的內容</p>
          <p>點擊下方按鈕切換加載狀態</p>
          <s-button @click="toggleSpinning" class="mt-2">{{ spinning ? '停止加載' : '開始加載' }}</s-button>
        </div>
      </s-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(true)
const toggleSpinning = () => {
  spinning.value = !spinning.value
}
</script>