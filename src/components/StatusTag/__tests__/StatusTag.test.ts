import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import StatusTag from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('StatusTag — rendering', () => {
  it('renders the value text and a status dot', () => {
    const wrapper = mount(StatusTag, {
      props: { value: 'Active', type: 'success' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-status-tag__label').text()).toBe('Active')
    expect(wrapper.find('.sh-status-tag__dot').exists()).toBe(true)

    wrapper.unmount()
  })

  it('renders nothing for the label when value is empty', () => {
    const wrapper = mount(StatusTag, { attachTo: document.body })

    expect(wrapper.find('.sh-status-tag__label').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders custom default slot content instead of the value text', () => {
    const wrapper = mount(StatusTag, {
      props: { value: 'Active' },
      slots: { default: '<span class="custom-label">Custom</span>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.custom-label').text()).toBe('Custom')
    expect(wrapper.find('.sh-status-tag__label').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('StatusTag — type color', () => {
  it('applies the primary color by default via inline style', () => {
    const wrapper = mount(StatusTag, {
      props: { value: 'X' },
      attachTo: document.body,
    })

    expect((wrapper.element as HTMLElement).style.color).toBe(
      'var(--sh-primary)',
    )
    const dot = wrapper.find('.sh-status-tag__dot')
    expect((dot.element as HTMLElement).style.backgroundColor).toBe(
      'var(--sh-primary)',
    )

    wrapper.unmount()
  })

  it('resolves a semantic type to its matching --sh-status-* color variable', () => {
    const wrapper = mount(StatusTag, {
      props: { value: 'X', type: 'danger' },
      attachTo: document.body,
    })

    expect((wrapper.element as HTMLElement).style.color).toBe(
      'var(--sh-status-danger)',
    )
    const dot = wrapper.find('.sh-status-tag__dot')
    expect((dot.element as HTMLElement).style.backgroundColor).toBe(
      'var(--sh-status-danger)',
    )

    wrapper.unmount()
  })
})

describe('StatusTag — loading', () => {
  it('shows the status dot (not a spinner) by default', () => {
    const wrapper = mount(StatusTag, {
      props: { value: 'X' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-status-tag__dot').exists()).toBe(true)
    expect(wrapper.find('.loader').exists()).toBe(false)

    wrapper.unmount()
  })

  it('shows a spinner instead of the dot when loading is true', () => {
    const wrapper = mount(StatusTag, {
      props: { value: 'X', loading: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-status-tag__dot').exists()).toBe(false)
    expect(wrapper.find('.loader').exists()).toBe(true)

    wrapper.unmount()
  })
})
