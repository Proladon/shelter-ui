<template>
  <div class="demo-container">
    <SHBadge value="5">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge value="New">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge :value="12">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge is-dot>
      <div class="demo-item"></div>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 24px;
  padding: 20px 0;
  justify-content: center;
}

.demo-item {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
