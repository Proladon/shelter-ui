<script setup lang="ts">
import ConfigProvider from '@/components/ConfigProvider/index.vue'
import ButtonBasicDemo from '@/components/Button/demos/BasicDemo.vue'
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
  <ConfigProvider>
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
        <sButton @click="toggleSpin">{{
          spinning ? '停止加載' : '開始加載'
        }}</sButton>
      </div>

      <div class="button-demo">
        <h2>Button 組件示例</h2>
        <ButtonBasicDemo />

        <h3>Loading 狀態</h3>
        <div class="button-loading-demo">
          <sButton :loading="true">Loading 按鈕</sButton>
          <sButton type="primary" :loading="true">Loading 按鈕</sButton>
          <sButton type="success" :loading="loadingState">{{
            loadingState ? '加載中...' : '點擊加載'
          }}</sButton>
          <sButton @click="toggleLoading">{{
            loadingState ? '停止加載' : '開始加載'
          }}</sButton>
        </div>
      </div>
    </div>
  </ConfigProvider>
</template>

<style scoped>

</style>
