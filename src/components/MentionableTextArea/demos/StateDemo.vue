<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-sm font-semibold mb-2">正常狀態</h3>
      <MentionableTextArea
        v-model="normalValue"
        placeholder="正常可編輯狀態"
        :rows="3"
      />
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2">禁用狀態</h3>
      <MentionableTextArea
        v-model="disabledValue"
        placeholder="禁用狀態"
        :rows="3"
        disabled
      />
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2">只讀狀態</h3>
      <MentionableTextArea
        v-model="readonlyValue"
        placeholder="只讀狀態"
        :rows="3"
        readonly
      />
    </div>

    <div class="flex items-center gap-4">
      <label class="flex items-center gap-2">
        <input
          v-model="isDisabled"
          type="checkbox"
          class="rounded border-muted"
        />
        <span class="text-sm">禁用</span>
      </label>

      <label class="flex items-center gap-2">
        <input
          v-model="isReadonly"
          type="checkbox"
          class="rounded border-muted"
        />
        <span class="text-sm">只讀</span>
      </label>
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2">動態狀態控制</h3>
      <MentionableTextArea
        v-model="dynamicValue"
        placeholder="動態控制狀態"
        :rows="3"
        :disabled="isDisabled"
        :readonly="isReadonly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MentionableTextArea from '../index.vue'

const normalValue = ref('這是正常狀態，可以輸入 @user')
const disabledValue = ref('這是禁用狀態，無法編輯')
const readonlyValue = ref('這是只讀狀態，可以複製但不能編輯 @readonly')
const dynamicValue = ref('動態控制狀態 @dynamic')

const isDisabled = ref(false)
const isReadonly = ref(false)
</script>
