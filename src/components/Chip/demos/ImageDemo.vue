<template>
  <div class="demo-container">
    <SHChip
      label="Amy Elsner"
      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
    />
    <SHChip
      label="Asiya Javayant"
      image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
    />
    <SHChip
      label="Onyama Limba"
      image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
    />
    <SHChip
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
