<template>
  <div class="demo-container">
    <s-chip label="動作" />
    <s-chip label="喜劇" />
    <s-chip label="懸疑" />
    <s-chip label="驚悚" removable />
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
