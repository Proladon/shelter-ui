import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { h } from 'vue'
import MessageBox from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('MessageBox — rendering', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(MessageBox, {
      slots: { default: 'Hello from MessageBox' },
      attachTo: document.body,
    })

    expect(wrapper.text()).toContain('Hello from MessageBox')

    wrapper.unmount()
  })

  it('defaults to the info type', () => {
    const wrapper = mount(MessageBox, { attachTo: document.body })

    expect(wrapper.classes()).toContain('type-info')

    wrapper.unmount()
  })

  it.each([
    ['info', 'tabler-icon-info-circle'],
    ['danger', 'tabler-icon-x'],
    ['success', 'tabler-icon-circle-check'],
    ['warning', 'tabler-icon-alert-triangle'],
    ['default', 'tabler-icon-info-square'],
  ] as const)('applies type-%s and renders its mapped icon', (type, iconClass) => {
    const wrapper = mount(MessageBox, {
      props: { type },
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain(`type-${type}`)
    expect(wrapper.find(`.sh-message-box__icon svg.${iconClass}`).exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('MessageBox — icon override', () => {
  it('renders a custom component passed via the icon prop instead of the type icon', () => {
    const CustomIcon = { name: 'CustomIcon', render: () => h('span', { class: 'custom-icon-marker' }) }
    const wrapper = mount(MessageBox, {
      props: { type: 'info', icon: CustomIcon },
      attachTo: document.body,
    })

    expect(wrapper.find('.custom-icon-marker').exists()).toBe(true)

    wrapper.unmount()
  })

  it('renders the #icon slot instead of the default icon when provided', () => {
    const wrapper = mount(MessageBox, {
      props: { type: 'danger' },
      slots: { icon: '<span class="slot-icon-marker">X</span>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.slot-icon-marker').exists()).toBe(true)
    // the type-based icon component should not also be rendered
    expect(wrapper.find('.sh-message-box__icon svg').exists()).toBe(false)

    wrapper.unmount()
  })

  it('ignores a string icon prop and falls back to the type-based icon (current behavior)', () => {
    // MessageBoxProps.icon is typed as `string | Component`, but the component's
    // `iconComponent` computed only accepts icons where `typeof icon === 'object'`,
    // so a string value is silently ignored and the type-based icon is used instead.
    const wrapper = mount(MessageBox, {
      props: { type: 'success', icon: '<svg><rect/></svg>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-message-box__icon svg').exists()).toBe(true)
    expect(wrapper.html()).not.toContain('<rect')

    wrapper.unmount()
  })
})
