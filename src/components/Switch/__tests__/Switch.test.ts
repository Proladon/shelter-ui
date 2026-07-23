import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Switch from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Switch — rendering', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(Switch, { attachTo: document.body })

    const root = wrapper.find('[role="switch"]')
    expect(root.exists()).toBe(true)
    expect(root.attributes('data-state')).toBe('unchecked')
    expect(root.attributes('aria-checked')).toBe('false')

    wrapper.unmount()
  })
})

describe('Switch — default slot', () => {
  it('renders default slot content next to the switch control', () => {
    const wrapper = mount(Switch, {
      slots: { default: '啟用' },
      attachTo: document.body,
    })

    expect(wrapper.text()).toContain('啟用')
    expect(wrapper.find('[role="switch"]').exists()).toBe(true)

    wrapper.unmount()
  })

  it('does not render the label element when no default slot content is passed', () => {
    const wrapper = mount(Switch, { attachTo: document.body })

    expect(document.querySelector('.shelter-switch-label')).toBeNull()

    wrapper.unmount()
  })
})

describe('Switch — v-model', () => {
  it('clicking toggles the value via update:value and change', async () => {
    const wrapper = mount(Switch, {
      props: { value: false },
      attachTo: document.body,
    })

    await wrapper.find('[role="switch"]').trigger('click')

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![0]).toEqual([true])

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![0]).toEqual([true])

    wrapper.unmount()
  })
})

describe('Switch — disabled', () => {
  it('does not emit update:value or change when disabled', async () => {
    const wrapper = mount(Switch, {
      props: { disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('[role="switch"]').trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Switch — readonly', () => {
  it('does not emit update:value or change when readonly', async () => {
    const wrapper = mount(Switch, {
      props: { readonly: true },
      attachTo: document.body,
    })

    await wrapper.find('[role="switch"]').trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })
})
