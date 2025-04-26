<template>
  <button
    class="s-button"
    :class="[
      `type-${type}`,
      `size-${size}`,
      outline && type !== 'default' ? `style-outline-${type}` : '',
      text && type !== 'default'? `style-text-${type}` : '',
      ghost && type!== 'default'? `style-ghost-${type}` : '',
      plain && type!== 'default'? `style-plain-${type}` : '',
      borderd && type!== 'default'? `style-borderd-${type}` : '',
      {
        'is-disabled': disabled || loading,
        's-button--loading': loading,
        'style-dashed': dashed,
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
  plain: false,
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

  /* Type */
  &.type-primary {
    @apply text-white;
    @apply bg-primary border-primary;
  }

  &.type-success {
    @apply text-white;
    @apply bg-status.success border-status.success;
  }

  &.type-warning {
    @apply text-white;
    @apply bg-status.warning border-status.warning;
  }

  &.type-danger {
    @apply text-white;
    @apply bg-status.danger border-status.danger;
  }

  &.type-info {
    @apply text-white;
    @apply bg-status.info border-status.info;
  }

  /* Size */
  &.size-large {
    @apply text-lg px-6 py-3;
  }

  &.size-small {
    @apply text-sm px-3 py-0.5;
  }

  /* Style */
  &.style-dashed {
    @apply border-dashed;
  }

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

  /* Plain */
  &.style-plain {
    @mixin plain-variant($color) {
      @apply bg-opacity-10 bg-#{$color}.veil text-#{$color} border-transparent;
      @apply hover:(brightness-90);
      @apply active:(brightness-80);
    }

    &-primary {
      @include plain-variant('primary');
    }

    &-success {
      @include plain-variant('status.success');
    }

    &-warning {
      @include plain-variant('status.warning');
    }

    &-danger {
      @include plain-variant('status.danger');
    }

    &-info {
      @include plain-variant('status.info');
    }
  }

  /* Ghost */
  &.style-ghost {
    @mixin ghost-variant($color) {
      @apply bg-transparent text-#{$color} border-transparent;
      @apply hover:(bg-#{$color}.veil);
      @apply active:(brightness-80);
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
      @apply bg-transparent text-#{$color};
      @apply hover:(bg-#{$color}.veil);
      @apply active:(brightness-80);
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
      @apply bg-#{$color}.veil text-#{$color} border-#{$color};
      @apply hover:(brightness-90);
      @apply active:(brightness-80);
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
