<template>
  <div class="flex flex-col gap-4">
    <h4>Shadow Effect</h4>
    <div class="grid grid-cols-2 gap-4">
      <SHBaseContainer shadow>
        <p>Base container with shadow effect</p>
      </SHBaseContainer>

      <SHBaseContainer :border-width="2" shadow>
        <p>Base container with thick border and shadow</p>
      </SHBaseContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing customization options
</script>
