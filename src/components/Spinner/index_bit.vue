<template>
  <div
    id="loader"
    :style="{ '--spinner-color': color || 'var(--sh-text-base)' }"
  ></div>
</template>
<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '',
  },
})
</script>

<style lang="postcss" scoped>
#loader {
  animation: spin 1s linear infinite;
  height: 4px;
  width: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -2px;
}

@keyframes spin {
  0% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px var(--spinner-color),
      8px 8px var(--spinner-color), 4px 12px var(--spinner-color),
      0px 12px transparent, -4px 12px transparent, -8px 8px transparent,
      -12px 4px transparent, -12px 0px transparent, -12px -4px transparent,
      -8px -8px transparent, -4px -12px transparent;
  }
  6.25% {
    box-shadow: 0px -12px transparent, 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px var(--spinner-color),
      8px 8px var(--spinner-color), 4px 12px var(--spinner-color),
      0px 12px var(--spinner-color), -4px 12px transparent, -8px 8px transparent,
      -12px 4px transparent, -12px 0px transparent, -12px -4px transparent,
      -8px -8px transparent, -4px -12px transparent;
  }
  12.5% {
    box-shadow: 0px -12px transparent, 4px -12px transparent,
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px var(--spinner-color),
      8px 8px var(--spinner-color), 4px 12px var(--spinner-color),
      0px 12px var(--spinner-color), -4px 12px var(--spinner-color),
      -8px 8px transparent, -12px 4px transparent, -12px 0px transparent,
      -12px -4px transparent, -8px -8px transparent, -4px -12px transparent;
  }
  18.75% {
    box-shadow: 0px -12px transparent, 4px -12px transparent,
      8px -8px transparent, 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px var(--spinner-color),
      8px 8px var(--spinner-color), 4px 12px var(--spinner-color),
      0px 12px var(--spinner-color), -4px 12px var(--spinner-color),
      -8px 8px var(--spinner-color), -12px 4px transparent,
      -12px 0px transparent, -12px -4px transparent, -8px -8px transparent,
      -4px -12px transparent;
  }
  25% {
    box-shadow: 0px -12px transparent, 4px -12px transparent,
      8px -8px transparent, 12px -4px transparent, 12px 0px var(--spinner-color),
      12px 4px var(--spinner-color), 8px 8px var(--spinner-color),
      4px 12px var(--spinner-color), 0px 12px var(--spinner-color),
      -4px 12px var(--spinner-color), -8px 8px var(--spinner-color),
      -12px 4px var(--spinner-color), -12px 0px transparent,
      -12px -4px transparent, -8px -8px transparent, -4px -12px transparent;
  }
  31.25% {
    box-shadow: 0px -12px transparent, 4px -12px transparent,
      8px -8px transparent, 12px -4px transparent, 12px 0px transparent,
      12px 4px var(--spinner-color), 8px 8px var(--spinner-color),
      4px 12px var(--spinner-color), 0px 12px var(--spinner-color),
      -4px 12px var(--spinner-color), -8px 8px var(--spinner-color),
      -12px 4px var(--spinner-color), -12px 0px var(--spinner-color),
      -12px -4px transparent, -8px -8px transparent, -4px -12px transparent;
  }
  37.5% {
    box-shadow: 0px -12px transparent, 4px -12px transparent,
      8px -8px transparent, 12px -4px transparent, 12px 0px transparent,
      12px 4px transparent, 8px 8px var(--spinner-color),
      4px 12px var(--spinner-color), 0px 12px var(--spinner-color),
      -4px 12px var(--spinner-color), -8px 8px var(--spinner-color),
      -12px 4px var(--spinner-color), -12px 0px var(--spinner-color),
      -12px -4px var(--spinner-color), -8px -8px transparent,
      -4px -12px transparent;
  }
  43.75% {
    box-shadow: 0px -12px transparent, 4px -12px transparent,
      8px -8px transparent, 12px -4px transparent, 12px 0px transparent,
      12px 4px transparent, 8px 8px transparent, 4px 12px var(--spinner-color),
      0px 12px var(--spinner-color), -4px 12px var(--spinner-color),
      -8px 8px var(--spinner-color), -12px 4px var(--spinner-color),
      -12px 0px var(--spinner-color), -12px -4px var(--spinner-color),
      -8px -8px var(--spinner-color), -4px -12px transparent;
  }
  50% {
    box-shadow: 0px -12px transparent, 4px -12px transparent,
      8px -8px transparent, 12px -4px transparent, 12px 0px transparent,
      12px 4px transparent, 8px 8px transparent, 4px 12px transparent,
      0px 12px var(--spinner-color), -4px 12px var(--spinner-color),
      -8px 8px var(--spinner-color), -12px 4px var(--spinner-color),
      -12px 0px var(--spinner-color), -12px -4px var(--spinner-color),
      -8px -8px var(--spinner-color), -4px -12px var(--spinner-color);
  }
  56.25% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px transparent,
      8px -8px transparent, 12px -4px transparent, 12px 0px transparent,
      12px 4px transparent, 8px 8px transparent, 4px 12px transparent,
      0px 12px transparent, -4px 12px var(--spinner-color),
      -8px 8px var(--spinner-color), -12px 4px var(--spinner-color),
      -12px 0px var(--spinner-color), -12px -4px var(--spinner-color),
      -8px -8px var(--spinner-color), -4px -12px var(--spinner-color);
  }
  62.5% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px transparent, 12px -4px transparent, 12px 0px transparent,
      12px 4px transparent, 8px 8px transparent, 4px 12px transparent,
      0px 12px transparent, -4px 12px transparent, -8px 8px var(--spinner-color),
      -12px 4px var(--spinner-color), -12px 0px var(--spinner-color),
      -12px -4px var(--spinner-color), -8px -8px var(--spinner-color),
      -4px -12px var(--spinner-color);
  }
  68.75% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px transparent, 12px 0px transparent,
      12px 4px transparent, 8px 8px transparent, 4px 12px transparent,
      0px 12px transparent, -4px 12px transparent, -8px 8px transparent,
      -12px 4px var(--spinner-color), -12px 0px var(--spinner-color),
      -12px -4px var(--spinner-color), -8px -8px var(--spinner-color),
      -4px -12px var(--spinner-color);
  }
  75% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px transparent, 12px 4px transparent, 8px 8px transparent,
      4px 12px transparent, 0px 12px transparent, -4px 12px transparent,
      -8px 8px transparent, -12px 4px transparent,
      -12px 0px var(--spinner-color), -12px -4px var(--spinner-color),
      -8px -8px var(--spinner-color), -4px -12px var(--spinner-color);
  }
  81.25% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px transparent, 8px 8px transparent,
      4px 12px transparent, 0px 12px transparent, -4px 12px transparent,
      -8px 8px transparent, -12px 4px transparent, -12px 0px transparent,
      -12px -4px var(--spinner-color), -8px -8px var(--spinner-color),
      -4px -12px var(--spinner-color);
  }
  87.5% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px var(--spinner-color),
      8px 8px transparent, 4px 12px transparent, 0px 12px transparent,
      -4px 12px transparent, -8px 8px transparent, -12px 4px transparent,
      -12px 0px transparent, -12px -4px transparent,
      -8px -8px var(--spinner-color), -4px -12px var(--spinner-color);
  }
  93.75% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px var(--spinner-color),
      8px 8px var(--spinner-color), 4px 12px transparent, 0px 12px transparent,
      -4px 12px transparent, -8px 8px transparent, -12px 4px transparent,
      -12px 0px transparent, -12px -4px transparent, -8px -8px transparent,
      -4px -12px var(--spinner-color);
  }
  100% {
    box-shadow: 0px -12px var(--spinner-color), 4px -12px var(--spinner-color),
      8px -8px var(--spinner-color), 12px -4px var(--spinner-color),
      12px 0px var(--spinner-color), 12px 4px var(--spinner-color),
      8px 8px var(--spinner-color), 4px 12px var(--spinner-color),
      0px 12px transparent, -4px 12px transparent, -8px 8px transparent,
      -12px 4px transparent, -12px 0px transparent, -12px -4px transparent,
      -8px -8px transparent, -4px -12px transparent;
  }
}
</style>
