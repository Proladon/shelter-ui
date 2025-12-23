<template>
  <div class="demo-container">
    <SHBadge value="10" :offsetRight="10" :offsetTop="10">
      <div class="demo-item">Offset</div>
    </SHBadge>

    <SHBadge value="10" position="left" :offsetLeft="-5" :offsetTop="-5">
      <div class="demo-item">Offset</div>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 32px;
  padding: 20px 0;
  justify-content: center;
}

.demo-item {
  width: 60px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
}
</style>
