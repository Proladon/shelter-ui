import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import NumberInput from '../index.vue'

/** Wait for reka-ui's internal state sync after a controlled-prop update. */
async function settle() {
  await nextTick()
  await nextTick()
  await flushPromises()
}

/**
 * The stepper buttons attach their press-and-hold pointerdown listener via
 * vueuse's `useEventListener`, which binds on a macrotask rather than a
 * microtask. A plain `nextTick`/`flushPromises` settle isn't enough to
 * guarantee it has attached before we simulate a press — a real event-loop
 * tick is required, or the very first pointerdown in a test is silently
 * dropped.
 */
function flushMacrotask() {
  return new Promise<void>((resolve) => setTimeout(resolve, 0))
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('NumberInput — rendering', () => {
  it('renders the decrement button, input, and increment button', () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5 },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-number-input__step--decrement').exists()).toBe(
      true,
    )
    expect(wrapper.find('.sh-number-input__input').exists()).toBe(true)
    expect(wrapper.find('.sh-number-input__step--increment').exists()).toBe(
      true,
    )

    wrapper.unmount()
  })

  it('reflects the initial value prop in the input', () => {
    const wrapper = mount(NumberInput, {
      props: { value: 42 },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('.sh-number-input__input').element as HTMLInputElement)
        .value,
    ).toBe('42')

    wrapper.unmount()
  })
})

describe('NumberInput — v-model', () => {
  it('clicking the increment button raises the value by `step` and emits update:value', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5, step: 1 },
      attachTo: document.body,
    })

    const increment = wrapper.find('.sh-number-input__step--increment')
    await flushMacrotask()
    await increment.trigger('pointerdown')
    await increment.trigger('pointerup')
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([6])

    wrapper.unmount()
  })

  it('clicking the decrement button lowers the value by `step` and emits update:value', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5, step: 1 },
      attachTo: document.body,
    })

    const decrement = wrapper.find('.sh-number-input__step--decrement')
    await flushMacrotask()
    await decrement.trigger('pointerdown')
    await decrement.trigger('pointerup')
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([4])

    wrapper.unmount()
  })

  it('typing a new value and pressing Enter commits it via update:value', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5 },
      attachTo: document.body,
    })

    const input = wrapper.find('.sh-number-input__input')
    await input.setValue('25')
    await input.trigger('keydown', { key: 'Enter' })
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![emitted!.length - 1]).toEqual([25])

    wrapper.unmount()
  })
})

describe('NumberInput — min/max clamping', () => {
  it('clamps a typed value above `max` down to `max`', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5, min: 0, max: 10 },
      attachTo: document.body,
    })

    const input = wrapper.find('.sh-number-input__input')
    await input.setValue('999')
    await input.trigger('keydown', { key: 'Enter' })
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![emitted!.length - 1]).toEqual([10])

    wrapper.unmount()
  })

  it('clamps a typed value below `min` up to `min`', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5, min: 0, max: 10 },
      attachTo: document.body,
    })

    const input = wrapper.find('.sh-number-input__input')
    await input.setValue('-999')
    await input.trigger('keydown', { key: 'Enter' })
    await settle()

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![emitted!.length - 1]).toEqual([0])

    wrapper.unmount()
  })

  it('disables the increment button once the value reaches `max`, blocking further increments', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 10, min: 0, max: 10, step: 1 },
      attachTo: document.body,
    })

    const increment = wrapper.find('.sh-number-input__step--increment')
    expect((increment.element as HTMLButtonElement).disabled).toBe(true)

    await flushMacrotask()
    await increment.trigger('pointerdown')
    await increment.trigger('pointerup')
    await settle()

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('NumberInput — disabled', () => {
  it('applies the disabled attribute to the input and stepper buttons', () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5, disabled: true },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('.sh-number-input__input').element as HTMLInputElement)
        .disabled,
    ).toBe(true)
    expect(
      (
        wrapper.find('.sh-number-input__step--increment')
          .element as HTMLButtonElement
      ).disabled,
    ).toBe(true)
    expect(
      (
        wrapper.find('.sh-number-input__step--decrement')
          .element as HTMLButtonElement
      ).disabled,
    ).toBe(true)

    wrapper.unmount()
  })

  it('blocks the increment button from emitting update:value', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5, disabled: true },
      attachTo: document.body,
    })

    const increment = wrapper.find('.sh-number-input__step--increment')
    await flushMacrotask()
    await increment.trigger('pointerdown')
    await increment.trigger('pointerup')
    await settle()

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })

  it('blocks the decrement button from emitting update:value', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5, disabled: true },
      attachTo: document.body,
    })

    const decrement = wrapper.find('.sh-number-input__step--decrement')
    await flushMacrotask()
    await decrement.trigger('pointerdown')
    await decrement.trigger('pointerup')
    await settle()

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('NumberInput — focus/blur', () => {
  it('emits focus with a FocusEvent when the input gains focus', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-number-input__input').trigger('focus')

    const emitted = wrapper.emitted('focus')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })

  it('emits blur with a FocusEvent when the input loses focus', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-number-input__input').trigger('blur')

    const emitted = wrapper.emitted('blur')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })

  it('does not emit focus/blur from the stepper buttons', async () => {
    const wrapper = mount(NumberInput, {
      props: { value: 5 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-number-input__step--increment').trigger('focus')

    expect(wrapper.emitted('focus')).toBeFalsy()

    wrapper.unmount()
  })
})
