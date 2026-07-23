import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Carousel from '../index.vue'
import type { CarouselItem } from '../types'

const items: CarouselItem[] = [
  { id: 1, title: 'Slide 1' },
  { id: 2, title: 'Slide 2' },
  { id: 3, title: 'Slide 3' },
]

/**
 * `goToSlide` guards against overlapping transitions via `isTransitioning`,
 * which only clears after `duration` ms via a real setTimeout. Tests that
 * perform a single navigation action don't need this, but a couple of tests
 * below wait for it explicitly for clarity/robustness.
 */
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Carousel — rendering', () => {
  it('renders one .sh-carousel-item per item, with only the current index marked active', () => {
    const wrapper = mount(Carousel, {
      props: { items },
      attachTo: document.body,
    })

    const slides = wrapper.findAll('.sh-carousel-item')
    expect(slides).toHaveLength(3)

    const activeSlides = wrapper.findAll('.sh-carousel-item--active')
    expect(activeSlides).toHaveLength(1)
    expect(slides[0].classes()).toContain('sh-carousel-item--active')
    expect(slides[1].classes()).not.toContain('sh-carousel-item--active')
    expect(slides[2].classes()).not.toContain('sh-carousel-item--active')

    wrapper.unmount()
  })

  it('marks the item matching the initial `value` prop as active instead of index 0', () => {
    const wrapper = mount(Carousel, {
      props: { items, value: 1 },
      attachTo: document.body,
    })

    const slides = wrapper.findAll('.sh-carousel-item')
    expect(slides[1].classes()).toContain('sh-carousel-item--active')
    expect(slides[0].classes()).not.toContain('sh-carousel-item--active')

    wrapper.unmount()
  })

  it('reflects the active index on the matching indicator dot', () => {
    const wrapper = mount(Carousel, {
      props: { items, value: 2 },
      attachTo: document.body,
    })

    const dots = wrapper.findAll('.sh-carousel-indicators__item')
    expect(dots).toHaveLength(3)
    expect(dots[2].classes()).toContain('sh-carousel-indicators__item--active')
    expect(dots[0].classes()).not.toContain('sh-carousel-indicators__item--active')

    wrapper.unmount()
  })

  it('does not render navigation/indicators for a single-item carousel', () => {
    const wrapper = mount(Carousel, {
      props: { items: [items[0]] },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-carousel-navigation__button--next').exists()).toBe(
      false,
    )
    expect(wrapper.find('.sh-carousel-indicators__item').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('Carousel — v-model', () => {
  it('clicking next advances the active index and emits update:value + change', async () => {
    const wrapper = mount(Carousel, {
      props: { items },
      attachTo: document.body,
    })

    await wrapper.find('.sh-carousel-navigation__button--next').trigger('click')

    expect(wrapper.emitted('update:value')?.[0]).toEqual([1])
    expect(wrapper.emitted('change')?.[0]).toEqual([1, 0])

    const slides = wrapper.findAll('.sh-carousel-item')
    expect(slides[1].classes()).toContain('sh-carousel-item--active')
    expect(slides[0].classes()).not.toContain('sh-carousel-item--active')

    wrapper.unmount()
  })

  it('clicking prev moves the active index backwards and emits update:value', async () => {
    const wrapper = mount(Carousel, {
      props: { items, value: 1 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-carousel-navigation__button--prev').trigger('click')

    expect(wrapper.emitted('update:value')?.[0]).toEqual([0])

    const slides = wrapper.findAll('.sh-carousel-item')
    expect(slides[0].classes()).toContain('sh-carousel-item--active')

    wrapper.unmount()
  })

  it('external v-model updates (setProps) move the active item without user interaction', async () => {
    const wrapper = mount(Carousel, {
      props: { items, value: 0 },
      attachTo: document.body,
    })

    await wrapper.setProps({ value: 2 })

    const slides = wrapper.findAll('.sh-carousel-item')
    expect(slides[2].classes()).toContain('sh-carousel-item--active')

    wrapper.unmount()
  })

  it('clicking an indicator jumps directly to that slide and emits update:value', async () => {
    const wrapper = mount(Carousel, {
      props: { items },
      attachTo: document.body,
    })

    const dots = wrapper.findAll('.sh-carousel-indicators__item')
    await dots[2].trigger('click')

    expect(wrapper.emitted('update:value')?.[0]).toEqual([2])
    expect(dots[2].classes()).toContain('sh-carousel-indicators__item--active')

    wrapper.unmount()
  })

  it('wraps to the last slide when clicking prev at index 0 while loop is true (default)', async () => {
    const wrapper = mount(Carousel, {
      props: { items, value: 0 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-carousel-navigation__button--prev').trigger('click')

    expect(wrapper.emitted('update:value')?.[0]).toEqual([2])

    wrapper.unmount()
  })

  it('does not wrap past the last slide when loop is false', async () => {
    const wrapper = mount(Carousel, {
      props: { items, value: items.length - 1, loop: false },
      attachTo: document.body,
    })

    const nextButton = wrapper.find('.sh-carousel-navigation__button--next')
    expect((nextButton.element as HTMLButtonElement).disabled).toBe(true)

    await nextButton.trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Carousel — disabled', () => {
  it('applies the disabled attribute to navigation and indicator controls', () => {
    const wrapper = mount(Carousel, {
      props: { items, disabled: true },
      attachTo: document.body,
    })

    const prevButton = wrapper.find('.sh-carousel-navigation__button--prev')
    const nextButton = wrapper.find('.sh-carousel-navigation__button--next')
    expect((prevButton.element as HTMLButtonElement).disabled).toBe(true)
    expect((nextButton.element as HTMLButtonElement).disabled).toBe(true)

    wrapper.findAll('.sh-carousel-indicators__item').forEach((dot) => {
      expect((dot.element as HTMLButtonElement).disabled).toBe(true)
    })

    wrapper.unmount()
  })

  it('blocks navigation via next/prev buttons when disabled', async () => {
    const wrapper = mount(Carousel, {
      props: { items, disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-carousel-navigation__button--next').trigger('click')
    await wrapper.find('.sh-carousel-navigation__button--prev').trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    const slides = wrapper.findAll('.sh-carousel-item')
    expect(slides[0].classes()).toContain('sh-carousel-item--active')

    wrapper.unmount()
  })

  it('blocks navigation via indicator clicks when disabled', async () => {
    const wrapper = mount(Carousel, {
      props: { items, disabled: true },
      attachTo: document.body,
    })

    const dots = wrapper.findAll('.sh-carousel-indicators__item')
    await dots[1].trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('Carousel — sequential navigation (real transition timing)', () => {
  it('can navigate next twice in a row once the transition window elapses', async () => {
    const wrapper = mount(Carousel, {
      props: { items, duration: 10 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-carousel-navigation__button--next').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([1])

    // isTransitioning only clears after `duration` ms (real setTimeout).
    await wait(30)

    await wrapper.find('.sh-carousel-navigation__button--next').trigger('click')
    expect(wrapper.emitted('update:value')?.[1]).toEqual([2])

    wrapper.unmount()
  })
})
