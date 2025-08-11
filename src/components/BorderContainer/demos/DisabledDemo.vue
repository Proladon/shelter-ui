<template>
  <div class="flex flex-col gap-4">
    <h4>Disabled State</h4>
    <div class="grid grid-cols-2 gap-4">
      <SHBorderContainer disabled>
        <p>Disabled border container with default styling</p>
      </SHBorderContainer>

      <SHBorderContainer type="primary" disabled>
        <p>Disabled border container with primary color</p>
      </SHBorderContainer>

      <SHBorderContainer type="success" shadow disabled>
        <p>Disabled border container with shadow</p>
      </SHBorderContainer>

      <SHBorderContainer type="warning" transparent disabled>
        <p>Disabled border container with transparent background</p>
      </SHBorderContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing disabled state
</script>
