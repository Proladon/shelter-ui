<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'
import SHDatePicker from '../index.vue'
import type { DateRange } from '../types'
import type { DateValue } from '@internationalized/date'

// shallowRef preserves class identity for DateValue, avoiding UnwrapRef
// stripping the #private discriminant that DateValue classes rely on.
const singleDate = shallowRef<DateValue | undefined>(undefined)
const rangeDate = shallowRef<DateRange | undefined>(undefined)
const disabledDate = shallowRef<DateValue>(new CalendarDate(2026, 3, 21))
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <section>
      <h3
        class="text-text.base font-medium mb-2"
        style="font-size: var(--sh-font-size-sm)"
      >
        Single Date
      </h3>
      <SHDatePicker
        :model-value="singleDate"
        @update:model-value="
          (v) => {
            singleDate = v as DateValue | undefined
          }
        "
      />
      <p
        class="mt-2 text-text.primary"
        style="font-size: var(--sh-font-size-xs)"
      >
        Selected: {{ singleDate?.toString() ?? 'none' }}
      </p>
    </section>

    <section>
      <h3
        class="text-text.base font-medium mb-2"
        style="font-size: var(--sh-font-size-sm)"
      >
        Date Range
      </h3>
      <SHDatePicker
        :model-value="rangeDate"
        :range="true"
        @update:model-value="
          (v) => {
            rangeDate = v as DateRange | undefined
          }
        "
      />
      <p
        class="mt-2 text-text.primary"
        style="font-size: var(--sh-font-size-xs)"
      >
        Start: {{ rangeDate?.start?.toString() ?? 'none' }} | End:
        {{ rangeDate?.end?.toString() ?? 'none' }}
      </p>
    </section>

    <section>
      <h3
        class="text-text.base font-medium mb-2"
        style="font-size: var(--sh-font-size-sm)"
      >
        Disabled
      </h3>
      <SHDatePicker :model-value="disabledDate" :disabled="true" />
    </section>

    <section>
      <h3
        class="text-text.base font-medium mb-2"
        style="font-size: var(--sh-font-size-sm)"
      >
        Readonly
      </h3>
      <SHDatePicker :model-value="disabledDate" :readonly="true" />
    </section>
  </div>
</template>
