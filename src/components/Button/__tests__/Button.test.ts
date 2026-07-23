import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Button from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Button — rendering', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click me')

    wrapper.unmount()
  })

  it('does not render a spinner when loading is false', () => {
    const wrapper = mount(Button, {
      props: { loading: false },
      slots: { default: 'Save' },
      attachTo: document.body,
    })

    expect(wrapper.find('.loader').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders a spinner when loading is true', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Save' },
      attachTo: document.body,
    })

    expect(wrapper.find('.loader').exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('Button — click', () => {
  it('emits click with a MouseEvent when clicked', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    const emitted = wrapper.emitted('click')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeInstanceOf(MouseEvent)

    wrapper.unmount()
  })
})

describe('Button — disabled', () => {
  it('applies the native disabled attribute', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      attachTo: document.body,
    })

    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBe(
      true,
    )

    wrapper.unmount()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Button — loading', () => {
  it('applies the native disabled attribute and shows the spinner', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      attachTo: document.body,
    })

    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBe(
      true,
    )
    expect(wrapper.find('.loader').exists()).toBe(true)

    wrapper.unmount()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Button — type/variant classes', () => {
  it('defaults to the fill variant of the default type', () => {
    const wrapper = mount(Button, { attachTo: document.body })

    expect(wrapper.find('button').classes()).toContain('sh-fill-default')

    wrapper.unmount()
  })

  it('applies sh-fill-{type} for a given type with no modifier', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-fill-primary')

    wrapper.unmount()
  })

  it('applies sh-ghost-{type} when ghost is true', () => {
    const wrapper = mount(Button, {
      props: { type: 'success', ghost: true },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-ghost-success')

    wrapper.unmount()
  })

  it('applies sh-text-{type} when text is true', () => {
    const wrapper = mount(Button, {
      props: { type: 'danger', text: true },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-text-danger')

    wrapper.unmount()
  })

  it('applies sh-outline-{type} when outline is true', () => {
    const wrapper = mount(Button, {
      props: { type: 'warning', outline: true },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-outline-warning')

    wrapper.unmount()
  })

  it('applies sh-dashed-{type} when dashed is true', () => {
    const wrapper = mount(Button, {
      props: { type: 'info', dashed: true },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-dashed-info')

    wrapper.unmount()
  })

  it('applies sh-bordered-{type} when bordered is true', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary', bordered: true },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-bordered-primary')

    wrapper.unmount()
  })
})

describe('Button — size classes', () => {
  it('defaults to sh-size-md', () => {
    const wrapper = mount(Button, { attachTo: document.body })

    expect(wrapper.find('button').classes()).toContain('sh-size-md')

    wrapper.unmount()
  })

  it('applies sh-size-sm for size="small"', () => {
    const wrapper = mount(Button, {
      props: { size: 'small' },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-size-sm')

    wrapper.unmount()
  })

  it('applies sh-size-lg for size="large"', () => {
    const wrapper = mount(Button, {
      props: { size: 'large' },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-size-lg')

    wrapper.unmount()
  })
})

describe('Button — block', () => {
  it('does not apply sh-button--block by default', () => {
    const wrapper = mount(Button, { attachTo: document.body })

    expect(wrapper.find('button').classes()).not.toContain('sh-button--block')

    wrapper.unmount()
  })

  it('applies sh-button--block when block is true', () => {
    const wrapper = mount(Button, {
      props: { block: true },
      attachTo: document.body,
    })

    expect(wrapper.find('button').classes()).toContain('sh-button--block')

    wrapper.unmount()
  })
})
