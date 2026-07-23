import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import Select from '../index.vue'
import type { SelectOption } from '../types'

/** Wait for reka-ui's internal state sync (portal mount, highlight, filter) after an interaction. */
async function settle() {
  await nextTick()
  await nextTick()
  await nextTick()
  await flushPromises()
}

/** Dispatch a real bubbling click on a raw (possibly teleported) DOM node. */
function click(el: Element) {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
}

const basicOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Select — rendering & opening', () => {
  it('renders the placeholder when there is no value', () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions, placeholder: '請選擇' },
      attachTo: document.body,
    })

    expect(wrapper.text()).toContain('請選擇')
    expect(document.querySelector('.sh-select-dropdown')).toBeNull()

    wrapper.unmount()
  })

  it('opens the dropdown and shows every option when the trigger is clicked', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-body').trigger('click')
    await settle()

    const options = document.querySelectorAll('.sh-select-option')
    expect(options).toHaveLength(3)
    expect(options[0].textContent).toContain('Apple')
    expect(options[1].textContent).toContain('Banana')
    expect(options[2].textContent).toContain('Cherry')

    wrapper.unmount()
  })

  it('does not open the dropdown when disabled', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions, disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-body').trigger('click')
    await settle()

    expect(document.querySelector('.sh-select-dropdown')).toBeNull()

    wrapper.unmount()
  })

  it('selecting an option emits update:value/change with the option value and closes the dropdown', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-body').trigger('click')
    await settle()

    const options = document.querySelectorAll('.sh-select-option')
    click(options[1]) // Banana
    await settle()

    expect(wrapper.emitted('update:value')!.at(-1)![0]).toBe('banana')
    expect(wrapper.emitted('change')!.at(-1)![0]).toBe('banana')
    expect(document.querySelector('.sh-select-dropdown')).toBeNull()

    wrapper.unmount()
  })
})

describe('Select — filterable', () => {
  it('typing narrows the visible options to label substring matches', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions, filterable: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-trigger-icon').trigger('click')
    await settle()
    expect(document.querySelectorAll('.sh-select-option')).toHaveLength(3)

    const input = wrapper.find('.sh-select-input')
    ;(input.element as HTMLInputElement).value = 'err'
    await input.trigger('input')
    await settle()

    const filtered = document.querySelectorAll('.sh-select-option')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].textContent).toContain('Cherry')

    wrapper.unmount()
  })

  it('typing a query that matches no option hides every option', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions, filterable: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-trigger-icon').trigger('click')
    await settle()

    const input = wrapper.find('.sh-select-input')
    ;(input.element as HTMLInputElement).value = 'zzzzz'
    await input.trigger('input')
    await settle()

    expect(document.querySelectorAll('.sh-select-option')).toHaveLength(0)

    wrapper.unmount()
  })
})

describe('Select — multiple selection', () => {
  it('selecting more than one option accumulates an array value', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions, multiple: true, value: [] },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-body').trigger('click')
    await settle()

    const options = document.querySelectorAll('.sh-select-option')
    click(options[0]) // apple
    await settle()
    click(options[2]) // cherry
    await settle()

    expect(wrapper.emitted('update:value')!.at(-1)![0]).toEqual(['apple', 'cherry'])
    // multiple mode keeps the dropdown open so more options can be picked
    expect(document.querySelectorAll('.sh-select-option')).toHaveLength(3)

    wrapper.unmount()
  })

  it('clicking an already-selected option again removes it from the value array', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions, multiple: true, value: ['apple', 'banana'] },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-body').trigger('click')
    await settle()

    const options = document.querySelectorAll('.sh-select-option')
    click(options[0]) // apple, already selected -> deselect
    await settle()

    expect(wrapper.emitted('update:value')!.at(-1)![0]).toEqual(['banana'])

    wrapper.unmount()
  })
})

describe('Select — clearable', () => {
  it('shows the clear icon only when there is a value and the select is not disabled', () => {
    const empty = mount(Select, {
      props: { options: basicOptions, clearable: true },
      attachTo: document.body,
    })
    expect(empty.find('.sh-select-clear').exists()).toBe(false)
    empty.unmount()

    const withValue = mount(Select, {
      props: { options: basicOptions, clearable: true, value: 'apple' },
      attachTo: document.body,
    })
    expect(withValue.find('.sh-select-clear').exists()).toBe(true)
    withValue.unmount()

    const disabledWithValue = mount(Select, {
      props: {
        options: basicOptions,
        clearable: true,
        value: 'apple',
        disabled: true,
      },
      attachTo: document.body,
    })
    expect(disabledWithValue.find('.sh-select-clear').exists()).toBe(false)
    disabledWithValue.unmount()
  })

  it('clicking the clear icon resets a single value to undefined and emits clear', async () => {
    const wrapper = mount(Select, {
      props: { options: basicOptions, clearable: true, value: 'apple' },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-clear').trigger('click')
    await settle()

    expect(wrapper.emitted('update:value')![0][0]).toBeUndefined()
    expect(wrapper.emitted('clear')).toBeTruthy()

    wrapper.unmount()
  })

  it('clicking the clear icon resets a multiple value to an empty array', async () => {
    const wrapper = mount(Select, {
      props: {
        options: basicOptions,
        clearable: true,
        multiple: true,
        value: ['apple', 'banana'],
      },
      attachTo: document.body,
    })

    await wrapper.find('.sh-select-clear').trigger('click')
    await settle()

    expect(wrapper.emitted('update:value')![0][0]).toEqual([])
    expect(wrapper.emitted('clear')).toBeTruthy()

    wrapper.unmount()
  })
})
