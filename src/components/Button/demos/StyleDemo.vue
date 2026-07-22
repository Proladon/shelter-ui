<template>
  <div>
    <h4>Text 文字按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton text>Default</SHButton>
      <SHButton type="primary" text>Primary</SHButton>
      <SHButton type="success" text>Success</SHButton>
      <SHButton type="warning" text>Warning</SHButton>
      <SHButton type="danger" text>Danger</SHButton>
      <SHButton type="info" text>Info</SHButton>
    </div>

    <h4>Ghost 幽靈按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton ghost>Default</SHButton>
      <SHButton type="primary" ghost>Primary</SHButton>
      <SHButton type="success" ghost>Success</SHButton>
      <SHButton type="warning" ghost>Warning</SHButton>
      <SHButton type="danger" ghost>Danger</SHButton>
      <SHButton type="info" ghost>Info</SHButton>
    </div>

    <h4>Dashed 虛線按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton dashed>Default</SHButton>
      <SHButton type="primary" dashed>Primary</SHButton>
      <SHButton type="success" dashed>Success</SHButton>
      <SHButton type="warning" dashed>Warning</SHButton>
      <SHButton type="danger" dashed>Danger</SHButton>
      <SHButton type="info" dashed>Info</SHButton>
    </div>

    <h4>Outline 描邊按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton outline>Default</SHButton>
      <SHButton type="primary" outline>Primary</SHButton>
      <SHButton type="success" outline>Success</SHButton>
      <SHButton type="warning" outline>Warning</SHButton>
      <SHButton type="danger" outline>Danger</SHButton>
      <SHButton type="info" outline>Info</SHButton>
    </div>

    <h4>Bordered 帶邊框按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton bordered>Default</SHButton>
      <SHButton type="primary" bordered>Primary</SHButton>
      <SHButton type="success" bordered>Success</SHButton>
      <SHButton type="warning" bordered>Warning</SHButton>
      <SHButton type="danger" bordered>Danger</SHButton>
      <SHButton type="info" bordered>Info</SHButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for this demo
</script>
