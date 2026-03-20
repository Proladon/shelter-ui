<template>
  <div class="flex flex-col gap-4">
    <h4>Size Variants</h4>
    <div class="grid grid-cols-2 gap-4">
      <SHBaseContainer>
        <p>Default size</p>
      </SHBaseContainer>

      <SHBaseContainer width="200px">
        <p>200px width</p>
      </SHBaseContainer>

      <SHBaseContainer height="120px">
        <p>120px height</p>
      </SHBaseContainer>

      <SHBaseContainer width="200px" height="120px">
        <p>200px × 120px</p>
      </SHBaseContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing different sizes
</script>
