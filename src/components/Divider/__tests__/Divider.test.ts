import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Divider from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Divider — rendering', () => {
  it('renders the divider element with horizontal orientation by default', () => {
    const wrapper = mount(Divider, { attachTo: document.body })

    const divider = wrapper.find('.sh-divider')
    expect(divider.exists()).toBe(true)
    expect(divider.attributes('role')).toBe('separator')
    expect(divider.attributes('aria-orientation')).toBe('horizontal')
    expect(divider.attributes('data-orientation')).toBe('horizontal')

    wrapper.unmount()
  })

  it('renders default slot content inside the divider', () => {
    const wrapper = mount(Divider, {
      slots: { default: 'OR' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-divider').text()).toBe('OR')

    wrapper.unmount()
  })
})

describe('Divider — orientation', () => {
  it('applies vertical orientation attributes when orientation is "vertical"', () => {
    const wrapper = mount(Divider, {
      props: { orientation: 'vertical' },
      attachTo: document.body,
    })

    const divider = wrapper.find('.sh-divider')
    expect(divider.attributes('aria-orientation')).toBe('vertical')
    expect(divider.attributes('data-orientation')).toBe('vertical')

    wrapper.unmount()
  })
})
