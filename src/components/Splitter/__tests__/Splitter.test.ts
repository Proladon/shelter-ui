import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { h, nextTick } from 'vue'
import SplitterGroup from '../SplitterGroup.vue'
import SplitterPanel from '../SplitterPanel.vue'
import SplitterResizeHandle from '../SplitterResizeHandle.vue'
import SHSplitter from '../index.vue'

/** Wait for reka-ui's internal layout-initialization watcher to fire and emit. */
async function settle() {
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('SplitterGroup/SplitterPanel/SplitterResizeHandle — rendering', () => {
  it('renders a panel group with two panels and a resize handle between them', async () => {
    const wrapper = mount(SplitterGroup, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 50 }),
          h(SplitterResizeHandle),
          h(SplitterPanel, { defaultSize: 50 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    const group = wrapper.find('[data-panel-group]')
    expect(group.exists()).toBe(true)
    expect(group.attributes('data-orientation')).toBe('horizontal')
    expect(group.classes()).toContain('sh-splitter-group')
    expect(group.classes()).toContain('sh-splitter-group--horizontal')

    expect(wrapper.findAll('[data-panel]')).toHaveLength(2)

    const handle = wrapper.find('[data-resize-handle]')
    expect(handle.exists()).toBe(true)
    expect(handle.attributes('role')).toBe('separator')
    expect(handle.attributes('data-orientation')).toBe('horizontal')

    wrapper.unmount()
  })

  it('applies the vertical orientation class/attribute when direction is vertical', async () => {
    const wrapper = mount(SplitterGroup, {
      props: { direction: 'vertical' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 50 }),
          h(SplitterResizeHandle),
          h(SplitterPanel, { defaultSize: 50 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    const group = wrapper.find('[data-panel-group]')
    expect(group.attributes('data-orientation')).toBe('vertical')
    expect(group.classes()).toContain('sh-splitter-group--vertical')

    wrapper.unmount()
  })
})

describe('SplitterGroup — layout emit', () => {
  it('emits "layout" with an even split once mounted (2 panels, no defaultSize skew)', async () => {
    const wrapper = mount(SplitterGroup, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(SplitterPanel, {}),
          h(SplitterResizeHandle),
          h(SplitterPanel, {}),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    const emitted = wrapper.emitted('layout')
    expect(emitted).toBeTruthy()
    const [layout] = emitted![emitted!.length - 1] as [number[]]
    expect(layout).toHaveLength(2)
    expect(layout[0]).toBeCloseTo(50, 0)
    expect(layout[1]).toBeCloseTo(50, 0)

    wrapper.unmount()
  })

  it('respects an explicit defaultSize split', async () => {
    const wrapper = mount(SplitterGroup, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 30 }),
          h(SplitterResizeHandle),
          h(SplitterPanel, { defaultSize: 70 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    const emitted = wrapper.emitted('layout')
    const [layout] = emitted![emitted!.length - 1] as [number[]]
    expect(layout[0]).toBeCloseTo(30, 0)
    expect(layout[1]).toBeCloseTo(70, 0)

    wrapper.unmount()
  })
})

describe('SplitterResizeHandle — keyboard resize', () => {
  it('shrinks/grows adjacent panels and re-emits "layout" on ArrowRight (horizontal)', async () => {
    const wrapper = mount(SplitterGroup, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 50 }),
          h(SplitterResizeHandle),
          h(SplitterPanel, { defaultSize: 50 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    const emittedBefore = wrapper.emitted('layout')!.length

    const handle = wrapper.find('[data-resize-handle]')
    await handle.trigger('focus')
    await handle.trigger('keydown', { key: 'ArrowRight' })
    await settle()

    const emitted = wrapper.emitted('layout')!
    expect(emitted.length).toBeGreaterThan(emittedBefore)

    const [layout] = emitted[emitted.length - 1] as [number[]]
    // Default keyboardResizeBy is 10: the panel before the handle grows,
    // the panel after it shrinks by the same amount.
    expect(layout[0]).toBeCloseTo(60, 0)
    expect(layout[1]).toBeCloseTo(40, 0)

    const panels = wrapper.findAll('[data-panel]')
    expect(Number(panels[0].attributes('data-panel-size'))).toBeCloseTo(60, 0)
    expect(Number(panels[1].attributes('data-panel-size'))).toBeCloseTo(40, 0)

    wrapper.unmount()
  })

  it('resizes to the full extent on Home/End', async () => {
    const wrapper = mount(SplitterGroup, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 50 }),
          h(SplitterResizeHandle),
          h(SplitterPanel, { defaultSize: 50 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    const handle = wrapper.find('[data-resize-handle]')
    await handle.trigger('keydown', { key: 'End' })
    await settle()

    const emitted = wrapper.emitted('layout')!
    const [layout] = emitted[emitted.length - 1] as [number[]]
    expect(layout[0]).toBeCloseTo(100, 0)
    expect(layout[1]).toBeCloseTo(0, 0)

    wrapper.unmount()
  })
})

describe('SplitterResizeHandle — disabled', () => {
  it('marks the handle as data-disabled and blocks keyboard resizing', async () => {
    const wrapper = mount(SplitterGroup, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 50 }),
          h(SplitterResizeHandle, { disabled: true }),
          h(SplitterPanel, { defaultSize: 50 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    const handle = wrapper.find('[data-resize-handle]')
    expect(handle.attributes('data-disabled')).toBe('')

    const emittedBefore = wrapper.emitted('layout')!.length

    await handle.trigger('focus')
    await handle.trigger('keydown', { key: 'ArrowRight' })
    await settle()

    // The disabled handle never registers a keydown listener with reka-ui,
    // so no additional "layout" event should have been emitted, and the
    // panel split should remain untouched.
    expect(wrapper.emitted('layout')!.length).toBe(emittedBefore)

    const panels = wrapper.findAll('[data-panel]')
    expect(Number(panels[0].attributes('data-panel-size'))).toBeCloseTo(50, 0)
    expect(Number(panels[1].attributes('data-panel-size'))).toBeCloseTo(50, 0)

    wrapper.unmount()
  })
})

describe('SHSplitter (deprecated wrapper) — smoke test', () => {
  it('still renders the expected panel-group structure', async () => {
    const wrapper = mount(SHSplitter, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 40 }),
          h(SplitterResizeHandle),
          h(SplitterPanel, { defaultSize: 60 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    expect(wrapper.find('[data-panel-group]').exists()).toBe(true)
    expect(wrapper.findAll('[data-panel]')).toHaveLength(2)
    expect(wrapper.find('[data-resize-handle]').exists()).toBe(true)

    const emitted = wrapper.emitted('layout')
    expect(emitted).toBeTruthy()

    wrapper.unmount()
  })

  it('forwards the `color` prop through to the rendered element (regression: used to be silently dropped)', async () => {
    const wrapper = mount(SHSplitter, {
      props: { direction: 'horizontal', color: 'rgb(255, 0, 0)' },
      slots: {
        default: () => [
          h(SplitterPanel, { defaultSize: 50 }),
          h(SplitterResizeHandle),
          h(SplitterPanel, { defaultSize: 50 }),
        ],
      },
      attachTo: document.body,
    })
    await settle()

    expect(wrapper.find('[data-panel-group]').attributes('color')).toBe(
      'rgb(255, 0, 0)',
    )

    wrapper.unmount()
  })
})
