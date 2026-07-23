import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import MentionableTextArea from '../index.vue'

/** Wait for reka-ui's internal state sync after a controlled-prop update. */
async function settle() {
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('MentionableTextArea — rendering', () => {
  it('renders a textarea-like combobox input with the default placeholder', () => {
    const wrapper = mount(MentionableTextArea, { attachTo: document.body })

    const input = wrapper.find('textarea')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('輸入 @, # 或 : 來提及')
    expect(input.attributes('rows')).toBe('5')

    wrapper.unmount()
  })

  it('reflects the initial value prop', () => {
    const wrapper = mount(MentionableTextArea, {
      props: { value: 'hello' },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('textarea').element as HTMLTextAreaElement).value,
    ).toBe('hello')

    wrapper.unmount()
  })

  it('does not render the mention dropdown before any trigger character is typed', () => {
    const wrapper = mount(MentionableTextArea, { attachTo: document.body })

    expect(document.querySelector('.sh-mentionable-dropdown')).toBeNull()

    wrapper.unmount()
  })
})

describe('MentionableTextArea — v-model', () => {
  it('typing plain text emits update:value and change with the new value', async () => {
    const wrapper = mount(MentionableTextArea, {
      props: { value: '' },
      attachTo: document.body,
    })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('hello world')

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![0]).toEqual(['hello world'])

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![0]).toEqual(['hello world'])

    wrapper.unmount()
  })

  it('syncs external value prop updates into the rendered textarea', async () => {
    const wrapper = mount(MentionableTextArea, {
      props: { value: 'foo' },
      attachTo: document.body,
    })

    await wrapper.setProps({ value: 'bar' })
    await settle()

    expect(
      (wrapper.find('textarea').element as HTMLTextAreaElement).value,
    ).toBe('bar')

    wrapper.unmount()
  })
})

describe('MentionableTextArea — disabled', () => {
  it('applies the native disabled attribute to the textarea', () => {
    const wrapper = mount(MentionableTextArea, {
      props: { disabled: true },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('textarea').element as HTMLTextAreaElement).disabled,
    ).toBe(true)

    wrapper.unmount()
  })

  it('applies the is-disabled class to the wrapper', () => {
    const wrapper = mount(MentionableTextArea, {
      props: { disabled: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-textarea-wrapper').classes()).toContain(
      'is-disabled',
    )

    wrapper.unmount()
  })
})

describe('MentionableTextArea — focus/blur', () => {
  it('emits focus with a FocusEvent when the textarea gains focus', async () => {
    const wrapper = mount(MentionableTextArea, { attachTo: document.body })

    await wrapper.find('textarea').trigger('focus')

    const emitted = wrapper.emitted('focus')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })

  it('emits blur with a FocusEvent when the textarea loses focus', async () => {
    const wrapper = mount(MentionableTextArea, { attachTo: document.body })

    await wrapper.find('textarea').trigger('blur')

    const emitted = wrapper.emitted('blur')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })
})
