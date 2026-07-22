<template>
  <ScrollAreaRoot
    ref="scrollAreaRoot"
    :type="visibility"
    :scroll-hide-delay="scrollHideDelay"
    :dir="dir"
    :class="rootClasses"
    :style="style"
  >
    <ScrollAreaViewport :class="viewportClasses">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      v-if="scrollY"
      orientation="vertical"
      :class="scrollbarClasses"
    >
      <ScrollAreaThumb :class="thumbClasses" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar
      v-if="scrollX"
      orientation="horizontal"
      :class="scrollbarClasses"
    >
      <ScrollAreaThumb :class="thumbClasses" />
    </ScrollAreaScrollbar>

    <ScrollAreaCorner v-if="scrollX && scrollY" :class="cornerClasses" />
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
  visibility: 'hover',
  scrollHideDelay: 600,
  dir: 'ltr',
  scrollX: false,
  scrollY: true,
})

const scrollAreaRoot = ref<InstanceType<typeof ScrollAreaRoot> | null>(null)

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

const getViewport = () => scrollAreaRoot.value?.viewport || null

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
:root {
  --reka-scroll-area-thumb-width: 100%;
  --reka-scroll-area-thumb-height: 100%;
}

.sh-scroll-area {
  @apply relative overflow-hidden;

  /* 確保滾動條在內容之上，不佔用布局空間 */
  & .sh-scrollbar {
    @apply absolute z-10 select-none touch-none;
    @apply rounded-full;
    @apply transition transition-all duration-300;
    @apply bg-transparent;

    &[data-orientation='vertical'] {
      @apply top-0 right-0 h-full w-2;
      @apply border-none;
      @apply pl-px;
    }

    &[data-orientation='horizontal'] {
      @apply bottom-0 left-0 w-full h-2;
      @apply border-none;
      @apply pt-px;
    }

    &:hover {
      @apply bg-text.base.fade;
    }

    &[data-state='hidden'] {
      @apply opacity-0;
    }

    &[data-state='visible'] {
      @apply opacity-100;
    }
  }

  & .sh-scroll-thumb {
    @apply relative block rounded-full bg-primary;
    @apply transition-colors duration-150;
    @apply hover:bg-primary active:bg-primary;

    &[data-state='hidden'] {
      @apply opacity-0;
    }

    &[data-state='visible'] {
      @apply opacity-100;
    }

    &::before {
      @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
      /* 44px = WCAG minimum touch-target size, not a design-scale value */
      @apply w-full min-w-[44px] h-full min-h-[44px];
      content: '';
    }
  }

  & .sh-scroll-corner {
    @apply absolute bottom-0 right-0 w-2.5 h-2.5;
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
  --scroll-thumb-color: var(--sh-primary);
  --scroll-thumb-hover-color: var(--sh-primary-darken);
  --scroll-thumb-active-color: var(--sh-text-base);
  --scroll-track-color: var(--sh-bg-primary);

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
