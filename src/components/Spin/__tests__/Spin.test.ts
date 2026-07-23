import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Spin from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Spin — rendering', () => {
  it('renders default slot content alongside the spinner', () => {
    const wrapper = mount(Spin, {
      slots: { default: '<div class="my-content">Loaded content</div>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.my-content').exists()).toBe(true)
    expect(wrapper.find('.my-content').text()).toBe('Loaded content')

    wrapper.unmount()
  })

  it('renders the spinner body directly when there is no default slot', () => {
    const wrapper = mount(Spin, { attachTo: document.body })

    expect(wrapper.find('.sh-spin__container').exists()).toBe(false)
    expect(wrapper.find('.sh-spin__body').exists()).toBe(true)
    expect(wrapper.find('.sh-spin__icon').exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('Spin — v-model:value', () => {
  it('shows the loading mask by default (value defaults to true)', () => {
    const wrapper = mount(Spin, {
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-spin__mask').exists()).toBe(true)

    wrapper.unmount()
  })

  it('hides the loading mask when value is false', () => {
    const wrapper = mount(Spin, {
      props: { value: false },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-spin__mask').exists()).toBe(false)

    wrapper.unmount()
  })

  it('toggles the mask as the value prop is updated (round trip)', async () => {
    const wrapper = mount(Spin, {
      props: { value: false },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-spin__mask').exists()).toBe(false)

    await wrapper.setProps({ value: true })
    expect(wrapper.find('.sh-spin__mask').exists()).toBe(true)

    await wrapper.setProps({ value: false })
    expect(wrapper.find('.sh-spin__mask').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('Spin — content blocking while loading', () => {
  it('disables pointer events and dims the content while the mask is shown', () => {
    const wrapper = mount(Spin, {
      props: { value: true },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })

    const content = wrapper.find('.sh-spin__content')
    expect((content.element as HTMLElement).style.pointerEvents).toBe('none')
    expect((content.element as HTMLElement).style.opacity).toBe('0.5')

    wrapper.unmount()
  })

  it('restores pointer events and full opacity once the mask is hidden', () => {
    const wrapper = mount(Spin, {
      props: { value: false },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })

    const content = wrapper.find('.sh-spin__content')
    expect((content.element as HTMLElement).style.pointerEvents).toBe('auto')
    expect((content.element as HTMLElement).style.opacity).toBe('1')

    wrapper.unmount()
  })
})

describe('Spin — size', () => {
  it('applies a numeric size directly as the spinner diameter and root class', () => {
    const wrapper = mount(Spin, {
      props: { size: 48 },
      attachTo: document.body,
    })

    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('48')
    expect(svg.attributes('height')).toBe('48')
    expect(wrapper.classes()).toContain('sh-spin--48')

    wrapper.unmount()
  })

  it('defaults to a 36px diameter (medium)', () => {
    const wrapper = mount(Spin, { attachTo: document.body })

    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('36')
    expect(wrapper.classes()).toContain('sh-spin--36')

    wrapper.unmount()
  })

  it('resolves "small" to a 24px spinner diameter, but the root class tracks the resolved number rather than the keyword', () => {
    const wrapper = mount(Spin, {
      props: { size: 'small' },
      attachTo: document.body,
    })

    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('24')

    // Pre-existing mismatch: the root class is built from the resolved
    // numeric diameter (`sh-spin--24`), never from the original keyword, so
    // the `.sh-spin--small` CSS rule (e.g. the description font-size rule)
    // can never match a `size="small"` instance.
    expect(wrapper.classes()).toContain('sh-spin--24')
    expect(wrapper.classes()).not.toContain('sh-spin--small')

    wrapper.unmount()
  })
})
