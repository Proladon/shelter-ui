<template>
  <div class="flex flex-col gap-4">
    <h4>Border Widths</h4>
    <div class="grid grid-cols-2 gap-4">
      <s-border-container :borderWidth="1">
        <p>1px border width</p>
      </s-border-container>
      
      <s-border-container :borderWidth="2">
        <p>2px border width</p>
      </s-border-container>
      
      <s-border-container :borderWidth="3">
        <p>3px border width</p>
      </s-border-container>
      
      <s-border-container :borderWidth="4">
        <p>4px border width</p>
      </s-border-container>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo showcasing different border widths
</script>