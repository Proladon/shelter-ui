import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { h } from 'vue'
import InputGroup from '../index.vue'
import InputGroupAddon from '../InputGroupAddon.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('InputGroup — rendering', () => {
  it('renders default slot content inside the group container', () => {
    const wrapper = mount(InputGroup, {
      slots: { default: () => h('input', { class: 'fake-input' }) },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-group').exists()).toBe(true)
    expect(wrapper.find('.fake-input').exists()).toBe(true)

    wrapper.unmount()
  })

  it('composes an addon and an input together, in slot order, inside the group', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: () => [
          h(InputGroupAddon, null, { default: () => 'https://' }),
          h('input', { class: 'fake-input', placeholder: 'example.com' }),
        ],
      },
      attachTo: document.body,
    })

    const group = wrapper.find('.sh-input-group')
    expect(group.exists()).toBe(true)

    const addon = wrapper.find('.sh-input-group-addon')
    expect(addon.exists()).toBe(true)
    expect(addon.text()).toBe('https://')

    const input = wrapper.find('.fake-input')
    expect(input.exists()).toBe(true)

    // Addon should precede the input in DOM order, matching the slot order.
    const children = Array.from(group.element.children)
    expect(children.indexOf(addon.element)).toBeLessThan(
      children.indexOf(input.element),
    )

    wrapper.unmount()
  })

  it('renders multiple addons alongside an input (prefix + suffix)', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: () => [
          h(InputGroupAddon, null, { default: () => '$' }),
          h('input', { class: 'fake-input' }),
          h(InputGroupAddon, null, { default: () => 'USD' }),
        ],
      },
      attachTo: document.body,
    })

    const addons = wrapper.findAll('.sh-input-group-addon')
    expect(addons).toHaveLength(2)
    expect(addons[0].text()).toBe('$')
    expect(addons[1].text()).toBe('USD')

    wrapper.unmount()
  })
})

describe('InputGroupAddon — rendering', () => {
  it('renders slot content inside the addon', () => {
    const wrapper = mount(InputGroupAddon, {
      slots: { default: '$' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-group-addon').text()).toBe('$')

    wrapper.unmount()
  })

  it('defaults to inline alignment (no block-start/block-end modifier)', () => {
    const wrapper = mount(InputGroupAddon, { attachTo: document.body })

    const addon = wrapper.find('.sh-input-group-addon')
    expect(addon.classes()).not.toContain('sh-input-group-addon--block-start')
    expect(addon.classes()).not.toContain('sh-input-group-addon--block-end')

    wrapper.unmount()
  })

  it('applies the block-start modifier class when align is "block-start"', () => {
    const wrapper = mount(InputGroupAddon, {
      props: { align: 'block-start' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-group-addon').classes()).toContain(
      'sh-input-group-addon--block-start',
    )

    wrapper.unmount()
  })

  it('applies the block-end modifier class when align is "block-end"', () => {
    const wrapper = mount(InputGroupAddon, {
      props: { align: 'block-end' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-input-group-addon').classes()).toContain(
      'sh-input-group-addon--block-end',
    )

    wrapper.unmount()
  })
})
