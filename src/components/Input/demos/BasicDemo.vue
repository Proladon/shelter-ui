<template>
  <div class="flex flex-col gap-2 w-64">
    <s-input v-model="inputValue" placeholder="請輸入內容"></s-input>
    <s-input type="password" placeholder="請輸入密碼"></s-input>
    <s-input disabled placeholder="禁用狀態"></s-input>
    <s-input clearable v-model="clearableValue" placeholder="可清除內容"></s-input>
    <s-input v-model="prefixValue" placeholder="帶前綴的輸入框">
      <template #prefix>@</template>
    </s-input>
    <s-input v-model="suffixValue" placeholder="帶後綴的輸入框">
      <template #suffix>.com</template>
    </s-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const clearableValue = ref('可清除的內容')
const prefixValue = ref('')
const suffixValue = ref('')
</script>