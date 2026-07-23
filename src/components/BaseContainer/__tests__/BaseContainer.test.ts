import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import BaseContainer from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('BaseContainer — rendering', () => {
  it('renders default slot content', () => {
    const wrapper = mount(BaseContainer, {
      slots: { default: '<p>Hello world</p>' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-base-container__content p').text()).toBe(
      'Hello world',
    )

    wrapper.unmount()
  })
})

describe('BaseContainer — click', () => {
  it('emits click with a MouseEvent when clicked', async () => {
    const wrapper = mount(BaseContainer, { attachTo: document.body })

    await wrapper.find('.sh-base-container').trigger('click')

    const emitted = wrapper.emitted('click')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeInstanceOf(MouseEvent)

    wrapper.unmount()
  })
})

describe('BaseContainer — disabled', () => {
  it('does not emit click when disabled is true', async () => {
    const wrapper = mount(BaseContainer, {
      props: { disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-base-container').trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()

    wrapper.unmount()
  })
})
