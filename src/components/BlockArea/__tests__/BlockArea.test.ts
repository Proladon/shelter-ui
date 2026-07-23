import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { IconLock } from '@tabler/icons-vue'
import BlockArea from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('BlockArea — rendering', () => {
  it('always renders the default slot content', () => {
    const wrapper = mount(BlockArea, {
      slots: { default: '<p class="my-content">Protected content</p>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.my-content').text()).toBe('Protected content')

    wrapper.unmount()
  })
})

describe('BlockArea — active', () => {
  it('hides the mask/overlay when active is true (default)', () => {
    const wrapper = mount(BlockArea, {
      props: { text: 'Locked' },
      slots: { default: '<p>content</p>' },
      attachTo: document.body,
    })

    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.find('.sh-block-area__mask').exists()).toBe(false)
    expect(wrapper.find('.sh-block-area__overlay').exists()).toBe(false)

    wrapper.unmount()
  })

  it('shows the mask/overlay when active is false, with content still present underneath', () => {
    const wrapper = mount(BlockArea, {
      props: { active: false, text: 'Locked' },
      slots: { default: '<p>content</p>' },
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('.sh-block-area__mask').exists()).toBe(true)
    expect(wrapper.find('.sh-block-area__overlay').exists()).toBe(true)
    expect(wrapper.find('.sh-block-area__content').exists()).toBe(true)

    wrapper.unmount()
  })

  it('toggles the mask as the active prop is updated (round trip)', async () => {
    const wrapper = mount(BlockArea, {
      props: { active: true, text: 'Locked' },
      slots: { default: '<p>content</p>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-block-area__mask').exists()).toBe(false)

    await wrapper.setProps({ active: false })
    expect(wrapper.find('.sh-block-area__mask').exists()).toBe(true)

    await wrapper.setProps({ active: true })
    expect(wrapper.find('.sh-block-area__mask').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('BlockArea — icon/text slots', () => {
  it('renders no indicator at all when neither icon/text props nor slots are given', () => {
    const wrapper = mount(BlockArea, {
      props: { active: false },
      slots: { default: '<p>content</p>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-block-area__indicator').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders the icon prop component and text prop as fallback content', () => {
    const wrapper = mount(BlockArea, {
      props: { active: false, icon: IconLock, text: 'Locked' },
      slots: { default: '<p>content</p>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-block-area__icon').exists()).toBe(true)
    expect(wrapper.find('.sh-block-area__text').text()).toBe('Locked')

    wrapper.unmount()
  })

  it('renders custom icon/text slot content instead of the prop-driven fallback', () => {
    const wrapper = mount(BlockArea, {
      props: { active: false, icon: IconLock, text: 'Locked' },
      slots: {
        default: '<p>content</p>',
        icon: '<span class="custom-icon">ICON</span>',
        text: '<span class="custom-text">Custom text</span>',
      },
      attachTo: document.body,
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-text').text()).toBe('Custom text')
    // Fallback markup is fully displaced, not merged alongside custom slot content
    expect(wrapper.find('.sh-block-area__icon').exists()).toBe(false)
    expect(wrapper.find('.sh-block-area__text').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders custom icon/text slots even when the icon/text props are not set', () => {
    const wrapper = mount(BlockArea, {
      props: { active: false },
      slots: {
        default: '<p>content</p>',
        icon: '<span class="custom-icon">ICON</span>',
        text: '<span class="custom-text">Custom text</span>',
      },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-block-area__indicator').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-text').text()).toBe('Custom text')

    wrapper.unmount()
  })
})
