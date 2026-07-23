import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import AlertDialog from '../index.vue'

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

describe('AlertDialog — rendering', () => {
  it('does not render content in the DOM by default (closed)', () => {
    const wrapper = mount(AlertDialog, {
      props: { title: 'Confirm' },
      attachTo: document.body,
    })

    expect(document.querySelector('.sh-alert-dialog')).toBeNull()

    wrapper.unmount()
  })

  it('renders title/description and default danger type icon when value is true', async () => {
    const wrapper = mount(AlertDialog, {
      props: {
        value: true,
        title: '確認刪除',
        description: '此操作無法復原',
      },
      attachTo: document.body,
    })
    await settle()

    const content = document.querySelector('.sh-alert-dialog')
    expect(content).not.toBeNull()
    expect(document.querySelector('.sh-dialog__title')?.textContent).toContain(
      '確認刪除',
    )
    expect(
      document.querySelector('.sh-dialog__description')?.textContent,
    ).toContain('此操作無法復原')
    expect(
      document.querySelector('.sh-alert-dialog__icon-wrapper.type-danger'),
    ).not.toBeNull()

    wrapper.unmount()
  })

  it('renders default confirm/cancel button text', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()

    expect(
      document.querySelector('.sh-alert-dialog__confirm-btn')?.textContent,
    ).toContain('確認')
    expect(
      document.querySelector('.sh-alert-dialog__cancel-btn')?.textContent,
    ).toContain('取消')

    wrapper.unmount()
  })

  it('renders custom confirmText/cancelText', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true, confirmText: '發布', cancelText: '返回' },
      attachTo: document.body,
    })
    await settle()

    expect(
      document.querySelector('.sh-alert-dialog__confirm-btn')?.textContent,
    ).toContain('發布')
    expect(
      document.querySelector('.sh-alert-dialog__cancel-btn')?.textContent,
    ).toContain('返回')

    wrapper.unmount()
  })
})

describe('AlertDialog — v-model', () => {
  it('reacts when the parent updates the controlled value prop', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: false },
      attachTo: document.body,
    })
    await settle()
    expect(document.querySelector('.sh-alert-dialog')).toBeNull()

    await wrapper.setProps({ value: true })
    await settle()
    expect(document.querySelector('.sh-alert-dialog')).not.toBeNull()

    await wrapper.setProps({ value: false })
    await settle()
    expect(document.querySelector('.sh-alert-dialog')).toBeNull()

    wrapper.unmount()
  })
})

describe('AlertDialog — confirm/cancel', () => {
  it('clicking confirm emits confirm only (dialog stays fully controlled by parent)', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()

    const confirmBtn = document.querySelector(
      '.sh-alert-dialog__confirm-btn',
    ) as HTMLElement
    confirmBtn.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    )
    await settle()

    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    // Confirm alone must not force-close a fully controlled AlertDialog.
    expect(wrapper.emitted('cancel')).toBeFalsy()

    wrapper.unmount()
  })

  it('clicking cancel emits update:value(false) and cancel', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()

    const cancelBtn = document.querySelector(
      '.sh-alert-dialog__cancel-btn',
    ) as HTMLElement
    cancelBtn.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    )
    await settle()

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![updateEmitted!.length - 1]).toEqual([false])
    expect(wrapper.emitted('cancel')).toBeTruthy()

    wrapper.unmount()
  })

  it('dismissing via Escape emits update:value(false) and cancel (treated as cancel)', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true },
      attachTo: document.body,
    })
    await settle()

    const content = document.querySelector('.sh-alert-dialog') as HTMLElement
    content.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    )
    await settle()

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![updateEmitted!.length - 1]).toEqual([false])
    expect(wrapper.emitted('cancel')).toBeTruthy()

    wrapper.unmount()
  })
})

describe('AlertDialog — loading', () => {
  it('shows a spinner and disables the confirm button when loading is true', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true, loading: true },
      attachTo: document.body,
    })
    await settle()

    const confirmBtn = document.querySelector(
      '.sh-alert-dialog__confirm-btn',
    ) as HTMLButtonElement
    expect(confirmBtn.disabled).toBe(true)
    expect(document.querySelector('.sh-alert-dialog__confirm-btn .loader')).not.toBeNull()

    wrapper.unmount()
  })

  it('does not disable the confirm button or show a spinner when loading is false', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true, loading: false },
      attachTo: document.body,
    })
    await settle()

    const confirmBtn = document.querySelector(
      '.sh-alert-dialog__confirm-btn',
    ) as HTMLButtonElement
    expect(confirmBtn.disabled).toBe(false)
    expect(document.querySelector('.sh-alert-dialog__confirm-btn .loader')).toBeNull()

    wrapper.unmount()
  })

  it('clicking confirm while loading does not emit confirm (native disabled blocks it)', async () => {
    const wrapper = mount(AlertDialog, {
      props: { value: true, loading: true },
      attachTo: document.body,
    })
    await settle()

    const confirmBtn = document.querySelector(
      '.sh-alert-dialog__confirm-btn',
    ) as HTMLElement
    confirmBtn.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    )
    await settle()

    expect(wrapper.emitted('confirm')).toBeFalsy()

    wrapper.unmount()
  })
})
