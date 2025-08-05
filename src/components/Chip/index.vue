<template>
  <div
    v-if="visible"
    class="s-chip"
    :tabindex="removable ? 0 : undefined"
    @keydown="onKeyDown"
  >
    <!-- 圖片 -->
    <img v-if="image" :src="image" class="s-chip__image" alt="" />

    <!-- 圖示插槽或圖示組件 -->
    <slot name="icon">
      <component v-if="icon" :is="icon" class="s-chip__icon" />
    </slot>

    <!-- 標籤文字或預設插槽 -->
    <slot name="default">
      <span v-if="label" class="s-chip__label">{{ label }}</span>
    </slot>

    <!-- 移除圖示 -->
    <slot
      v-if="removable"
      name="removeicon"
      :remove-callback="remove"
      :keydown-callback="onKeyDown"
    >
      <component
        :is="removeIcon || XIcon"
        class="s-chip__remove-icon"
        @click="remove"
        @keydown="onKeyDown"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { IconX } from "@tabler/icons-vue"
import type { ChipProps, ChipEmits } from "./types"

defineOptions({
  name: "SChip",
})

const props = withDefaults(defineProps<ChipProps>(), {
  label: "",
  image: "",
  removable: false,
})

const emit = defineEmits<ChipEmits>()

const visible = ref(true)
const XIcon = IconX

const remove = (event: Event) => {
  visible.value = false
  emit("remove", event)
  emit("removeicon", event)
}

const onKeyDown = (event: KeyboardEvent) => {
  if (props.removable && (event.key === "Backspace" || event.key === "Enter")) {
    remove(event)
  }
}
</script>

<style lang="postcss" scoped>
.s-chip {
  @apply inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200;
  background-color: rgba(227, 201, 170, 0.1); /* secondary.fade */
  color: #e3c9aa; /* text.primary */
  border: 1px solid transparent;
}

.s-chip:hover {
  @apply opacity-80;
}

.s-chip:focus {
  @apply outline-none;
  box-shadow: 0 0 0 2px rgba(227, 201, 170, 0.5);
}

.s-chip__image {
  @apply w-6 h-6 rounded-full object-cover;
}

.s-chip__icon {
  @apply w-4 h-4;
}

.s-chip__label {
  @apply flex-1;
}

.s-chip__remove-icon {
  @apply w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity;
}
</style>
