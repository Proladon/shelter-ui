import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Slider from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Slider — rendering', () => {
  it('renders a track and one thumb for a single value', () => {
    const wrapper = mount(Slider, {
      props: { value: [30] },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-slider__track').exists()).toBe(true)
    expect(wrapper.findAll('[role="slider"]')).toHaveLength(1)

    wrapper.unmount()
  })

  it('renders one thumb per value for a range slider', () => {
    const wrapper = mount(Slider, {
      props: { value: [20, 80] },
      attachTo: document.body,
    })

    expect(wrapper.findAll('[role="slider"]')).toHaveLength(2)

    wrapper.unmount()
  })
})

describe('Slider — v-model', () => {
  // Note: intentionally not calling `.trigger('focus')` first. reka-ui tracks
  // "which thumb to move" via a Collection-derived index that is (re)assigned
  // on the thumb's focus handler; under @vue/test-utils + happy-dom that
  // lookup resolves to an invalid index, which would silently corrupt the
  // single-thumb case too. The default index (0) already routes correctly
  // for a single-thumb slider, so dispatching keydown directly is both
  // sufficient and more reliable here.
  it('ArrowRight on the thumb increments the value by step and emits update:value', async () => {
    const wrapper = mount(Slider, {
      props: { value: [50], min: 0, max: 100, step: 1 },
      attachTo: document.body,
    })

    const thumb = wrapper.find('[role="slider"]')
    await thumb.trigger('keydown', { key: 'ArrowRight' })

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toEqual([51])

    wrapper.unmount()
  })

  it('ArrowLeft on the thumb decrements the value by step', async () => {
    const wrapper = mount(Slider, {
      props: { value: [50], min: 0, max: 100, step: 1 },
      attachTo: document.body,
    })

    const thumb = wrapper.find('[role="slider"]')
    await thumb.trigger('keydown', { key: 'ArrowLeft' })

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toEqual([49])

    wrapper.unmount()
  })
})

describe('Slider — disabled', () => {
  it('does not emit update:value when the thumb receives an arrow key', async () => {
    const wrapper = mount(Slider, {
      props: { value: [50], disabled: true },
      attachTo: document.body,
    })

    const thumb = wrapper.find('[role="slider"]')
    await thumb.trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Slider — readonly', () => {
  it('does not emit update:value when the thumb receives an arrow key (controlled usage)', async () => {
    const wrapper = mount(Slider, {
      props: { value: [50], readonly: true },
      attachTo: document.body,
    })

    const thumb = wrapper.find('[role="slider"]')
    await thumb.trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Slider — focus/blur', () => {
  it('emits focus and blur FocusEvents when a thumb gains/loses focus', async () => {
    const wrapper = mount(Slider, {
      props: { value: [50] },
      attachTo: document.body,
    })

    const thumb = wrapper.find('[role="slider"]')
    await thumb.trigger('focus')
    await thumb.trigger('blur')

    const focusEmitted = wrapper.emitted('focus')
    expect(focusEmitted).toBeTruthy()
    expect(focusEmitted![0][0]).toBeInstanceOf(Event)

    const blurEmitted = wrapper.emitted('blur')
    expect(blurEmitted).toBeTruthy()
    expect(blurEmitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })
})
