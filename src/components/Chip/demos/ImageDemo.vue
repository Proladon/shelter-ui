<template>
  <div class="demo-container">
    <s-chip
      label="Amy Elsner"
      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
    />
    <s-chip
      label="Asiya Javayant"
      image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
    />
    <s-chip
      label="Onyama Limba"
      image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
    />
    <s-chip
      label="Xuxue Feng"
      image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png"
      removable
    />
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
