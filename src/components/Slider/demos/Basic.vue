<template>
  <div class="demo-container">
    <h3>Slider 基本示例</h3>

    <div class="demo-section">
      <h4>基本滑桿</h4>
      <div class="mb-4">
        <span class="demo-label">值：{{ basicValue[0] }}</span>
        <Slider
          v-model="basicValue"
          :min="0"
          :max="100"
          :step="1"
          class="mt-2"
        />
      </div>
    </div>

    <div class="demo-section">
      <h4>範圍滑桿</h4>
      <div class="mb-4">
        <span class="demo-label"
          >值：{{ rangeValue[0] }} - {{ rangeValue[1] }}</span
        >
        <Slider
          v-model="rangeValue"
          :min="0"
          :max="100"
          :step="1"
          class="mt-2"
        />
      </div>
    </div>

    <div class="demo-section">
      <h4>不同尺寸</h4>
      <div class="space-y-4">
        <div>
          <span class="demo-label">小：</span>
          <Slider v-model="sizeValue" size="small" :min="0" :max="100" />
        </div>
        <div>
          <span class="demo-label">默認：</span>
          <Slider v-model="sizeValue" size="default" :min="0" :max="100" />
        </div>
        <div>
          <span class="demo-label">大：</span>
          <Slider v-model="sizeValue" size="large" :min="0" :max="100" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>不同顏色</h4>
      <div class="space-y-4">
        <div>
          <span class="demo-label">主要：</span>
          <Slider v-model="colorValue" color="primary" :min="0" :max="100" />
        </div>
        <div>
          <span class="demo-label">成功：</span>
          <Slider v-model="colorValue" color="success" :min="0" :max="100" />
        </div>
        <div>
          <span class="demo-label">警告：</span>
          <Slider v-model="colorValue" color="warning" :min="0" :max="100" />
        </div>
        <div>
          <span class="demo-label">危險：</span>
          <Slider v-model="colorValue" color="danger" :min="0" :max="100" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>帶提示框</h4>
      <div class="mb-4">
        <span class="demo-label">值：{{ tooltipValue[0] }}</span>
        <Slider
          v-model="tooltipValue"
          :show-tooltip="true"
          :format-tooltip="(value) => `${value}%`"
          :min="0"
          :max="100"
          class="mt-2"
        />
      </div>
    </div>

    <div class="demo-section">
      <h4>垂直滑桿</h4>
      <div class="flex items-center space-x-4">
        <span class="demo-label">值：{{ verticalValue[0] }}</span>
        <Slider
          v-model="verticalValue"
          orientation="vertical"
          :min="0"
          :max="100"
          class="h-48"
        />
      </div>
    </div>

    <div class="demo-section">
      <h4>帶標記</h4>
      <div class="mb-4">
        <span class="demo-label">值：{{ marksValue[0] }}</span>
        <Slider
          v-model="marksValue"
          :show-marks="true"
          :marks="marks"
          :min="0"
          :max="100"
          :step="25"
          class="mt-2 mb-8"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const basicValue = ref([50])
const rangeValue = ref([25, 75])
const sizeValue = ref([60])
const colorValue = ref([70])
const tooltipValue = ref([40])
const verticalValue = ref([80])
const marksValue = ref([50])

const marks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
}
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply p-6 space-y-6;
}

.demo-section {
  @apply space-y-3;
}

.demo-label {
  @apply text-sm text-gray-600 inline-block w-20;
}

.space-x-4 > * + * {
  @apply ml-4;
}

.space-y-4 > * + * {
  @apply mt-4;
}

.space-y-3 > * + * {
  @apply mt-3;
}

.space-y-6 > * + * {
  @apply mt-6;
}
</style>
