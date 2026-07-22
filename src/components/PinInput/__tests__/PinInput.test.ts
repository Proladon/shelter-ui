import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import PinInput from '../index.vue'

/** Wait for reka-ui's internal state sync after a controlled-prop update. */
async function settle() {
  await nextTick()
  await nextTick()
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('PinInput — rendering', () => {
  it('renders the default length of 6 cells', () => {
    const wrapper = mount(PinInput, { attachTo: document.body })

    expect(wrapper.findAll('.sh-pin-input__cell')).toHaveLength(6)

    wrapper.unmount()
  })

  it('renders one cell per `length`', () => {
    const wrapper = mount(PinInput, {
      props: { length: 4 },
      attachTo: document.body,
    })

    expect(wrapper.findAll('.sh-pin-input__cell')).toHaveLength(4)

    wrapper.unmount()
  })
})

describe('PinInput — v-model', () => {
  it('typing into a cell emits update:value and change with the new value', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, value: ['', '', ''] },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    ;(cells[0].element as HTMLInputElement).value = '1'
    await cells[0].trigger('input', { data: '1' })
    await settle()

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![0][0]).toEqual(['1'])

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![0][0]).toEqual(['1'])

    wrapper.unmount()
  })
})

describe('PinInput — disabled', () => {
  it('applies the native disabled attribute to every cell', () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, disabled: true },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    expect(cells).toHaveLength(3)
    cells.forEach((cell) => {
      expect((cell.element as HTMLInputElement).disabled).toBe(true)
    })

    wrapper.unmount()
  })
})

describe('PinInput — readonly', () => {
  it('applies the native readonly attribute to every cell when readonly is true', () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, readonly: true },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    expect(cells).toHaveLength(3)
    cells.forEach((cell) => {
      expect((cell.element as HTMLInputElement).readOnly).toBe(true)
    })

    wrapper.unmount()
  })

  it('does not apply the readonly attribute when readonly is false', () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, readonly: false },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    cells.forEach((cell) => {
      expect((cell.element as HTMLInputElement).readOnly).toBe(false)
    })

    wrapper.unmount()
  })

  it('blocks Backspace from clearing a filled cell', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, value: ['1', '2', '3'], readonly: true },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    await cells[0].trigger('keydown', { key: 'Backspace' })
    await settle()

    // reka-ui's internal handler must never run, so no outward emit at all
    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect((cells[0].element as HTMLInputElement).value).toBe('1')

    wrapper.unmount()
  })

  it('blocks Delete from clearing a filled cell', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, value: ['1', '2', '3'], readonly: true },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    await cells[0].trigger('keydown', { key: 'Delete' })
    await settle()

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect((cells[0].element as HTMLInputElement).value).toBe('1')

    wrapper.unmount()
  })

  it('blocks paste from overwriting cell values', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, value: ['1', '2', '3'], readonly: true },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')

    // Dispatch a paste event carrying real clipboard-like data so that, if
    // the capture-phase guard failed to stop it, reka-ui's own paste handler
    // would actually overwrite the cell — making this a meaningful assertion
    // rather than a false positive from missing clipboardData.
    const pasteEvent = new Event('paste', {
      bubbles: true,
      cancelable: true,
    }) as ClipboardEvent
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: { getData: () => '999' },
    })
    cells[0].element.dispatchEvent(pasteEvent)
    await settle()

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect((cells[0].element as HTMLInputElement).value).toBe('1')
    expect((cells[1].element as HTMLInputElement).value).toBe('2')
    expect((cells[2].element as HTMLInputElement).value).toBe('3')

    wrapper.unmount()
  })

  it('does not block Backspace when readonly is false (control case)', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3, value: ['1', '2', '3'], readonly: false },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    await cells[0].trigger('keydown', { key: 'Backspace' })
    await settle()

    expect(wrapper.emitted('update:value')).toBeTruthy()

    wrapper.unmount()
  })
})

describe('PinInput — focus/blur', () => {
  it('emits focus with a FocusEvent when a cell gains focus', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3 },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    await cells[0].trigger('focus')

    const focusEmitted = wrapper.emitted('focus')
    expect(focusEmitted).toBeTruthy()
    expect(focusEmitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })

  it('emits blur with a FocusEvent when a cell loses focus', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3 },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    await cells[0].trigger('blur')

    const blurEmitted = wrapper.emitted('blur')
    expect(blurEmitted).toBeTruthy()
    expect(blurEmitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })

  it('emits focus/blur independently for every cell', async () => {
    const wrapper = mount(PinInput, {
      props: { length: 3 },
      attachTo: document.body,
    })

    const cells = wrapper.findAll('.sh-pin-input__cell')
    await cells[0].trigger('focus')
    await cells[1].trigger('focus')
    await cells[2].trigger('focus')

    expect(wrapper.emitted('focus')).toHaveLength(3)

    wrapper.unmount()
  })
})
