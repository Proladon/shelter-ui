<template>
  <CollapsibleRoot v-bind="rootProps" class="sh-collapsible">
    <div
      class="sh-collapsible__header"
      :class="[headerClass, `sh-collapsible__header--${triggerPosition}`]"
    >
      <slot name="header">
        <CollapsibleTrigger class="sh-collapsible__trigger">
          <slot name="trigger" />
        </CollapsibleTrigger>
      </slot>
    </div>

    <CollapsibleContent class="sh-collapsible__content" :class="contentClass">
      <div class="sh-collapsible__content-inner">
        <slot />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<script setup lang="ts">
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  useForwardPropsEmits,
} from 'reka-ui'
import { IconChevronDown } from '@tabler/icons-vue'
import type { CollapsibleProps, CollapsibleEmits } from './types'

const props = withDefaults(defineProps<CollapsibleProps>(), {
  variant: 'default',
  triggerPosition: 'left',
  defaultOpen: false,
  unmountOnHide: true,
})

const emits = defineEmits<CollapsibleEmits>()

const rootProps = useForwardPropsEmits(props, emits)
</script>

<style lang="postcss">
.sh-collapsible {
  @apply w-full;
}

.sh-collapsible__header {
  @apply flex items-center;
}

.sh-collapsible__header--left {
  @apply justify-start;
}

.sh-collapsible__header--right {
  @apply justify-end;
}

.sh-collapsible__trigger {
  @apply w-full cursor-pointer outline-none focus:outline-none;
}

.sh-collapsible__content {
  @apply overflow-hidden;
}

.sh-collapsible__content[data-state='open'] {
  animation: sh-collapsible-slide-down 200ms ease-out;
}

.sh-collapsible__content[data-state='closed'] {
  animation: sh-collapsible-slide-up 200ms ease-out;
}

.sh-collapsible__content-inner {
  @apply w-full;
}

/* 動畫效果 */
@keyframes sh-collapsible-slide-down {
  from {
    height: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes sh-collapsible-slide-up {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: 0;
  }
}

/* 禁用狀態 */
.sh-collapsible[data-disabled] {
  @apply opacity-50;

  .sh-collapsible__trigger {
    @apply cursor-not-allowed;
  }
}

/* Focus 狀態 */
/* .sh-collapsible__trigger:focus-visible {
  @apply ring-2 ring-blue-500 ring-offset-2;
} */
</style>
