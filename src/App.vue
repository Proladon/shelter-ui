<script setup lang="ts">
import ConfigProvider from '@/components/ConfigProvider/index.vue'
import ButtonBasicDemo from '@/components/Button/demos/BasicDemo.vue'
import sButton from '@/components/Button/index.vue'
import sSpin from '@/components/Spin/index.vue'
import SHMentionableTextArea from '@/components/MentionableTextArea/index.vue'
import { ref } from 'vue'

const spinning = ref(true)
const toggleSpin = () => {
  spinning.value = !spinning.value
}

const loadingState = ref(false)
const toggleLoading = () => {
  loadingState.value = !loadingState.value
}

const mentionValue = ref('嘗試輸入 @user 或 #issue 或 :emoji 來測試提及功能')
</script>

<template>
  <ConfigProvider>
    <div>
      <p class="text-[rgb(var(--sh-primary-darken))]">This is Text</p>
      <p class="text-[var(--sh-primary)]">This is Text</p>
      <p class="text-[rgb(var(--sh-primary-lighten))]">This is Text</p>


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

      <div class="mentionable-textarea-demo">
        <h2>MentionableTextArea 組件示例</h2>
        <SHMentionableTextArea
          v-model="mentionValue"
          label="可提及文本域"
          placeholder="輸入 @, # 或 : 來觸發提及功能"
          :rows="4"
        />
        <div class="mt-4 p-3 bg-gray-100 rounded">
          <h3 class="text-sm font-semibold mb-2">當前值：</h3>
          <pre class="text-xs whitespace-pre-wrap">{{ mentionValue }}</pre>
        </div>
      </div>
    </div>
  </ConfigProvider>
</template>

<style scoped>

</style>
