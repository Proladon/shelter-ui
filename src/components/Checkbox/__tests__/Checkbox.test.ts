import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Checkbox from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Checkbox — v-model round trip', () => {
  it('renders unchecked when value is false', () => {
    const wrapper = mount(Checkbox, {
      props: { value: false },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.find('.sh-checkbox-indicator').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders the checked class and check icon when value is true', () => {
    const wrapper = mount(Checkbox, {
      props: { value: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-checkbox').classes()).toContain('sh-checkbox--checked')
    expect(wrapper.find('.sh-checkbox-indicator .tabler-icon-check').exists()).toBe(true)

    // Previously a known bug: the native <input> has no `:checked` template binding in
    // src/components/Checkbox/index.vue -- it relies solely on a `watch(isChecked, ...)`
    // to imperatively set `inputRef.value.checked`. With `immediate: true`, that watcher's
    // first invocation ran synchronously during setup(), before the `ref="inputRef"`
    // template ref was attached (which only happens once the component mounts), so it was
    // a silent no-op on first render and the native DOM property was left unsynced despite
    // the component visually presenting as checked via its class/icon. Fixed by syncing
    // once in `onMounted` (in addition to the non-immediate watcher for later updates), so
    // the native `checked` property is now correctly set on initial mount too.
    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)

    wrapper.unmount()
  })

  it('checking the input emits update:value and change with true', async () => {
    const wrapper = mount(Checkbox, {
      props: { value: false },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="checkbox"]')
    ;(input.element as HTMLInputElement).checked = true
    await input.trigger('change')

    expect(wrapper.emitted('update:value')![0]).toEqual([true])
    expect(wrapper.emitted('change')![0]).toEqual([true])

    wrapper.unmount()
  })

  it('unchecking the input emits update:value and change with false', async () => {
    const wrapper = mount(Checkbox, {
      props: { value: true },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="checkbox"]')
    ;(input.element as HTMLInputElement).checked = false
    await input.trigger('change')

    expect(wrapper.emitted('update:value')![0]).toEqual([false])
    expect(wrapper.emitted('change')![0]).toEqual([false])

    wrapper.unmount()
  })
})

describe('Checkbox — indeterminate', () => {
  it('sets the native indeterminate DOM property and a distinct modifier class, without also being "checked"', () => {
    const wrapper = mount(Checkbox, {
      props: { value: false, indeterminate: true },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).indeterminate).toBe(true)
    expect((input.element as HTMLInputElement).checked).toBe(false)

    expect(wrapper.find('.sh-checkbox').classes()).toContain('sh-checkbox--indeterminate')
    expect(wrapper.find('.sh-checkbox').classes()).not.toContain('sh-checkbox--checked')

    // Visually distinct from the checked state: renders the minus icon, not the check icon.
    expect(wrapper.find('.sh-checkbox-indicator .tabler-icon-minus').exists()).toBe(true)
    expect(wrapper.find('.sh-checkbox-indicator .tabler-icon-check').exists()).toBe(false)

    wrapper.unmount()
  })

  it('value === "indeterminate" also renders the indeterminate state', () => {
    const wrapper = mount(Checkbox, {
      props: { value: 'indeterminate' },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).indeterminate).toBe(true)
    expect(wrapper.find('.sh-checkbox-indicator .tabler-icon-minus').exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('Checkbox — disabled', () => {
  it('applies the native disabled attribute', () => {
    const wrapper = mount(Checkbox, {
      props: { value: false, disabled: true },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).disabled).toBe(true)
    expect(wrapper.find('.sh-checkbox').classes()).toContain('sh-checkbox--disabled')

    wrapper.unmount()
  })

  it('blocks toggling: a disabled checkbox does not emit update:value on change', async () => {
    const wrapper = mount(Checkbox, {
      props: { value: false, disabled: true },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="checkbox"]')
    ;(input.element as HTMLInputElement).checked = true
    await input.trigger('change')

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })
})
