<template>
  <button
    class="s-button"
    :class="[
      `type-${type}`,
      `size-${size}`,
      outline ? `style-outline-${type}` : '',
      text ? `style-text-${type}` : '',
      ghost ? `style-ghost-${type}` : '',
      borderd ? `style-borderd-${type}` : '',
      dashed ? `style-dashed-${type}` : '',
      {
        'is-disabled': disabled || loading,
        's-button--loading': loading,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="s-button__loading">
      <svg
        class="s-button__loading-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="60 30"
        />
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits } from './types'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  text: false,
  ghost: false,
  dashed: false,
  outline: false,
  borderd: false,
})

const emit = defineEmits<ButtonEmits>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.s-button {
  @apply px-4 py-1 rounded-md font-medium cursor-pointer relative text-shadow-md;
  @apply flex items-center justify-center;
  @apply transition-all duration-300 ease-in-out;
  @apply border-solid border;
  @apply hover:(brightness-90);
  @apply active:(brightness-80);
  @apply text-text.base;

  /* Default styles (previously plain style) */
  @apply bg-opacity-10 bg-text.base.fade text-text.base border-transparent;

  &.type-primary {
    @apply bg-opacity-10 bg-primary.fade text-primary border-transparent;
  }

  &.type-success {
    @apply bg-opacity-10 bg-status.success.fade text-status.success border-transparent;
  }

  &.type-warning {
    @apply bg-opacity-10 bg-status.warning.fade text-status.warning border-transparent;
  }

  &.type-danger {
    @apply bg-opacity-10 bg-status.danger.fade text-status.danger border-transparent;
  }

  &.type-info {
    @apply bg-opacity-10 bg-status.info.fade text-status.info border-transparent;
  }

  /* Size */
  &.size-large {
    @apply text-lg px-6 py-3;
  }

  &.size-small {
    @apply text-sm px-3 py-0.5;
  }

  /* Style */
  &.is-disabled {
    @apply opacity-60 cursor-not-allowed;
  }

  &__loading {
    @apply inline-flex items-center justify-center mr-2;
  }

  &__loading-icon {
    @apply w-4 h-4 animate-spin;
  }

  &--loading {
    @apply relative;
  }

  &.style-dashed {
    @mixin dashed-variant($color) {
      @apply border-dashed border-#{$color} text-#{$color};
    }

    &-default {
      @include dashed-variant('text.base');
    }
    &-primary {
      @include dashed-variant('primary');
    }
    &-success {
      @include dashed-variant('status.success');
    }
    &-warning {
      @include dashed-variant('status.warning');
    }
    &-danger {
      @include dashed-variant('status.danger');
    }
    &-info {
      @include dashed-variant('status.info');
    }
  }

  /* Ghost */
  &.style-ghost {
    @mixin ghost-variant($color) {
      @apply bg-transparent text-#{$color} border-transparent;
      @apply hover:(bg-#{$color}.fade);
      @apply active:(brightness-80);
    }

    &-default {
      @include ghost-variant('text.base');
    }

    &-primary {
      @include ghost-variant('primary');
    }

    &-success {
      @include ghost-variant('status.success');
    }

    &-warning {
      @include ghost-variant('status.warning');
    }

    &-danger {
      @include ghost-variant('status.danger');
    }

    &-info {
      @include ghost-variant('status.info');
    }
  }

  /* Text */
  &.style-text {
    @mixin text-variant($color) {
      @apply bg-transparent border-transparent text-#{$color};
      @apply hover:(brightness-90);
      @apply active:(brightness-80);
    }

    &-default {
      @include text-variant('text.base');
    }

    &-primary {
      @include text-variant('primary');
    }

    &-success {
      @include text-variant('status.success');
    }

    &-warning {
      @include text-variant('status.warning');
    }

    &-danger {
      @include text-variant('status.danger');
    }

    &-info {
      @include text-variant('status.info');
    }
  }

  /* Outline*/
  &.style-outline {
    @mixin outline-variant($color) {
      @apply bg-transparent border-#{$color} text-#{$color};
      @apply hover:(bg-#{$color}.fade);
      @apply active:(brightness-80);
    }

    &-default {
      @include outline-variant('text.base');
    }
    &-primary {
      @include outline-variant('primary');
    }

    &-success {
      @include outline-variant('status.success');
    }

    &-warning {
      @include outline-variant('status.warning');
    }

    &-danger {
      @include outline-variant('status.danger');
    }

    &-info {
      @include outline-variant('status.info');
    }
  }

  /* Borderd */
  &.style-borderd {
    @mixin borderd-variant($color) {
      @apply bg-#{$color}.fade text-#{$color} border-#{$color};
      @apply hover:(brightness-90);
      @apply active:(brightness-80);
    }

    &-default {
      @include borderd-variant('text.base');
    }
    &-primary {
      @include borderd-variant('primary');
    }
    &-success {
      @include borderd-variant('status.success');
    }

    &-warning {
      @include borderd-variant('status.warning');
    }

    &-danger {
      @include borderd-variant('status.danger');
    }

    &-info {
      @include borderd-variant('status.info');
    }
  }
}
</style>
