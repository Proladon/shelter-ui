<template>
  <div class="flex gap-3 flex-wrap">
    <!-- Danger (Delete) -->
    <AlertDialog
      v-model:open="dangerOpen"
      type="danger"
      title="確認刪除"
      description="此操作無法復原，刪除後資料將永久消失，確定要繼續嗎？"
      :confirmLoading="deleting"
      @confirm="handleDelete"
      @cancel="dangerOpen = false"
    >
      <template #trigger>
        <AlertDialogTrigger as-child>
          <Button type="danger">刪除項目</Button>
        </AlertDialogTrigger>
      </template>
    </AlertDialog>

    <!-- Warning -->
    <AlertDialog
      v-model:open="warningOpen"
      type="warning"
      title="注意"
      description="此操作將重置所有設定為預設值，確定要繼續嗎？"
      @confirm="warningOpen = false"
      @cancel="warningOpen = false"
    >
      <template #trigger>
        <AlertDialogTrigger as-child>
          <Button type="warning">重置設定</Button>
        </AlertDialogTrigger>
      </template>
    </AlertDialog>

    <!-- Info -->
    <AlertDialog
      v-model:open="infoOpen"
      type="info"
      title="提示"
      description="您即將離開目前頁面，未儲存的變更將會遺失。"
      confirmText="離開"
      @confirm="infoOpen = false"
      @cancel="infoOpen = false"
    >
      <template #trigger>
        <AlertDialogTrigger as-child>
          <Button type="primary">離開頁面</Button>
        </AlertDialogTrigger>
      </template>
    </AlertDialog>

    <!-- Success -->
    <AlertDialog
      v-model:open="successOpen"
      type="success"
      title="發布確認"
      description="確定要發布此版本？發布後將對所有用戶生效。"
      confirmText="發布"
      @confirm="successOpen = false"
      @cancel="successOpen = false"
    >
      <template #trigger>
        <AlertDialogTrigger as-child>
          <Button type="success">發布版本</Button>
        </AlertDialogTrigger>
      </template>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialogTrigger } from 'reka-ui'
import AlertDialog from '../index.vue'
import Button from '@/components/Button/index.vue'

const dangerOpen = ref(false)
const warningOpen = ref(false)
const infoOpen = ref(false)
const successOpen = ref(false)

const deleting = ref(false)

const handleDelete = async () => {
  deleting.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  deleting.value = false
  dangerOpen.value = false
}
</script>
