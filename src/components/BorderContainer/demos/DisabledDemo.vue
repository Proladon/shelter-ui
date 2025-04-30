<template>
  <div class="flex flex-col gap-4">
    <h4>Disabled State</h4>
    <div class="grid grid-cols-2 gap-4">
      <s-border-container disabled>
        <p>Disabled border container with default styling</p>
      </s-border-container>

      <s-border-container type="primary" disabled>
        <p>Disabled border container with primary color</p>
      </s-border-container>

      <s-border-container type="success" shadow disabled>
        <p>Disabled border container with shadow</p>
      </s-border-container>

      <s-border-container type="warning" transparent disabled>
        <p>Disabled border container with transparent background</p>
      </s-border-container>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing disabled state
</script>
