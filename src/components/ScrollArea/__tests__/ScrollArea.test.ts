import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import ScrollArea from '../index.vue'
import type { ScrollAreaMethods } from '../types'

/** Wait for reka-ui's internal state (Presence/context) to settle after mount. */
async function settle() {
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('ScrollArea — rendering', () => {
  it('renders default slot content inside the viewport', () => {
    const wrapper = mount(ScrollArea, {
      slots: { default: '<p>Hello scroll area</p>' },
      attachTo: document.body,
    })

    const viewport = wrapper.find('.sh-scroll-viewport')
    expect(viewport.exists()).toBe(true)
    expect(viewport.find('p').text()).toBe('Hello scroll area')

    wrapper.unmount()
  })
})

describe('ScrollArea — visibility', () => {
  it('does not render a scrollbar element by default (hover) before any interaction', async () => {
    const wrapper = mount(ScrollArea, {
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })
    await settle()

    expect(wrapper.find('.sh-scrollbar').exists()).toBe(false)

    wrapper.unmount()
  })

  it('immediately renders the scrollbar with data-state="visible" when visibility is "always"', async () => {
    const wrapper = mount(ScrollArea, {
      props: { visibility: 'always' },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })
    await settle()

    const scrollbar = wrapper.find('.sh-scrollbar')
    expect(scrollbar.exists()).toBe(true)
    expect(scrollbar.attributes('data-state')).toBe('visible')

    wrapper.unmount()
  })

  it('does not render a scrollbar for "scroll" visibility before any scroll interaction', async () => {
    const wrapper = mount(ScrollArea, {
      props: { visibility: 'scroll' },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })
    await settle()

    expect(wrapper.find('.sh-scrollbar').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('ScrollArea — scrollX/scrollY', () => {
  it('renders no scrollbar at all when scrollX and scrollY are both false, even when visibility is "always"', async () => {
    const wrapper = mount(ScrollArea, {
      props: { visibility: 'always', scrollX: false, scrollY: false },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })
    await settle()

    expect(wrapper.find('.sh-scrollbar').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders both a vertical and a horizontal scrollbar when scrollX and scrollY are both enabled', async () => {
    // Note: reka-ui's <ScrollAreaCorner> only renders once it measures a
    // non-zero offsetWidth/offsetHeight from the two scrollbars via
    // ResizeObserver — happy-dom never computes real layout, so the corner
    // itself is not asserted here; this checks the layout-independent part.
    const wrapper = mount(ScrollArea, {
      props: { visibility: 'always', scrollX: true, scrollY: true },
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })
    await settle()

    expect(wrapper.findAll('.sh-scrollbar')).toHaveLength(2)

    wrapper.unmount()
  })
})

describe('ScrollArea — exposed methods', () => {
  it('getViewport returns the mounted viewport element', () => {
    const wrapper = mount(ScrollArea, {
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })

    const vm = wrapper.vm as unknown as ScrollAreaMethods
    const viewportEl = vm.getViewport()

    expect(viewportEl).not.toBeNull()
    expect(viewportEl?.classList.contains('sh-scroll-viewport')).toBe(true)

    wrapper.unmount()
  })

  it('scrollTo forwards options to the viewport element and updates scrollTop synchronously', () => {
    const wrapper = mount(ScrollArea, {
      slots: { default: '<div>content</div>' },
      attachTo: document.body,
    })

    const vm = wrapper.vm as unknown as ScrollAreaMethods
    vm.scrollTo({ top: 40 })

    expect(vm.getViewport()?.scrollTop).toBe(40)

    wrapper.unmount()
  })
})
