<template>
  <div class="narrow-container">
    <SHActiveButtonGroup v-model:value="activeTab" block>
      <SHActiveButtonItem value="all">All</SHActiveButtonItem>
      <SHActiveButtonItem value="active">Active</SHActiveButtonItem>
      <SHActiveButtonItem value="completed">Completed</SHActiveButtonItem>
    </SHActiveButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHActiveButtonGroup, SHActiveButtonItem } from '@/index'

const activeTab = ref('all')
</script>

<style scoped>
.narrow-container {
  /* Fixed (not max-) width: this container sits as a flex item in the docs
     <Demo> wrapper, which does not stretch its children — a max-width alone
     would let it shrink-wrap to the group's own content size, making the
     block effect invisible. */
  width: 280px;
  padding: 12px;
  border: 1px dashed var(--sh-border-base);
  border-radius: 6px;
}
</style>
