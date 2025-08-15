<template>
  <div class="demo-container">
    <h3>Progress 基本示例</h3>

    <BasicProgress />
    <Unknown />
    <Sizes />
    <TextPositions />
    <Variants />
    <CustomText />
    <Colors />
  </div>
</template>

<script setup lang="ts">
import Unknown from './Unknown.vue'
import Sizes from './Sizes.vue'
import TextPositions from './TextPositions.vue'
import Variants from './Variants.vue'
import CustomText from './CustomText.vue'
import Colors from './Colors.vue'
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply p-6 space-y-[50px];
}

.demo-label {
  @apply text-sm text-gray-600 inline-block w-20;
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
