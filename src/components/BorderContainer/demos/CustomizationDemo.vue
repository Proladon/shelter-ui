<template>
  <div class="flex flex-col gap-4">
    <h4>Advanced Customization</h4>
    <div class="grid grid-cols-2 gap-4">
      <SHBorderContainer type="primary" shadow>
        <p>Border container with shadow effect</p>
      </SHBorderContainer>

      <SHBorderContainer type="success" transparent>
        <p>Border container with transparent background</p>
      </SHBorderContainer>

      <SHBorderContainer type="warning" :borderRadius="12">
        <p>Border container with custom border radius</p>
      </SHBorderContainer>

      <SHBorderContainer type="info" :borderWidth="3" :padding="8">
        <p>Border container with custom border width and padding</p>
      </SHBorderContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing advanced customization options
</script>
