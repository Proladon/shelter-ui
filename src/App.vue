<script setup lang="ts">
import sButton from '@/components/Button/index.vue'
import sSpin from '@/components/Spin/index.vue'
import { ref } from 'vue'

const spinning = ref(true)
const toggleSpin = () => {
  spinning.value = !spinning.value
}

const loadingState = ref(false)
const toggleLoading = () => {
  loadingState.value = !loadingState.value
}
</script>

<template>
  <div>
    <div class="spin-demo">
      <h2>Spin 組件示例</h2>
      <div class="spin-types">
        <sSpin size="small" />
        <sSpin />
        <sSpin size="large" />
        <sSpin description="加載中..." />
      </div>
      <div class="spin-container">
        <sSpin :show="spinning">
          <div class="spin-content">
            <p>這是一個包含內容的Spin組件示例</p>
            <p>當Spin處於活動狀態時，內容將被遮罩</p>
          </div>
        </sSpin>
      </div>
      <sButton @click="toggleSpin">{{ spinning ? '停止加載' : '開始加載' }}</sButton>
    </div>
    
    <div class="button-demo">
      <h2>Button 組件示例</h2>
      <div class="button-types">
        <sButton>默認按鈕</sButton>
        <sButton type="plain">Plain 按鈕</sButton>
        <sButton type="text">Text 按鈕</sButton>
        <sButton type="dashed">Dashed 按鈕</sButton>
      </div>
      
      <h3>Loading 狀態</h3>
      <div class="button-loading-demo">
        <sButton :loading="true">Loading 按鈕</sButton>
        <sButton type="primary" :loading="true">Loading 按鈕</sButton>
        <sButton type="success" :loading="loadingState">{{ loadingState ? '加載中...' : '點擊加載' }}</sButton>
        <sButton @click="toggleLoading">{{ loadingState ? '停止加載' : '開始加載' }}</sButton>
      </div>
      
      <p class="text-[24px] text-red">csacsa</p>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.spin-demo {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.spin-types {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.spin-container {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 4px;
}

.spin-content {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.button-demo {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.button-demo h2 {
  margin-bottom: 16px;
}

.button-demo h3 {
  margin: 20px 0 12px;
}

.button-types,
.button-loading-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
