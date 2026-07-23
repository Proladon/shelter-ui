import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import RadioGroup from '../RadioGroup.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

describe('RadioGroup — rendering', () => {
  it('renders one Radio input per option', () => {
    const wrapper = mount(RadioGroup, {
      props: { options },
      attachTo: document.body,
    })

    expect(wrapper.findAll('input[type="radio"]')).toHaveLength(3)

    wrapper.unmount()
  })
})

describe('RadioGroup — v-model', () => {
  it('selecting an option updates the shared value and deselects the others', async () => {
    const wrapper = mount(RadioGroup, {
      props: { options, value: 'apple' },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="radio"]')
    expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
    expect((inputs[1].element as HTMLInputElement).checked).toBe(false)

    await inputs[1].trigger('click')
    await nextTick()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['banana'])

    wrapper.unmount()
  })

  it('emits change with the newly selected value', async () => {
    const wrapper = mount(RadioGroup, {
      props: { options, value: 'apple' },
      attachTo: document.body,
    })

    await wrapper.findAll('input[type="radio"]')[2].trigger('click')
    await nextTick()

    const emitted = wrapper.emitted('change')
    expect(emitted).toBeTruthy()
    expect(emitted![emitted!.length - 1]).toEqual(['cherry'])

    wrapper.unmount()
  })
})

describe('RadioGroup — disabled propagation', () => {
  it('propagates disabled to every child Radio input', () => {
    const wrapper = mount(RadioGroup, {
      props: { options, disabled: true },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="radio"]')
    expect(inputs).toHaveLength(3)
    inputs.forEach((input) => {
      expect((input.element as HTMLInputElement).disabled).toBe(true)
    })

    wrapper.unmount()
  })

  it('does not emit update:value when the group is disabled', async () => {
    const wrapper = mount(RadioGroup, {
      props: { options, value: 'apple', disabled: true },
      attachTo: document.body,
    })

    await wrapper.findAll('input[type="radio"]')[1].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })

  it('propagates disabled to a specific option via the optionDisabled field, independent of the group', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana', disabled: true },
        ],
      },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="radio"]')
    expect((inputs[0].element as HTMLInputElement).disabled).toBe(false)
    expect((inputs[1].element as HTMLInputElement).disabled).toBe(true)

    wrapper.unmount()
  })
})

describe('RadioGroup — readonly propagation', () => {
  it('propagates readonly to every child Radio input', () => {
    const wrapper = mount(RadioGroup, {
      props: { options, readonly: true },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="radio"]')
    expect(inputs).toHaveLength(3)
    inputs.forEach((input) => {
      expect((input.element as HTMLInputElement).readOnly).toBe(true)
    })

    wrapper.unmount()
  })
})

describe('RadioGroup — size propagation', () => {
  it('propagates size to every child Radio root', () => {
    const wrapper = mount(RadioGroup, {
      props: { options, size: 'large' },
      attachTo: document.body,
    })

    const radios = wrapper.findAll('.sh-radio')
    expect(radios).toHaveLength(3)
    radios.forEach((radio) => {
      expect(radio.classes()).toContain('sh-radio--large')
    })

    wrapper.unmount()
  })
})
