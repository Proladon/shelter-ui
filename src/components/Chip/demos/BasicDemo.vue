<template>
  <div class="demo-container">
    <SHChip label="動作" />
    <SHChip label="喜劇" />
    <SHChip label="懸疑" />
    <SHChip label="驚悚" removable />
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 12px;
  padding: 20px 0;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
