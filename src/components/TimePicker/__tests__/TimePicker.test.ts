import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import TimePicker from '../index.vue'

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

async function openPicker(wrapper: ReturnType<typeof mount>) {
  await wrapper.find('.sh-time-picker__trigger').trigger('click')
  await settle()
}

/**
 * The dropdown content renders through a reka-ui PopoverPortal, i.e. it is
 * teleported to `document.body` rather than staying inside the component's
 * own render tree — so `wrapper.find(...)` can't see it. Wrap the teleported
 * root directly so we get the same `.find`/`.findAll`/`.trigger` API scoped
 * to that subtree (mirrors how the DatePicker test reaches into its portal
 * via `document.querySelector`).
 */
function getContent() {
  const el = document.querySelector('.sh-time-picker__content')
  if (!el) throw new Error('picker content not found — is the dropdown open?')
  return new DOMWrapper(el)
}

/** Find the scrollable hour/minute/second column by position (rendered in that order). */
function getColumns() {
  return getContent().findAll('.sh-time-picker__column')
}

function clickItem(column: DOMWrapper<Element>, label: string) {
  const item = column
    .findAll('.sh-time-picker__item')
    .find((el) => el.text() === label)
  if (!item) throw new Error(`item "${label}" not found in column`)
  return item.trigger('click')
}

describe('TimePicker — rendering', () => {
  it('shows the placeholder when no value is set', () => {
    const wrapper = mount(TimePicker, { attachTo: document.body })

    const input = wrapper.find('.sh-time-picker__input')
    expect((input.element as HTMLInputElement).value).toBe('')
    expect(input.attributes('placeholder')).toBe('選擇時間')

    wrapper.unmount()
  })

  it('shows the formatted time when a value is set', () => {
    const wrapper = mount(TimePicker, {
      props: { value: '10:20:30' },
      attachTo: document.body,
    })

    const input = wrapper.find('.sh-time-picker__input')
    expect((input.element as HTMLInputElement).value).toBe('10:20:30')

    wrapper.unmount()
  })
})

describe('TimePicker — open dropdown & select', () => {
  it('opens the dropdown when the trigger is clicked', async () => {
    const wrapper = mount(TimePicker, { attachTo: document.body })

    expect(document.querySelector('.sh-time-picker__content')).toBeNull()

    await openPicker(wrapper)

    expect(document.querySelector('.sh-time-picker__content')).not.toBeNull()

    wrapper.unmount()
  })

  it('selecting hour/minute/second updates value via update:value and change', async () => {
    const wrapper = mount(TimePicker, { attachTo: document.body })

    await openPicker(wrapper)

    const [hourColumn, minuteColumn, secondColumn] = getColumns()
    await clickItem(hourColumn, '05')
    await clickItem(minuteColumn, '30')
    await clickItem(secondColumn, '15')
    await settle()

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![updateEmitted!.length - 1]).toEqual(['05:30:15'])

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![changeEmitted!.length - 1]).toEqual(['05:30:15'])

    wrapper.unmount()
  })
})

describe('TimePicker — disabled', () => {
  it('applies the native disabled attribute to the trigger input', () => {
    const wrapper = mount(TimePicker, {
      props: { disabled: true },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('.sh-time-picker__input').element as HTMLInputElement)
        .disabled,
    ).toBe(true)

    wrapper.unmount()
  })

  it('does not open the dropdown when the trigger is clicked', async () => {
    const wrapper = mount(TimePicker, {
      props: { disabled: true },
      attachTo: document.body,
    })

    await openPicker(wrapper)

    expect(document.querySelector('.sh-time-picker__content')).toBeNull()

    wrapper.unmount()
  })
})

describe('TimePicker — readonly', () => {
  it('does not show the clear icon and marks the trigger readonly', () => {
    const wrapper = mount(TimePicker, {
      props: { value: '10:20:30', readonly: true, clearable: true },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-time-picker__clear-icon').exists()).toBe(false)
    expect(
      wrapper.find('.sh-time-picker__trigger').classes(),
    ).toContain('sh-time-picker__trigger--readonly')

    wrapper.unmount()
  })

  it('does not open the dropdown when the trigger is clicked', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '10:20:30', readonly: true },
      attachTo: document.body,
    })

    await openPicker(wrapper)

    expect(document.querySelector('.sh-time-picker__content')).toBeNull()

    wrapper.unmount()
  })
})

describe('TimePicker — clearable', () => {
  it('does not render a clear icon by default (clearable=false)', () => {
    const wrapper = mount(TimePicker, {
      props: { value: '10:20:30' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-time-picker__clear-icon').exists()).toBe(false)

    wrapper.unmount()
  })

  it('renders a functional clear icon when clearable is true and a value is set', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '10:20:30', clearable: true },
      attachTo: document.body,
    })

    const clearIcon = wrapper.find('.sh-time-picker__clear-icon')
    expect(clearIcon.exists()).toBe(true)

    await clearIcon.trigger('click')
    await settle()

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    expect(updateEmitted![0]).toEqual([undefined])
    expect(wrapper.emitted('clear')).toBeTruthy()

    wrapper.unmount()
  })

  it('shows the clear button inside the open dropdown when clearable is true', async () => {
    const wrapper = mount(TimePicker, {
      props: { value: '10:20:30', clearable: true },
      attachTo: document.body,
    })

    await openPicker(wrapper)

    const buttons = Array.from(
      document.querySelectorAll('.sh-time-picker__button'),
    )
    const clearButton = buttons.find((b) => b.textContent?.trim() === '清除')
    expect(clearButton).toBeTruthy()

    wrapper.unmount()
  })
})
