<template>
  <div class="demo">
    <h3>Indeterminate Checkbox</h3>
    <div class="demo__content">
      <SHCheckbox v-model="parentChecked" label="Select All" />

      <div class="ml-6 mt-2 space-y-2">
        <SHCheckbox
          :model-value="children.includes('option1')"
          @update:model-value="(value) => updateChild('option1', value as boolean | 'indeterminate' | null)"
          label="Option 1"
        />
        <SHCheckbox
          :model-value="children.includes('option2')"
          @update:model-value="(value) => updateChild('option2', value as boolean | 'indeterminate' | null)"
          label="Option 2"
        />
        <SHCheckbox
          :model-value="children.includes('option3')"
          @update:model-value="(value) => updateChild('option3', value as boolean | 'indeterminate' | null)"
          label="Option 3"
        />
      </div>

      <p class="mt-4">
        Parent: {{ parentChecked }}<br />
        Children: {{ children }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import SHCheckbox from "../index.vue"

const children = ref<string[]>([])

const parentChecked = computed({
  get() {
    if (children.value.length === 0) {
      return false
    } else if (children.value.length === 3) {
      return true
    } else {
      return "indeterminate"
    }
  },
  set(value) {
    if (value === true) {
      children.value = ["option1", "option2", "option3"]
    } else {
      children.value = []
    }
  },
})

const updateChild = (
  option: string,
  checked: boolean | "indeterminate" | null
) => {
  const currentChildren = [...children.value]
  const index = currentChildren.indexOf(option)

  if (checked && index === -1) {
    currentChildren.push(option)
  } else if (!checked && index !== -1) {
    currentChildren.splice(index, 1)
  }

  children.value = currentChildren
}
</script>

<style scoped>
.demo {
  padding: 1rem;
}

.demo > * + * {
  margin-top: 1rem;
}

.demo__content {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.ml-6 {
  margin-left: 1.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>
