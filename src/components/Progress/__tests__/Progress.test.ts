import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Progress from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Progress — rendering', () => {
  it('fully recedes the indicator when value is unset', () => {
    const wrapper = mount(Progress, { attachTo: document.body })

    const indicator = wrapper.find('.sh-progress__indicator')
    expect((indicator.element as HTMLElement).style.transform).toBe(
      'translateX(-100%)',
    )

    wrapper.unmount()
  })

  it('translates the indicator according to the value prop', () => {
    const wrapper = mount(Progress, {
      props: { value: 40 },
      attachTo: document.body,
    })

    const indicator = wrapper.find('.sh-progress__indicator')
    expect((indicator.element as HTMLElement).style.transform).toBe(
      'translateX(-60%)',
    )

    wrapper.unmount()
  })
})

describe('Progress — text', () => {
  it('does not render display text by default (showText is false)', () => {
    const wrapper = mount(Progress, {
      props: { value: 50 },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-progress__text').exists()).toBe(false)

    wrapper.unmount()
  })

  it('shows the computed percentage when showText is true', () => {
    const wrapper = mount(Progress, {
      props: { value: 50, showText: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-progress__text').text()).toBe('50%')

    wrapper.unmount()
  })

  it('renders custom text slot content instead of the default display text', () => {
    const wrapper = mount(Progress, {
      props: { value: 50, showText: true },
      slots: { text: '<div class="custom-progress-text">Custom</div>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.custom-progress-text').text()).toBe('Custom')
    expect(wrapper.find('.sh-progress__text').exists()).toBe(false)

    wrapper.unmount()
  })
})
