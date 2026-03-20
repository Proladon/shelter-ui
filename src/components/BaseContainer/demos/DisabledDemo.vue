<template>
  <div class="flex flex-col gap-4">
    <h4>Disabled State</h4>
    <div class="grid grid-cols-2 gap-4">
      <SHBaseContainer disabled>
        <p>Disabled base container</p>
      </SHBaseContainer>

      <SHBaseContainer shadow disabled>
        <p>Disabled base container with shadow</p>
      </SHBaseContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing disabled state
</script>
