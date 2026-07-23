import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Textarea from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Textarea — rendering', () => {
  it('renders a textarea with the given placeholder and rows', () => {
    const wrapper = mount(Textarea, {
      props: { placeholder: 'Write something...', rows: 4 },
      attachTo: document.body,
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Write something...')
    expect(textarea.attributes('rows')).toBe('4')

    wrapper.unmount()
  })

  it('reflects the initial value prop', () => {
    const wrapper = mount(Textarea, {
      props: { value: 'hello' },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('textarea').element as HTMLTextAreaElement).value,
    ).toBe('hello')

    wrapper.unmount()
  })
})

describe('Textarea — v-model', () => {
  it('typing emits update:value and input with the new value', async () => {
    const wrapper = mount(Textarea, {
      props: { value: '' },
      attachTo: document.body,
    })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('hello world')

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![0]).toEqual(['hello world'])

    const inputEmitted = wrapper.emitted('input')
    expect(inputEmitted).toBeTruthy()
    expect(inputEmitted![0]).toEqual(['hello world'])

    wrapper.unmount()
  })

  it('emits change with the current value on native change', async () => {
    const wrapper = mount(Textarea, {
      props: { value: '' },
      attachTo: document.body,
    })

    const textarea = wrapper.find('textarea')
    ;(textarea.element as HTMLTextAreaElement).value = 'committed text'
    await textarea.trigger('change')

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![0]).toEqual(['committed text'])

    wrapper.unmount()
  })
})

describe('Textarea — disabled', () => {
  it('applies the native disabled attribute to the textarea', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: true },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('textarea').element as HTMLTextAreaElement).disabled,
    ).toBe(true)

    wrapper.unmount()
  })

  it('applies the is-disabled class to the wrapper', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-textarea-wrapper').classes()).toContain(
      'is-disabled',
    )

    wrapper.unmount()
  })

  it('does not apply the is-disabled class when disabled is false', () => {
    const wrapper = mount(Textarea, {
      props: { disabled: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-textarea-wrapper').classes()).not.toContain(
      'is-disabled',
    )

    wrapper.unmount()
  })
})

describe('Textarea — maxlength & showWordLimit', () => {
  it('shows the character count when showWordLimit and maxlength are set', () => {
    const wrapper = mount(Textarea, {
      props: { value: 'hello', maxlength: 10, showWordLimit: true },
      attachTo: document.body,
    })

    expect(wrapper.find('textarea').attributes('maxlength')).toBe('10')

    const count = wrapper.find('.sh-textarea-count-inner')
    expect(count.exists()).toBe(true)
    expect(count.text()).toBe('5/10')

    wrapper.unmount()
  })

  it('does not show the character count when showWordLimit is false', () => {
    const wrapper = mount(Textarea, {
      props: { value: 'hello', maxlength: 10, showWordLimit: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-textarea-count').exists()).toBe(false)

    wrapper.unmount()
  })

  it('updates the count as the value prop changes', async () => {
    const wrapper = mount(Textarea, {
      props: { value: 'hi', maxlength: 10, showWordLimit: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-textarea-count-inner').text()).toBe('2/10')

    await wrapper.setProps({ value: 'hello there' })

    expect(wrapper.find('.sh-textarea-count-inner').text()).toBe('11/10')

    wrapper.unmount()
  })
})

describe('Textarea — size', () => {
  it('defaults to sh-textarea--medium', () => {
    const wrapper = mount(Textarea, { attachTo: document.body })

    expect(wrapper.find('.sh-textarea').classes()).toContain(
      'sh-textarea--medium',
    )

    wrapper.unmount()
  })

  it('applies sh-textarea--small for size="small"', () => {
    const wrapper = mount(Textarea, {
      props: { size: 'small' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-textarea').classes()).toContain(
      'sh-textarea--small',
    )

    wrapper.unmount()
  })

  it('applies sh-textarea--large for size="large"', () => {
    const wrapper = mount(Textarea, {
      props: { size: 'large' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-textarea').classes()).toContain(
      'sh-textarea--large',
    )

    wrapper.unmount()
  })
})
