import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import Popover from '../index.vue'

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

describe('Popover — rendering', () => {
  it('does not render content by default (closed)', () => {
    const wrapper = mount(Popover, {
      slots: { trigger: 'Open' },
      attachTo: document.body,
    })

    expect(document.querySelector('.sh-popover-content')).toBeNull()
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
  })

  // Mounts already-open via the `value` prop for a simple, isolated check of
  // rendering output (content/aria-expanded/arrow). Popover's `PopoverContent`
  // now sets `@open-auto-focus.prevent` (matching DatePicker's identical
  // guard on the same underlying reka-ui primitive), so the click-driven open
  // path is safe to exercise directly too — see the dedicated regression test
  // in "Popover — trigger click" that clicks the real trigger and confirms
  // the popover stays open (does not spuriously auto-dismiss) across ticks.
  it('renders content, aria-expanded and arrow when open', async () => {
    const wrapper = mount(Popover, {
      props: { value: true },
      slots: { trigger: 'Open', default: 'Popover body content' },
      attachTo: document.body,
    })
    await settle()

    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    const content = document.querySelector('.sh-popover-content')
    expect(content).not.toBeNull()
    expect(content?.textContent).toContain('Popover body content')
    expect(document.querySelector('.sh-popover-arrow')).not.toBeNull()

    wrapper.unmount()
  })

  it('does not render the arrow when arrow is false', async () => {
    const wrapper = mount(Popover, {
      props: { value: true, arrow: false },
      slots: { trigger: 'Open' },
      attachTo: document.body,
    })
    await settle()

    expect(document.querySelector('.sh-popover-content')).not.toBeNull()
    expect(document.querySelector('.sh-popover-arrow')).toBeNull()

    wrapper.unmount()
  })
})

describe('Popover — trigger click', () => {
  it('clicking the trigger emits update:value(true)', async () => {
    const wrapper = mount(Popover, {
      slots: { trigger: 'Open' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await nextTick()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([true])

    wrapper.unmount()
  })

  // Regression test for the auto-dismiss bug: PopoverContent used to lack the
  // `@open-auto-focus.prevent` guard present on DatePicker's identical
  // underlying reka-ui primitive, which let opening trigger a spurious
  // focus-outside dismissal a few ticks later (an extra unwanted
  // `update:value(false)` emit that closed the popover on its own). This
  // drives the open through a real trigger click (not the `value` prop) and
  // settles across the same multi-tick window where the spurious dismissal
  // used to fire, then asserts the popover is still open.
  it('stays open after clicking the trigger (no spurious auto-dismiss)', async () => {
    const wrapper = mount(Popover, {
      slots: { trigger: 'Open', default: 'Popover body content' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await settle()

    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(document.querySelector('.sh-popover-content')).not.toBeNull()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toEqual([[true]])

    wrapper.unmount()
  })
})

describe('Popover — v-model', () => {
  it('reacts when the parent updates the controlled value prop', async () => {
    const wrapper = mount(Popover, {
      props: { value: false },
      slots: { trigger: 'Open' },
      attachTo: document.body,
    })
    await settle()
    expect(document.querySelector('.sh-popover-content')).toBeNull()

    await wrapper.setProps({ value: true })
    await settle()
    expect(document.querySelector('.sh-popover-content')).not.toBeNull()

    await wrapper.setProps({ value: false })
    await settle()
    expect(document.querySelector('.sh-popover-content')).toBeNull()

    wrapper.unmount()
  })
})

describe('Popover — disabled', () => {
  it('applies the native disabled attribute to the trigger', () => {
    const wrapper = mount(Popover, {
      props: { disabled: true },
      slots: { trigger: 'Open' },
      attachTo: document.body,
    })

    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBe(
      true,
    )

    wrapper.unmount()
  })

  it('does not open when the disabled trigger is clicked', async () => {
    const wrapper = mount(Popover, {
      props: { disabled: true },
      slots: { trigger: 'Open' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await settle()

    expect(document.querySelector('.sh-popover-content')).toBeNull()
    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})
