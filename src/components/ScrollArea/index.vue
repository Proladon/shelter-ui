<template>
  <ScrollAreaRoot
    ref="scrollAreaRoot"
    :type="type"
    :scroll-hide-delay="scrollHideDelay"
    :dir="dir"
    :class="rootClasses"
    :style="style"
  >
    <ScrollAreaViewport :class="viewportClasses">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar orientation="vertical" :class="scrollbarClasses">
      <ScrollAreaThumb :class="thumbClasses" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar orientation="horizontal" :class="scrollbarClasses">
      <ScrollAreaThumb :class="thumbClasses" />
    </ScrollAreaScrollbar>

    <ScrollAreaCorner :class="cornerClasses" />
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from 'reka-ui'
import type { ScrollAreaProps, ScrollAreaMethods } from './types'

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
  dir: 'ltr',
})

const scrollAreaRoot = ref<HTMLElement | null>(null)

// 樣式類別
const rootClasses = computed(() => ['sh-scroll-area', props.class])

const viewportClasses = computed(() => ['sh-scroll-viewport'])

const scrollbarClasses = computed(() => ['sh-scrollbar'])

const thumbClasses = computed(() => ['sh-scroll-thumb'])

const cornerClasses = computed(() => ['sh-scroll-corner'])

// 滾動方法
const scrollTop = () => {
  const viewportEl = scrollAreaRoot.value?.viewport
  if (viewportEl) {
    console.log(viewportEl)
    viewportEl.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const scrollTopLeft = () => {
  const viewportEl = scrollAreaRoot.value?.viewport
  if (viewportEl) {
    viewportEl.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

const scrollBottom = () => {
  const viewportEl = scrollAreaRoot.value?.viewport
  if (viewportEl) {
    const top = viewportEl.scrollHeight
    viewportEl.scrollTo({ top, behavior: 'smooth' })
  }
}

const scrollTo = (options: ScrollToOptions) => {
  const viewportEl = scrollAreaRoot.value?.viewport
  if (viewportEl) {
    viewportEl.scrollTo(options)
  }
}

const getViewport = () => scrollAreaRoot.value?.viewport

// 暴露給父組件的方法和屬性
defineExpose<ScrollAreaMethods>({
  scrollTop,
  scrollTopLeft,
  scrollBottom,
  scrollTo,
  getViewport,
})
</script>

<style lang="postcss">
.sh-scroll-area {
  @apply relative overflow-hidden;

  /* 確保滾動條在內容之上，不佔用布局空間 */
  & .sh-scrollbar {
    @apply absolute z-10 select-none touch-none;
    @apply bg-transparent transition-colors duration-150;

    &[data-orientation='vertical'] {
      @apply top-0 right-0 h-full w-2.5;
      @apply border-l border-l-transparent;
      @apply pl-px;
    }

    &[data-orientation='horizontal'] {
      @apply bottom-0 left-0 w-full h-2.5;
      @apply border-t border-t-transparent;
      @apply pt-px;
    }

    &:hover {
      @apply bg-gray-50 dark:bg-gray-900/20;
    }

    &[data-state='hidden'] {
      @apply opacity-0;
    }

    &[data-state='visible'] {
      @apply opacity-100;
    }
  }

  & .sh-scroll-thumb {
    @apply relative block rounded-full bg-gray-400/50;
    @apply transition-colors duration-150;
    @apply hover:bg-gray-400/70 active:bg-gray-400/90;

    &[data-state='hidden'] {
      @apply opacity-0;
    }

    &[data-state='visible'] {
      @apply opacity-100;
    }

    &::before {
      @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
      @apply w-full min-w-[44px] h-full min-h-[44px];
      content: '';
    }
  }

  & .sh-scroll-corner {
    @apply absolute bottom-0 right-0 w-2.5 h-2.5;
    @apply bg-gray-50 dark:bg-gray-900/20;
  }

  & .sh-scroll-viewport {
    @apply w-full h-full rounded-[inherit];
    /* 使用原生滾動以保持無障礙功能 */
  }
}

/* RTL 支援 */
.sh-scroll-area[dir='rtl'] {
  & .sh-scrollbar[data-orientation='vertical'] {
    @apply left-0 right-auto border-l-0 border-r border-r-transparent pr-px pl-0;
  }

  & .sh-scroll-corner {
    @apply left-0 right-auto;
  }
}

/* 主題變數 - 可透過 CSS 變數客製化 */
.sh-scroll-area {
  --scroll-thumb-color: theme('colors.gray.400');
  --scroll-thumb-hover-color: theme('colors.gray.500');
  --scroll-thumb-active-color: theme('colors.gray.600');
  --scroll-track-color: theme('colors.gray.100');

  .dark & {
    --scroll-thumb-color: theme('colors.gray.600');
    --scroll-thumb-hover-color: theme('colors.gray.500');
    --scroll-thumb-active-color: theme('colors.gray.400');
    --scroll-track-color: theme('colors.gray.800');
  }

  & .sh-scroll-thumb {
    background-color: var(--scroll-thumb-color);

    &:hover {
      background-color: var(--scroll-thumb-hover-color);
    }

    &:active {
      background-color: var(--scroll-thumb-active-color);
    }
  }

  & .sh-scrollbar:hover {
    background-color: var(--scroll-track-color);
  }
}
</style>
