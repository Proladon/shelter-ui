<template>
  <nav
    class="sh-pagination"
    :class="[props.class, { 'sh-pagination--disabled': disabled }]"
  >
    <div class="sh-pagination__list">
      <!-- 首頁按鈕 -->
      <SHButton
        v-if="showEdges"
        class="sh-pagination__button sh-pagination__button--first"
        v-bind="buttonProps"
        :disabled="disabled || currentPage === 1"
        @click="goToPage(1)"
      >
        <IconChevronsLeft class="sh-pagination__icon" />
        <span class="sh-pagination__text">首頁</span>
      </SHButton>

      <!-- 上一頁按鈕 -->
      <SHButton
        v-if="showPrevNext"
        class="sh-pagination__button sh-pagination__button--prev"
        v-bind="buttonProps"
        :disabled="disabled || currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <IconChevronLeft class="sh-pagination__icon" />
        <span class="sh-pagination__text">上一頁</span>
      </SHButton>

      <!-- 頁碼項目 -->
      <template v-for="(item, index) in paginationItems" :key="index">
        <SHButton
          v-if="item.type === 'page'"
          class="sh-pagination__button sh-pagination__button--page"
          :class="{
            'sh-pagination__button--active': item.value === currentPage,
          }"
          v-bind="activeButtonProps(item.value === currentPage)"
          :disabled="disabled"
          @click="goToPage(item.value!)"
        >
          {{ item.value }}
        </SHButton>
        <span v-else class="sh-pagination__ellipsis"> ⋯ </span>
      </template>

      <!-- 下一頁按鈕 -->
      <SHButton
        v-if="showPrevNext"
        class="sh-pagination__button sh-pagination__button--next"
        v-bind="buttonProps"
        :disabled="disabled || currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <span class="sh-pagination__text">下一頁</span>
        <IconChevronRight class="sh-pagination__icon" />
      </SHButton>

      <!-- 末頁按鈕 -->
      <SHButton
        v-if="showEdges"
        class="sh-pagination__button sh-pagination__button--last"
        v-bind="buttonProps"
        :disabled="disabled || currentPage === totalPages"
        @click="goToPage(totalPages)"
      >
        <span class="sh-pagination__text">末頁</span>
        <IconChevronsRight class="sh-pagination__icon" />
      </SHButton>
    </div>

    <!-- 頁面資訊 -->
    <div v-if="$slots.info" class="sh-pagination__info">
      <slot
        name="info"
        :current="currentPage"
        :total="totalPages"
        :page-size="pageSize"
        :total-items="total"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-vue'
import SHButton from '../Button/index.vue'
import type {
  PaginationProps,
  PaginationEmits,
  PaginationItemType,
} from './types'

// Props
const props = withDefaults(defineProps<PaginationProps>(), {
  modelValue: 1,
  pageSize: 10,
  siblingCount: 2,
  showEdges: true,
  showPrevNext: true,
  disabled: false,
  text: false,
  ghost: false,
  outline: false,
  borderd: false,
  size: 'default',
})

// Emits
const emit = defineEmits<PaginationEmits>()

// Internal state
const currentPage = ref(props.modelValue)

// Computed
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const buttonProps = computed(() => ({
  text: props.text,
  ghost: props.ghost,
  outline: props.outline,
  borderd: props.borderd,
  size: props.size,
}))

const activeButtonProps = (active: boolean) => {
  const data = {
    text: props.text,
    ghost: props.ghost,
    outline: props.outline,
    borderd: props.borderd,
    size: props.size,
    type: active ? 'primary' : 'default',
  }

  if (active) {
    if (!props.text && !props.ghost && !props.outline && !props.borderd) {
      data.borderd = true
    } else if (props.text) {
      data.text = false
      data.outline = true
    } else if (props.ghost) {
      data.ghost = false
    } else if (props.outline) {
      data.borderd = true
      data.outline = false
    } else if (props.borderd) {
      data.borderd = false
      data.outline = true
    }
  }

  return data
}

const paginationItems = computed((): PaginationItemType[] => {
  const items: PaginationItemType[] = []
  const total = totalPages.value
  const current = currentPage.value
  const siblings = props.siblingCount

  if (total <= 1) return []

  // 計算顯示範圍
  const leftSiblingIndex = Math.max(current - siblings, 1)
  const rightSiblingIndex = Math.min(current + siblings, total)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < total - 1

  const firstPageIndex = 1
  const lastPageIndex = total

  // 情況1: 不需要顯示省略號
  if (!shouldShowLeftDots && !shouldShowRightDots) {
    for (let i = 1; i <= total; i++) {
      items.push({ type: 'page', value: i })
    }
    return items
  }

  // 情況2: 只需要右側省略號
  if (!shouldShowLeftDots && shouldShowRightDots) {
    for (let i = 1; i <= rightSiblingIndex; i++) {
      items.push({ type: 'page', value: i })
    }
    items.push({ type: 'ellipsis' })
    items.push({ type: 'page', value: total })
    return items
  }

  // 情況3: 只需要左側省略號
  if (shouldShowLeftDots && !shouldShowRightDots) {
    items.push({ type: 'page', value: 1 })
    items.push({ type: 'ellipsis' })
    for (let i = leftSiblingIndex; i <= total; i++) {
      items.push({ type: 'page', value: i })
    }
    return items
  }

  // 情況4: 需要兩側省略號
  if (shouldShowLeftDots && shouldShowRightDots) {
    items.push({ type: 'page', value: firstPageIndex })
    items.push({ type: 'ellipsis' })

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      items.push({ type: 'page', value: i })
    }

    items.push({ type: 'ellipsis' })
    items.push({ type: 'page', value: lastPageIndex })
    return items
  }

  return items
})

// Methods
const goToPage = (page: number) => {
  if (
    page === currentPage.value ||
    page < 1 ||
    page > totalPages.value ||
    props.disabled
  ) {
    return
  }

  currentPage.value = page
  emit('update:modelValue', page)
  emit('change', page)
}

// Watchers
watch(
  () => props.modelValue,
  (newPage) => {
    if (newPage !== currentPage.value) {
      currentPage.value = newPage
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="postcss">
.sh-pagination {
  @apply flex items-center justify-between gap-4 flex-wrap;
}

.sh-pagination__list {
  @apply flex items-center gap-1;
}

.sh-pagination__button {
  @apply inline-flex items-center justify-center text-sm font-medium rounded-md;
  @apply flex-shrink-0;
  /* @apply brightness-80; */
}

.sh-pagination__button--page {
  /* @apply brightness-80; */
}

.sh-pagination__button--active {
  /* @apply brightness-150; */
}

.sh-pagination__icon {
  @apply w-4 h-4;
}

.sh-pagination__text {
  @apply hidden sm:inline;
}

.sh-pagination__ellipsis {
  @apply flex items-center justify-center w-10 h-10 text-gray-500 select-none;
}

.sh-pagination__info {
  @apply text-sm text-gray-600;
}

.sh-pagination--disabled {
  @apply opacity-50 pointer-events-none cursor-not-allowed;
}

/* 響應式調整 */
@media (max-width: 640px) {
  .sh-pagination__button {
    @apply px-2;
  }

  .sh-pagination__button--first,
  .sh-pagination__button--last {
    @apply hidden;
  }

  .sh-pagination__text {
    @apply hidden;
  }
}
</style>
