<template>
  <div class="demo-section">
    <SHBorderContainer>
      <Collapsible variant="card" v-model:open="nestedOpen1">
        <template #trigger>
          <span>第一層折疊面板</span>
        </template>
        <div class="demo-content">
          <p class="mb-4">這是第一層的內容。</p>

          <SHBorderContainer>
            <Collapsible variant="default" v-model:open="nestedOpen2">
              <template #trigger>
                <span>第二層折疊面板</span>
              </template>
              <div class="demo-content">
                <p>這是嵌套在第一層內的第二層內容。</p>
              </div>
            </Collapsible>
          </SHBorderContainer>
        </div>
      </Collapsible>
    </SHBorderContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Collapsible from '../index.vue'

const nestedOpen1 = ref(false)
const nestedOpen2 = ref(false)
</script>

<style lang="postcss" scoped>
.demo-section {
  @apply space-y-3;
  width: 300px;
}

.mb-4 {
  @apply mb-4;
}
</style>
