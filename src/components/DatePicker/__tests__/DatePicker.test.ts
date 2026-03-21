import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import DatePicker from '../index.vue'

/** Wait for reka-ui's internal state sync after a controlled-prop update. */
async function settle() {
  await nextTick()
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('DatePicker — popover open/close', () => {
  it('calendar popover is hidden before any interaction', () => {
    const wrapper = mount(DatePicker, { attachTo: document.body })

    expect(document.querySelector('.sh-date-picker__content')).toBeNull()
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe(
      'false',
    )

    wrapper.unmount()
  })

  it('opens calendar popover when trigger is clicked', async () => {
    const wrapper = mount(DatePicker, { attachTo: document.body })

    await wrapper.find('[role="combobox"]').trigger('click')
    await settle()

    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe(
      'true',
    )
    expect(document.querySelector('.sh-date-picker__content')).not.toBeNull()

    wrapper.unmount()
  })

  it('does not open the popover when disabled', async () => {
    const wrapper = mount(DatePicker, {
      props: { disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await settle()

    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe(
      'false',
    )
    expect(document.querySelector('.sh-date-picker__content')).toBeNull()

    wrapper.unmount()
  })

  it('does not open the popover when readonly', async () => {
    const wrapper = mount(DatePicker, {
      props: { readonly: true },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await settle()

    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe(
      'false',
    )
    expect(document.querySelector('.sh-date-picker__content')).toBeNull()

    wrapper.unmount()
  })

  it('closes popover on second click (toggle)', async () => {
    const wrapper = mount(DatePicker, { attachTo: document.body })

    const trigger = wrapper.find('[role="combobox"]')

    // open
    await trigger.trigger('click')
    await settle()
    expect(trigger.attributes('aria-expanded')).toBe('true')

    // close
    await trigger.trigger('click')
    await settle()
    expect(trigger.attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
  })

  it('emits update:open with true when opened', async () => {
    const wrapper = mount(DatePicker, { attachTo: document.body })

    await wrapper.find('[role="combobox"]').trigger('click')
    await settle()

    const emitted = wrapper.emitted('update:open')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([true])

    wrapper.unmount()
  })
})
