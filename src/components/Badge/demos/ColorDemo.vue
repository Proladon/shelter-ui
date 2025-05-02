<template>
  <div class="demo-container">
    <s-badge value="8" color="#4CAF50" textColor="#ffffff">
      <div class="demo-item"></div>
    </s-badge>

    <s-badge value="7" color="#2196F3" textColor="#ffffff">
      <div class="demo-item"></div>
    </s-badge>

    <s-badge value="9" color="#FF9800" textColor="#ffffff">
      <div class="demo-item"></div>
    </s-badge>

    <s-badge is-dot color="#9C27B0">
      <div class="demo-item"></div>
    </s-badge>
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
