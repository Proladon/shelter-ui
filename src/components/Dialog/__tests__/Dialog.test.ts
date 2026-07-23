import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import Dialog from '../index.vue'

/** Wait for reka-ui's internal state sync after a controlled-prop update. */
async function settle() {
  await nextTick()
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Dialog — rendering', () => {
  it('does not render content in the DOM by default (closed)', () => {
    const wrapper = mount(Dialog, {
      props: { title: 'Test Dialog' },
      attachTo: document.body,
    })

    expect(document.querySelector('.sh-dialog')).toBeNull()

    wrapper.unmount()
  })

  it('renders content when value is true', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true, title: 'Test Dialog' },
      attachTo: document.body,
    })
    await settle()

    const content = document.querySelector('.sh-dialog')
    expect(content).not.toBeNull()
    expect(document.querySelector('.sh-dialog__title')?.textContent).toContain(
      'Test Dialog',
    )

    wrapper.unmount()
  })

  it('applies the type class to the content', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true, type: 'danger' },
      attachTo: document.body,
    })
    await settle()

    expect(document.querySelector('.sh-dialog.type-danger')).not.toBeNull()

    wrapper.unmount()
  })

  it('renders description, default and footer slot content', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true },
      slots: {
        description: 'My description',
        default: '<p class="body-content">Body</p>',
        footer: '<button class="footer-btn">Footer action</button>',
      },
      attachTo: document.body,
    })
    await settle()

    expect(document.querySelector('.sh-dialog__description')?.textContent).toContain(
      'My description',
    )
    expect(document.querySelector('.body-content')).not.toBeNull()
    expect(document.querySelector('.footer-btn')).not.toBeNull()

    wrapper.unmount()
  })

  it('hides the close button when hideClose is true', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true, hideClose: true },
      attachTo: document.body,
    })
    await settle()

    expect(document.querySelector('.sh-dialog__close')).toBeNull()

    wrapper.unmount()
  })

  it('shows the close button by default', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()

    expect(document.querySelector('.sh-dialog__close')).not.toBeNull()

    wrapper.unmount()
  })
})

describe('Dialog — trigger slot', () => {
  it('opens when the exposed trigger slot binding is clicked', async () => {
    const wrapper = mount(Dialog, {
      props: { title: 'Triggered Dialog' },
      slots: {
        trigger: `<template #trigger="{ Dialog }"><component :is="Dialog">Open</component></template>`,
      },
      attachTo: document.body,
    })

    expect(document.querySelector('.sh-dialog')).toBeNull()

    await wrapper.find('button').trigger('click')
    await settle()

    expect(document.querySelector('.sh-dialog')).not.toBeNull()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([true])

    wrapper.unmount()
  })
})

describe('Dialog — v-model', () => {
  it('emits update:value(false) then reacts when the parent updates the controlled prop', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()
    expect(document.querySelector('.sh-dialog')).not.toBeNull()

    await wrapper.setProps({ value: false })
    await settle()

    expect(document.querySelector('.sh-dialog')).toBeNull()

    wrapper.unmount()
  })
})

describe('Dialog — closing', () => {
  it('clicking the close button emits update:value(false) and removes content', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()

    const closeBtn = document.querySelector(
      '.sh-dialog__close',
    ) as HTMLElement
    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![emitted!.length - 1]).toEqual([false])

    wrapper.unmount()
  })

  it('pressing Escape closes the dialog', async () => {
    const wrapper = mount(Dialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()
    expect(document.querySelector('.sh-dialog')).not.toBeNull()

    const content = document.querySelector('.sh-dialog') as HTMLElement
    content.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    )
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![emitted!.length - 1]).toEqual([false])

    wrapper.unmount()
  })
})
