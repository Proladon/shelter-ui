<template>
  <div class="sh-input-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { InputGroupProps } from './types'

defineOptions({ name: 'SHInputGroup' })

defineProps<InputGroupProps>()
</script>

<!--
  Non-scoped styles so they can reach across slot-content component boundaries.
  All selectors are tightly prefixed with .sh-input-group to avoid leaking.
-->
<style>
/* ════════════════════════════════════════════════════════════
   The group is ALWAYS the single bordered container.
   Every child (input, textarea, button, addon) loses its own
   individual border so the focus ring and border live only here.
   ════════════════════════════════════════════════════════════ */

/* ── Container ────────────────────────────────────────────── */
.sh-input-group {
  display: inline-flex;
  align-items: stretch;
  width: 100%;
  border: 1px solid var(--sh-border-base);
  border-radius: var(--sh-radius-md);
  overflow: hidden;
  background: var(--sh-bg-primary);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* ── Focus ring lifts to the container ───────────────────── */
.sh-input-group:has(.sh-input.is-focused),
.sh-input-group:has(.sh-textarea.is-focused) {
  border-color: var(--sh-primary);
  box-shadow: 0 0 0 2px var(--sh-primary-fade);
}

/* Enable wrapping when a block-end addon is present */
.sh-input-group:has(.sh-input-group-addon--block-end) {
  flex-wrap: wrap;
}

/* ── Input / Textarea wrappers: flex-fill remaining space ─── */
.sh-input-group > .sh-input-wrapper,
.sh-input-group > .sh-textarea-wrapper {
  flex: 1 1 auto;
  min-width: 0;
}

/* ── Strip all individual borders and radii from inner elements ── */
.sh-input-group > .sh-input-wrapper .sh-input,
.sh-input-group > .sh-textarea-wrapper .sh-textarea {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.sh-input-group > button {
  border-left: none;
  border-top: none;
  border-bottom: none;
  border-radius: 0;
}

.sh-input-group > button:last-child {
  border-right: none;
}

/* ════════════════════════════════════════════════════════════
   block-start layout
   ════════════════════════════════════════════════════════════ */

/* Enable wrapping when a block-start addon is present */
.sh-input-group:has(.sh-input-group-addon--block-start) {
  flex-wrap: wrap;
}

/* Input / textarea wrappers go full width when block-start is present */
.sh-input-group:has(.sh-input-group-addon--block-start) > .sh-input-wrapper,
.sh-input-group:has(.sh-input-group-addon--block-start) > .sh-textarea-wrapper {
  flex: 0 0 100%;
}

/* Block-start addon: full-width inner header bar */
.sh-input-group > .sh-input-group-addon--block-start {
  flex: 0 0 100%;
  order: -1;
}

/* ════════════════════════════════════════════════════════════
   block-end layout
   ════════════════════════════════════════════════════════════ */

/* Input / textarea wrappers go full width */
.sh-input-group:has(.sh-input-group-addon--block-end) > .sh-input-wrapper,
.sh-input-group:has(.sh-input-group-addon--block-end) > .sh-textarea-wrapper {
  flex: 0 0 100%;
}

/* Block-end addon: full-width inner footer bar */
.sh-input-group > .sh-input-group-addon--block-end {
  flex: 0 0 100%;
}
</style>
