<template>
  <div class="demo-container">
    <h2>Basic Dialog</h2>
    <p>Click the buttons below to open dialogs with different types</p>

    <div class="button-group">
      <Button type="primary" @click="openDialog('primary')"
        >Primary Dialog</Button
      >
      <Button type="success" @click="openDialog('success')"
        >Success Dialog</Button
      >
      <Button type="warning" @click="openDialog('warning')"
        >Warning Dialog</Button
      >
      <Button type="danger" @click="openDialog('danger')">Danger Dialog</Button>
      <Button type="info" @click="openDialog('info')">Info Dialog</Button>
      <Button type="default" @click="openDialog('default')"
        >Default Dialog</Button
      >
    </div>

    <!-- Primary Dialog -->
    <Dialog
      v-model:open="dialogs.primary"
      type="primary"
      title="Primary Dialog (via prop)"
    >
      <template #description>
        This is a primary type dialog with blue accent colors.
      </template>

      <div class="form-fields">
        <div class="form-group">
          <label for="name">Name</label>
          <Input id="name" v-model="form.name" placeholder="Enter your name" />
        </div>
      </div>

      <template #footer>
        <Button type="default" @click="dialogs.primary = false">Cancel</Button>
        <Button type="primary" @click="handleSave('primary')"
          >Save Changes</Button
        >
      </template>
    </Dialog>

    <!-- Success Dialog -->
    <Dialog
      v-model:open="dialogs.success"
      type="success"
      title="Success Dialog"
    >
      <template #description>
        This is a success type dialog with green accent colors.
      </template>

      <div class="content-box">
        <p>Your operation completed successfully!</p>
      </div>

      <template #footer>
        <Button type="success" @click="dialogs.success = false">OK</Button>
      </template>
    </Dialog>

    <!-- Warning Dialog -->
    <Dialog
      v-model:open="dialogs.warning"
      type="warning"
      title="Warning Dialog"
    >
      <template #description>
        This is a warning type dialog with yellow accent colors.
      </template>

      <div class="content-box">
        <p>
          This action might have unexpected consequences. Are you sure you want
          to proceed?
        </p>
      </div>

      <template #footer>
        <Button type="default" @click="dialogs.warning = false">Cancel</Button>
        <Button type="warning" @click="handleSave('warning')">Proceed</Button>
      </template>
    </Dialog>

    <!-- Danger Dialog -->
    <Dialog v-model:open="dialogs.danger" type="danger" title="Danger Dialog">
      <template #description>
        This is a danger type dialog with red accent colors.
      </template>

      <div class="content-box">
        <p>
          This action cannot be undone. This will permanently delete your
          account.
        </p>
      </div>

      <template #footer>
        <Button type="default" @click="dialogs.danger = false">Cancel</Button>
        <Button type="danger" @click="handleSave('danger')"
          >Delete Account</Button
        >
      </template>
    </Dialog>

    <!-- Info Dialog -->
    <Dialog v-model:open="dialogs.info" type="info" title="Info Dialog">
      <template #description>
        This is an info type dialog with cyan accent colors.
      </template>

      <div class="content-box">
        <p>Did you know you can customize dialogs with different types?</p>
      </div>

      <template #footer>
        <Button type="info" @click="dialogs.info = false">Got it</Button>
      </template>
    </Dialog>

    <!-- Default Dialog -->
    <Dialog
      v-model:open="dialogs.default"
      type="default"
      title="Default Dialog"
    >
      <template #description>
        This is a default type dialog with neutral accent colors.
      </template>

      <div class="content-box">
        <p>This is a basic dialog with default styling.</p>
      </div>

      <template #footer>
        <Button type="default" @click="dialogs.default = false">Close</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import Button from '@/components/Button/index.vue'
import Input from '@/components/Input/index.vue'

const dialogs = reactive({
  primary: false,
  success: false,
  warning: false,
  danger: false,
  info: false,
  default: false,
})

const form = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
})

const openDialog = (type: keyof typeof dialogs) => {
  dialogs[type] = true
}

const handleSave = (type: keyof typeof dialogs) => {
  // Handle form submission
  console.log('Form submitted for type:', type)
  dialogs[type] = false
}
</script>

<style scoped>
.demo-container {
  @apply max-w-3xl mx-auto;
}

.button-group {
  @apply flex flex-wrap gap-3 mb-6;
}

.form-fields {
  @apply flex flex-col gap-4 mb-4;
}

.form-group {
  @apply flex flex-col gap-2;
}

.content-box {
  @apply bg-gray-100 p-4 rounded mb-4;
}

label {
  @apply font-medium;
}
</style>
