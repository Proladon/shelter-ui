import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Radio from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Radio — rendering', () => {
  it('renders an unchecked native radio input by default', () => {
    const wrapper = mount(Radio, {
      props: { nativeValue: 'a' },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="radio"]')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).checked).toBe(false)

    wrapper.unmount()
  })

  it('renders checked when value matches nativeValue', () => {
    const wrapper = mount(Radio, {
      props: { value: 'a', nativeValue: 'a' },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="radio"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)

    wrapper.unmount()
  })

  it('renders the label text from the label prop', () => {
    const wrapper = mount(Radio, {
      props: { nativeValue: 'a', label: 'Option A' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-radio__label').text()).toBe('Option A')

    wrapper.unmount()
  })
})

describe('Radio — v-model', () => {
  it('clicking an unchecked radio emits update:value and change with nativeValue', async () => {
    const wrapper = mount(Radio, {
      props: { value: undefined, nativeValue: 'a' },
      attachTo: document.body,
    })

    await wrapper.find('input[type="radio"]').trigger('click')

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![0]).toEqual(['a'])

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![0]).toEqual(['a'])

    wrapper.unmount()
  })
})

describe('Radio — disabled', () => {
  it('applies the native disabled attribute', () => {
    const wrapper = mount(Radio, {
      props: { nativeValue: 'a', disabled: true },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('input[type="radio"]').element as HTMLInputElement)
        .disabled,
    ).toBe(true)

    wrapper.unmount()
  })

  it('does not toggle checked or emit update:value/change when disabled', async () => {
    const wrapper = mount(Radio, {
      props: { value: undefined, nativeValue: 'a', disabled: true },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="radio"]')
    await input.trigger('click')

    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Radio — readonly', () => {
  it('blocks the custom change event when readonly', async () => {
    const wrapper = mount(Radio, {
      props: { value: undefined, nativeValue: 'a', readonly: true },
      attachTo: document.body,
    })

    await wrapper.find('input[type="radio"]').trigger('click')

    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })

  // Previously a known bug: HTML's native `readonly` attribute has no effect on
  // `<input type="radio">`, and Vue's built-in `vModelRadio` runtime directive installs its
  // own unconditional `change` listener (to sync `v-model`) independent of this component's
  // own `onChange` guard. So clicking a "readonly" radio used to still flip the native
  // `checked` state and emit `update:value` via v-model, even though the component's own
  // custom `change` event correctly stayed blocked (as covered by the test above). Fixed by
  // guarding the native `click` event with `preventDefault()` when readonly (see `onClick` in
  // src/components/Radio/index.vue), which stops the browser's default toggle action -- and
  // therefore the subsequent native `change` event -- from happening at all.
  it('does not toggle checked or emit update:value when readonly', async () => {
    const wrapper = mount(Radio, {
      props: { value: undefined, nativeValue: 'a', readonly: true },
      attachTo: document.body,
    })

    const input = wrapper.find('input[type="radio"]')
    await input.trigger('click')

    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Radio — focus/blur', () => {
  it('emits focus with a FocusEvent when the input gains focus', async () => {
    const wrapper = mount(Radio, {
      props: { nativeValue: 'a' },
      attachTo: document.body,
    })

    await wrapper.find('input[type="radio"]').trigger('focus')

    const focusEmitted = wrapper.emitted('focus')
    expect(focusEmitted).toBeTruthy()
    expect(focusEmitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })

  it('emits blur with a FocusEvent when the input loses focus', async () => {
    const wrapper = mount(Radio, {
      props: { nativeValue: 'a' },
      attachTo: document.body,
    })

    await wrapper.find('input[type="radio"]').trigger('blur')

    const blurEmitted = wrapper.emitted('blur')
    expect(blurEmitted).toBeTruthy()
    expect(blurEmitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })
})
