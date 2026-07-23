import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { IconApple } from '@tabler/icons-vue'
import Chip from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Chip — rendering', () => {
  it('renders the label text', () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chip__label').text()).toBe('Vue')

    wrapper.unmount()
  })

  it('renders the icon prop component', () => {
    const wrapper = mount(Chip, {
      props: { label: 'Apple', icon: IconApple },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chip__icon').exists()).toBe(true)

    wrapper.unmount()
  })

  it('does not render a remove affordance by default', () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chip__remove-icon').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('Chip — removable', () => {
  it('shows a remove affordance when removable is true', () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue', removable: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chip__remove-icon').exists()).toBe(true)

    wrapper.unmount()
  })

  it('clicking the remove icon fires remove and hides the chip', async () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue', removable: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-chip__remove-icon').trigger('click')

    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.find('.sh-chip').exists()).toBe(false)

    wrapper.unmount()
  })

  it('pressing Backspace on the chip fires remove and hides it', async () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue', removable: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-chip').trigger('keydown', { key: 'Backspace' })

    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.find('.sh-chip').exists()).toBe(false)

    wrapper.unmount()
  })

  it('pressing Enter on the chip fires remove and hides it', async () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue', removable: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-chip').trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.find('.sh-chip').exists()).toBe(false)

    wrapper.unmount()
  })

  it('ignores unrelated keys', async () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue', removable: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-chip').trigger('keydown', { key: 'a' })

    expect(wrapper.emitted('remove')).toBeFalsy()
    expect(wrapper.find('.sh-chip').exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('Chip — disabled', () => {
  it('blocks removal via the remove icon when disabled', async () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue', removable: true, disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-chip__remove-icon').trigger('click')

    expect(wrapper.emitted('remove')).toBeFalsy()
    expect(wrapper.find('.sh-chip').exists()).toBe(true)

    wrapper.unmount()
  })

  it('blocks removal via keydown when disabled', async () => {
    const wrapper = mount(Chip, {
      props: { label: 'Vue', removable: true, disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-chip').trigger('keydown', { key: 'Backspace' })

    expect(wrapper.emitted('remove')).toBeFalsy()
    expect(wrapper.find('.sh-chip').exists()).toBe(true)

    wrapper.unmount()
  })
})
