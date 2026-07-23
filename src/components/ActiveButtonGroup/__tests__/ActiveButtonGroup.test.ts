import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { h } from 'vue'
import ActiveButtonGroup from '../index.vue'
import ActiveButtonItem from '../ActiveButtonItem.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

/** Mount the group with 3 real ActiveButtonItem children (provide/inject needs real children). */
function mountGroup(
  props: Record<string, unknown> = {},
  itemOverrides: Record<string, unknown>[] = [],
) {
  const items = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ]

  return mount(ActiveButtonGroup, {
    props,
    attachTo: document.body,
    slots: {
      default: () =>
        items.map((item, index) =>
          h(
            ActiveButtonItem,
            { value: item.value, ...(itemOverrides[index] ?? {}) },
            () => item.label,
          ),
        ),
    },
  })
}

describe('ActiveButtonGroup — rendering', () => {
  it('renders each child item with its slot content', () => {
    const wrapper = mountGroup({ value: 'a' })

    const items = wrapper.findAll('.sh-active-button-item')
    expect(items).toHaveLength(3)
    expect(items.map((item) => item.text())).toEqual(['A', 'B', 'C'])

    wrapper.unmount()
  })

  it('marks the item matching `value` as active', () => {
    const wrapper = mountGroup({ value: 'b' })

    const items = wrapper.findAll('.sh-active-button-item')
    expect(items[0].classes()).not.toContain('sh-active-button-item--active')
    expect(items[1].classes()).toContain('sh-active-button-item--active')
    expect(items[2].classes()).not.toContain('sh-active-button-item--active')

    wrapper.unmount()
  })
})

describe('ActiveButtonGroup — v-model', () => {
  it('clicking an inactive item emits update:value and change with its value', async () => {
    const wrapper = mountGroup({ value: 'a' })

    await wrapper.findAll('.sh-active-button-item')[1].trigger('click')

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![0]).toEqual(['b'])

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![0]).toEqual(['b'])

    wrapper.unmount()
  })

  it('does not emit when clicking the already-active item', async () => {
    const wrapper = mountGroup({ value: 'a' })

    await wrapper.findAll('.sh-active-button-item')[0].trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })

  it('moves the active class to the new item once the value prop is updated (round trip)', async () => {
    const wrapper = mountGroup({ value: 'a' })

    await wrapper.findAll('.sh-active-button-item')[1].trigger('click')
    const newValue = wrapper.emitted('update:value')![0][0] as string
    await wrapper.setProps({ value: newValue })

    const items = wrapper.findAll('.sh-active-button-item')
    expect(items[0].classes()).not.toContain('sh-active-button-item--active')
    expect(items[1].classes()).toContain('sh-active-button-item--active')

    wrapper.unmount()
  })
})

describe('ActiveButtonGroup — disabled item', () => {
  it('applies the native disabled attribute and disabled class to a disabled item', () => {
    const wrapper = mountGroup({ value: 'a' }, [{}, { disabled: true }, {}])

    const disabledItem = wrapper.findAll('.sh-active-button-item')[1]
    expect((disabledItem.element as HTMLButtonElement).disabled).toBe(true)
    expect(disabledItem.classes()).toContain('sh-active-button-item--disabled')

    wrapper.unmount()
  })

  it('does not respond to clicks on a disabled item', async () => {
    const wrapper = mountGroup({ value: 'a' }, [{}, { disabled: true }, {}])

    await wrapper.findAll('.sh-active-button-item')[1].trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('ActiveButtonGroup — block', () => {
  it('applies the block class to the root element when block is true', () => {
    const wrapper = mountGroup({ value: 'a', block: true })

    expect(wrapper.classes()).toContain('sh-active-button-group--block')

    wrapper.unmount()
  })

  it('does not apply the block class by default', () => {
    const wrapper = mountGroup({ value: 'a' })

    expect(wrapper.classes()).not.toContain('sh-active-button-group--block')

    wrapper.unmount()
  })
})
