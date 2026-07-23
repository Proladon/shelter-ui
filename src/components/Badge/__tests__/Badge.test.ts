import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Badge from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Badge — rendering', () => {
  it('renders the default slot content it wraps', () => {
    const wrapper = mount(Badge, {
      props: { value: 3 },
      slots: { default: '<button>Inbox</button>' },
      attachTo: document.body,
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Inbox')

    wrapper.unmount()
  })

  it('renders the numeric value as the badge content', () => {
    const wrapper = mount(Badge, {
      props: { value: 5 },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-badge').text()).toBe('5')

    wrapper.unmount()
  })

  it('renders a dot with no text content when isDot is true', () => {
    const wrapper = mount(Badge, {
      props: { value: 5, isDot: true },
      attachTo: document.body,
    })

    const badge = wrapper.find('.sh-badge')
    expect(badge.classes()).toContain('is-dot')
    expect(badge.text()).toBe('')

    wrapper.unmount()
  })

  it('does not render the badge element when show is false', () => {
    const wrapper = mount(Badge, {
      props: { value: 5, show: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-badge').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('Badge — max overflow', () => {
  it('shows `{max}+` when value exceeds max', () => {
    const wrapper = mount(Badge, {
      props: { value: 150, max: 99 },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-badge').text()).toBe('99+')

    wrapper.unmount()
  })

  it('shows the raw value when it does not exceed max', () => {
    const wrapper = mount(Badge, {
      props: { value: 50, max: 99 },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-badge').text()).toBe('50')

    wrapper.unmount()
  })
})

describe('Badge — zero/undefined value', () => {
  it('renders "0" rather than hiding when value is exactly 0', () => {
    const wrapper = mount(Badge, {
      props: { value: 0 },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-badge').exists()).toBe(true)
    expect(wrapper.find('.sh-badge').text()).toBe('0')

    wrapper.unmount()
  })

  it('renders an empty badge element when value is left undefined', () => {
    const wrapper = mount(Badge, { attachTo: document.body })

    expect(wrapper.find('.sh-badge').exists()).toBe(true)
    expect(wrapper.find('.sh-badge').text()).toBe('')

    wrapper.unmount()
  })
})
