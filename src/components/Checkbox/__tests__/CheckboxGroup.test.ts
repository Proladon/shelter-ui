import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import CheckboxGroup from '../CheckboxGroup.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('CheckboxGroup — group array value', () => {
  it('checking an unchecked option adds its value to the group array', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { options: ['a', 'b', 'c'], value: ['a'] },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    ;(inputs[1].element as HTMLInputElement).checked = true // 'b'
    await inputs[1].trigger('change')

    expect(wrapper.emitted('update:value')!.at(-1)![0]).toEqual(['a', 'b'])
    expect(wrapper.emitted('change')!.at(-1)![0]).toEqual(['a', 'b'])

    wrapper.unmount()
  })

  // Previously a known bug: Checkbox's onChange always builds an *array* to emit whenever
  // `nativeValue` is set (see src/components/Checkbox/index.vue's onChange), regardless of
  // whether the option was checked or unchecked. CheckboxGroup used to pass a plain boolean
  // (from its own `isOptionChecked` helper) down as the child's `value` instead of the real
  // shared array, and its `updateOption` helper then branched on `!checked` to decide
  // whether to remove the option -- but the child always emits an array, and an array is
  // always truthy in JS (even `[]`), so `!checked` was never true and the removal branch
  // could never run. Fixed by having CheckboxGroup bind `v-model:value="value"` straight
  // through to each child Checkbox (mirroring RadioGroup's pattern) instead of reimplementing
  // add/remove logic of its own, so unchecking now correctly removes the option.
  it('unchecking a checked option removes it from the group array', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { options: ['a', 'b', 'c'], value: ['a', 'b'] },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    ;(inputs[0].element as HTMLInputElement).checked = false // uncheck 'a'
    await inputs[0].trigger('change')

    expect(wrapper.emitted('update:value')!.at(-1)![0]).toEqual(['b'])

    wrapper.unmount()
  })

  // Previously a known bug: CheckboxGroup passed a plain boolean (the result of its own
  // `isOptionChecked`) down as the child Checkbox's `value`, while also setting
  // `nativeValue` on the same child. Checkbox's `isChecked` computed, when `nativeValue`
  // is set but the incoming `value` is *not* an array, compares the boolean against
  // `nativeValue` directly (`value.value === props.nativeValue`, e.g. `true === 'a'`),
  // which is always false. Net effect was that a checkbox rendered via CheckboxGroup never
  // showed as checked, even when its value was included in the group's array. Fixed by
  // passing the real array through via `v-model:value="value"`, so Checkbox's own
  // array-membership check now works correctly.
  it('a grouped checkbox renders as checked when its value is in the group array', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { options: ['a', 'b', 'c'], value: ['a', 'b'] },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')

    expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
    expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
    expect((inputs[2].element as HTMLInputElement).checked).toBe(false)

    wrapper.unmount()
  })
})

describe('CheckboxGroup — prop propagation to child Checkbox', () => {
  it('propagates disabled to every child checkbox input', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { options: ['a', 'b'], value: [], disabled: true },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    expect(inputs).toHaveLength(2)
    inputs.forEach((input) => {
      expect((input.element as HTMLInputElement).disabled).toBe(true)
    })

    wrapper.unmount()
  })

  it('combines the group disabled state with a per-option disabled flag', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b', disabled: true },
        ],
        value: [],
        disabled: false,
      },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    expect((inputs[0].element as HTMLInputElement).disabled).toBe(false)
    expect((inputs[1].element as HTMLInputElement).disabled).toBe(true)

    wrapper.unmount()
  })

  it('propagates readonly to every child checkbox input', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { options: ['a', 'b'], value: [], readonly: true },
      attachTo: document.body,
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    inputs.forEach((input) => {
      expect((input.element as HTMLInputElement).readOnly).toBe(true)
    })

    wrapper.unmount()
  })

  it('propagates size as a modifier class on every child checkbox', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { options: ['a', 'b'], value: [], size: 'large' },
      attachTo: document.body,
    })

    const checkboxes = wrapper.findAll('.sh-checkbox')
    expect(checkboxes).toHaveLength(2)
    checkboxes.forEach((checkbox) => {
      expect(checkbox.classes()).toContain('sh-checkbox--large')
    })

    wrapper.unmount()
  })
})
