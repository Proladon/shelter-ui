<template>
  <CollapsibleRoot
    v-bind="rootProps"
    class="sh-collapsible"
    :class="[`sh-collapsible--${variant}`, `sh-collapsible--${size}`]"
  >
    <div
      class="sh-collapsible__header"
      :class="[headerClass, `sh-collapsible__header--${triggerPosition}`]"
    >
      <slot name="header">
        <CollapsibleTrigger
          class="sh-collapsible__trigger"
          :class="`sh-collapsible__trigger--${variant}`"
        >
          <slot name="trigger">
            <div class="sh-collapsible__trigger-content">
              <span class="sh-collapsible__trigger-text">點擊展開/收合</span>
              <IconChevronDown
                class="sh-collapsible__trigger-icon"
                :size="16"
              />
            </div>
          </slot>
        </CollapsibleTrigger>
      </slot>
    </div>

    <CollapsibleContent
      class="sh-collapsible__content"
      :class="[contentClass, `sh-collapsible__content--${variant}`]"
    >
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
  size: 'default',
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

.sh-collapsible__trigger-content {
  @apply flex items-center justify-between w-full;
}

.sh-collapsible__trigger-text {
  @apply font-medium;
}

.sh-collapsible__trigger-icon {
  @apply transition-transform duration-200 ease-in-out;
}

.sh-collapsible[data-state='open'] .sh-collapsible__trigger-icon {
  @apply rotate-180;
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

/* 變體樣式 */
.sh-collapsible--default {
  .sh-collapsible__trigger {
    @apply p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50;
  }

  .sh-collapsible__content-inner {
    @apply p-3 border-l border-r border-b border-gray-200 rounded-b-lg bg-white;
  }
}

.sh-collapsible--card {
  @apply rounded-lg border border-gray-200 bg-white shadow-sm;

  .sh-collapsible__trigger {
    @apply p-4 hover:bg-gray-50;
  }

  .sh-collapsible__content-inner {
    @apply p-4 border-t border-gray-200;
  }
}

.sh-collapsible--ghost {
  .sh-collapsible__trigger {
    @apply p-2 rounded hover:bg-gray-100;
  }

  .sh-collapsible__content-inner {
    @apply p-2;
  }
}

/* 尺寸變化 */
.sh-collapsible--small {
  .sh-collapsible__trigger {
    @apply text-sm;
  }

  .sh-collapsible__trigger-content {
    @apply gap-2;
  }
}

.sh-collapsible--default {
  .sh-collapsible__trigger-content {
    @apply gap-3;
  }
}

.sh-collapsible--large {
  .sh-collapsible__trigger {
    @apply text-lg;
  }

  .sh-collapsible__trigger-content {
    @apply gap-4;
  }
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
.sh-collapsible__trigger:focus-visible {
  @apply ring-2 ring-blue-500 ring-offset-2;
}
</style>
