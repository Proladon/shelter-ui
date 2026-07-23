import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import ContextMenu from '../index.vue'
import type { ContextMenuItemOption } from '../types'

/** Wait for reka-ui's internal state sync after opening/selecting/closing. */
async function settle() {
  await nextTick()
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

const items: ContextMenuItemOption[] = [
  { type: 'item', label: 'Copy', value: 'copy' },
  { type: 'item', label: 'Paste', value: 'paste', disabled: true },
  {
    type: 'checkbox',
    label: 'Show hidden files',
    value: 'show-hidden',
    checked: false,
  },
]

describe('ContextMenu — open/close', () => {
  it('menu content is not in the document before any interaction', () => {
    const wrapper = mount(ContextMenu, {
      props: { items },
      slots: { default: '<button type="button">Trigger area</button>' },
      attachTo: document.body,
    })

    expect(document.querySelector('.sh-context-menu-content')).toBeNull()

    wrapper.unmount()
  })

  it('opens the menu content on contextmenu (right-click) on the trigger', async () => {
    const wrapper = mount(ContextMenu, {
      props: { items },
      slots: { default: '<button type="button">Trigger area</button>' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('contextmenu')
    await settle()

    expect(document.querySelector('.sh-context-menu-content')).not.toBeNull()

    wrapper.unmount()
  })
})

describe('ContextMenu — triggerClass', () => {
  it('applies triggerClass alongside the default trigger classes', () => {
    const wrapper = mount(ContextMenu, {
      props: { items, triggerClass: 'my-custom-trigger' },
      slots: { default: '<button type="button">Trigger area</button>' },
      attachTo: document.body,
    })

    const trigger = wrapper.find('button')
    expect(trigger.classes()).toContain('my-custom-trigger')
    // still carries the built-in default trigger styling
    expect(trigger.classes()).toContain('border-dashed')

    wrapper.unmount()
  })
})

describe('ContextMenu — item-click', () => {
  it('fires item-click with the clicked item and closes the menu', async () => {
    const wrapper = mount(ContextMenu, {
      props: { items },
      slots: { default: '<button type="button">Trigger area</button>' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('contextmenu')
    await settle()

    const menuItems = Array.from(
      document.querySelectorAll('.sh-context-menu-item'),
    )
    const copyItem = menuItems.find((el) => el.textContent?.includes('Copy'))
    expect(copyItem).toBeTruthy()

    await new DOMWrapper(copyItem as Element).trigger('click')
    await settle()

    const emitted = wrapper.emitted('item-click')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toEqual(items[0])

    expect(document.querySelector('.sh-context-menu-content')).toBeNull()

    wrapper.unmount()
  })

  it('does not fire item-click when a disabled item is clicked', async () => {
    const wrapper = mount(ContextMenu, {
      props: { items },
      slots: { default: '<button type="button">Trigger area</button>' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('contextmenu')
    await settle()

    const menuItems = Array.from(
      document.querySelectorAll('.sh-context-menu-item'),
    )
    const pasteItem = menuItems.find((el) => el.textContent?.includes('Paste'))
    expect(pasteItem).toBeTruthy()

    await new DOMWrapper(pasteItem as Element).trigger('click')
    await settle()

    expect(wrapper.emitted('item-click')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('ContextMenu — checkbox item', () => {
  it('toggles state and fires checkbox-change when a checkbox item is clicked', async () => {
    const wrapper = mount(ContextMenu, {
      props: { items },
      slots: { default: '<button type="button">Trigger area</button>' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('contextmenu')
    await settle()

    const checkboxItem = document.querySelector('[role="menuitemcheckbox"]')
    expect(checkboxItem).toBeTruthy()
    expect(checkboxItem!.getAttribute('aria-checked')).toBe('false')

    await new DOMWrapper(checkboxItem as Element).trigger('click')
    await settle()

    const emitted = wrapper.emitted('checkbox-change')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toMatchObject({ value: 'show-hidden' })
    expect(emitted![0][1]).toBe(true)

    wrapper.unmount()
  })
})
