<template>
  <div class="demo-container">
    <s-badge>
      <div class="demo-item"></div>
      <template #content>
        <div class="custom-content">
          <span class="custom-icon">!</span>
        </div>
      </template>
    </s-badge>

    <s-badge>
      <div class="demo-item"></div>
      <template #content>
        <span style="font-size: 10px">NEW</span>
      </template>
    </s-badge>

    <s-badge color="#8E44AD">
      <div class="demo-item"></div>
      <template #content>
        <span class="custom-emoji">🔥</span>
      </template>
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

.custom-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-icon {
  font-weight: bold;
}

.custom-emoji {
  font-size: 10px;
}
</style>
