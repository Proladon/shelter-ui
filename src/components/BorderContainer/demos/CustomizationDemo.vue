<template>
  <div class="flex flex-col gap-4">
    <h4>Advanced Customization</h4>
    <div class="grid grid-cols-2 gap-4">
      <s-border-container type="primary" shadow>
        <p>Border container with shadow effect</p>
      </s-border-container>

      <s-border-container type="success" transparent>
        <p>Border container with transparent background</p>
      </s-border-container>

      <s-border-container type="warning" :borderRadius="12">
        <p>Border container with custom border radius</p>
      </s-border-container>

      <s-border-container type="info" :borderWidth="3" :padding="8">
        <p>Border container with custom border width and padding</p>
      </s-border-container>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing advanced customization options
</script>
