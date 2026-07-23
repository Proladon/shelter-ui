import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import Input from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Input — v-model round trip', () => {
  it('typing emits update:value and input with the new value', async () => {
    const wrapper = mount(Input, {
      props: { value: '' },
      attachTo: document.body,
    })

    const input = wrapper.find('input')
    ;(input.element as HTMLInputElement).value = 'hello'
    await input.trigger('input')

    expect(wrapper.emitted('update:value')![0]).toEqual(['hello'])
    expect(wrapper.emitted('input')![0]).toEqual(['hello'])

    wrapper.unmount()
  })

  it('emits change with the value on a native change event', async () => {
    const wrapper = mount(Input, {
      props: { value: '' },
      attachTo: document.body,
    })

    const input = wrapper.find('input')
    ;(input.element as HTMLInputElement).value = 'world'
    await input.trigger('change')

    expect(wrapper.emitted('change')![0]).toEqual(['world'])

    wrapper.unmount()
  })

  it('renders the value prop in the native input', () => {
    const wrapper = mount(Input, {
      props: { value: 'preset' },
      attachTo: document.body,
    })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('preset')

    wrapper.unmount()
  })
})

describe('Input — clearable', () => {
  it('does not show the clear button when the value is empty', () => {
    const wrapper = mount(Input, {
      props: { value: '', clearable: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-clear').exists()).toBe(false)

    wrapper.unmount()
  })

  it('shows the clear button once there is a value', () => {
    const wrapper = mount(Input, {
      props: { value: 'abc', clearable: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-clear').exists()).toBe(true)

    wrapper.unmount()
  })

  it('does not show the clear button when disabled, even with a value', () => {
    const wrapper = mount(Input, {
      props: { value: 'abc', clearable: true, disabled: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-clear').exists()).toBe(false)

    wrapper.unmount()
  })

  it('clicking the clear button emits update:value with an empty string, emits clear, and re-focuses the input', async () => {
    const wrapper = mount(Input, {
      props: { value: 'abc', clearable: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-input-clear').trigger('click')
    await nextTick() // handleClear() re-focuses inside a nextTick callback

    expect(wrapper.emitted('update:value')![0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(document.activeElement).toBe(wrapper.find('input').element)

    wrapper.unmount()
  })
})

describe('Input — maxlength & showWordLimit', () => {
  it('shows a "current/max" character count', () => {
    const wrapper = mount(Input, {
      props: { value: 'ab', maxlength: 10, showWordLimit: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-count-inner').text()).toBe('2/10')

    wrapper.unmount()
  })

  it('updates the count as the bound value changes', async () => {
    const wrapper = mount(Input, {
      props: { value: 'ab', maxlength: 10, showWordLimit: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-count-inner').text()).toBe('2/10')

    // Input is a fully controlled component (no internal value state), so "typing"
    // is reflected in the displayed count only once the v-model round trip feeds the
    // new value back in as a prop -- mirror that here.
    await wrapper.setProps({ value: 'abcde' })

    expect(wrapper.find('.sh-input-count-inner').text()).toBe('5/10')

    wrapper.unmount()
  })

  it('does not show the count when showWordLimit is false, even with maxlength set', () => {
    const wrapper = mount(Input, {
      props: { value: 'ab', maxlength: 10, showWordLimit: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-count').exists()).toBe(false)

    wrapper.unmount()
  })

  it('does not show the count when disabled', () => {
    const wrapper = mount(Input, {
      props: { value: 'ab', maxlength: 10, showWordLimit: true, disabled: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-count').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('Input — size', () => {
  it.each([
    ['small', 'sh-input--small'],
    ['medium', 'sh-input--medium'],
    ['large', 'sh-input--large'],
  ] as const)('applies the %s size class', (size, expectedClass) => {
    const wrapper = mount(Input, {
      props: { value: '', size },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-wrapper').classes()).toContain(expectedClass)

    wrapper.unmount()
  })

  it('defaults to the medium size class when no size is given', () => {
    const wrapper = mount(Input, {
      props: { value: '' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-wrapper').classes()).toContain('sh-input--medium')

    wrapper.unmount()
  })
})
