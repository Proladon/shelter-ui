import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { CalendarDate, type DateValue } from '@internationalized/date'
import Calendar from '../index.vue'

/** Wait for reka-ui's internal state sync after a controlled-prop update. */
async function settle() {
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

// Fixed month so tests don't depend on the actual current date.
const placeholderDate = new CalendarDate(2026, 7, 15)

describe('Calendar — rendering', () => {
  it('renders a grid of day cells for the placeholder month', async () => {
    const wrapper = mount(Calendar, {
      props: { defaultPlaceholder: placeholderDate },
      attachTo: document.body,
    })
    await settle()

    // July 2026 has 31 days across 5 weeks; a full-week grid is at least 28 cells.
    const cells = wrapper.findAll('.sh-calendar__day')
    expect(cells.length).toBeGreaterThanOrEqual(28)
    expect(wrapper.find(`[data-value='2026-07-15']`).exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('Calendar — v-model', () => {
  it('clicking a day cell emits update:value with the selected date', async () => {
    const wrapper = mount(Calendar, {
      props: { defaultPlaceholder: placeholderDate },
      attachTo: document.body,
    })
    await settle()

    const cell = wrapper.find(`[data-value='2026-07-10']`)
    expect(cell.exists()).toBe(true)
    await cell.trigger('click')
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(String(emitted![0][0])).toBe('2026-07-10')

    wrapper.unmount()
  })
})

describe('Calendar — disabled', () => {
  it('marks every day cell disabled and blocks selection', async () => {
    const wrapper = mount(Calendar, {
      props: { defaultPlaceholder: placeholderDate, disabled: true },
      attachTo: document.body,
    })
    await settle()

    const cell = wrapper.find(`[data-value='2026-07-10']`)
    expect(cell.attributes('data-disabled')).toBe('')

    await cell.trigger('click')
    await settle()

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Calendar — minValue/maxValue', () => {
  it('disables and blocks selection of day cells before minValue', async () => {
    const wrapper = mount(Calendar, {
      props: {
        defaultPlaceholder: placeholderDate,
        minValue: new CalendarDate(2026, 7, 10),
      },
      attachTo: document.body,
    })
    await settle()

    const beforeMin = wrapper.find(`[data-value='2026-07-05']`)
    expect(beforeMin.attributes('data-disabled')).toBe('')
    await beforeMin.trigger('click')
    await settle()
    expect(wrapper.emitted('update:value')).toBeFalsy()

    // control case — a day at/after minValue stays selectable
    const afterMin = wrapper.find(`[data-value='2026-07-20']`)
    expect(afterMin.attributes('data-disabled')).toBeUndefined()
    await afterMin.trigger('click')
    await settle()
    expect(wrapper.emitted('update:value')).toBeTruthy()

    wrapper.unmount()
  })

  it('disables and blocks selection of day cells after maxValue', async () => {
    const wrapper = mount(Calendar, {
      props: {
        defaultPlaceholder: placeholderDate,
        maxValue: new CalendarDate(2026, 7, 20),
      },
      attachTo: document.body,
    })
    await settle()

    const afterMax = wrapper.find(`[data-value='2026-07-25']`)
    expect(afterMax.attributes('data-disabled')).toBe('')
    await afterMax.trigger('click')
    await settle()
    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Calendar — isDateUnavailable', () => {
  it('marks matching day cells unavailable and blocks selection, without disabling others', async () => {
    const wrapper = mount(Calendar, {
      props: {
        defaultPlaceholder: placeholderDate,
        isDateUnavailable: (date: DateValue) => date.day === 12,
      },
      attachTo: document.body,
    })
    await settle()

    const unavailable = wrapper.find(`[data-value='2026-07-12']`)
    expect(unavailable.attributes('data-unavailable')).toBe('')
    await unavailable.trigger('click')
    await settle()
    expect(wrapper.emitted('update:value')).toBeFalsy()

    // control case — an unaffected day remains selectable
    const available = wrapper.find(`[data-value='2026-07-13']`)
    expect(available.attributes('data-unavailable')).toBeUndefined()
    await available.trigger('click')
    await settle()
    expect(wrapper.emitted('update:value')).toBeTruthy()

    wrapper.unmount()
  })
})
