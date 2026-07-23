import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Tag from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Tag — rendering', () => {
  it('renders the value text', () => {
    const wrapper = mount(Tag, {
      props: { value: 'Hello' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-tag__label').text()).toBe('Hello')

    wrapper.unmount()
  })

  it('renders nothing for the label when value is empty', () => {
    const wrapper = mount(Tag, { attachTo: document.body })

    expect(wrapper.find('.sh-tag__label').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('Tag — type', () => {
  it('applies the sh-tag--{type} class for a given type', () => {
    const wrapper = mount(Tag, {
      props: { value: 'X', type: 'danger' },
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('sh-tag--danger')

    wrapper.unmount()
  })

  it('defaults to the primary type class', () => {
    const wrapper = mount(Tag, {
      props: { value: 'X' },
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('sh-tag--primary')

    wrapper.unmount()
  })
})

describe('Tag — size', () => {
  it('applies the sh-tag--{size} class for a given size', () => {
    const wrapper = mount(Tag, {
      props: { value: 'X', size: 'large' },
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('sh-tag--large')

    wrapper.unmount()
  })

  it('defaults to the medium size class', () => {
    const wrapper = mount(Tag, {
      props: { value: 'X' },
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('sh-tag--medium')

    wrapper.unmount()
  })
})
