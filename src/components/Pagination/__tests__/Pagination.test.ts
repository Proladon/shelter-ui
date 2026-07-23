import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import Pagination from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

function pageButtons(wrapper: VueWrapper<any>) {
  return wrapper.findAll('.sh-pagination__button--page')
}

function pageNumbers(wrapper: VueWrapper<any>) {
  return pageButtons(wrapper).map((b) => b.text())
}

function ellipsisCount(wrapper: VueWrapper<any>) {
  return wrapper.findAll('.sh-pagination__ellipsis').length
}

describe('Pagination — rendering', () => {
  it('renders no page buttons and no ellipsis when there is only a single page', () => {
    // total=5 items / pageSize=10 => totalPages = ceil(5/10) = 1
    const wrapper = mount(Pagination, {
      props: { total: 5, pageSize: 10 },
      attachTo: document.body,
    })

    expect(pageButtons(wrapper)).toHaveLength(0)
    expect(ellipsisCount(wrapper)).toBe(0)

    wrapper.unmount()
  })

  it('renders first/prev/next/last buttons by default', () => {
    const wrapper = mount(Pagination, {
      props: { total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-pagination__button--first').exists()).toBe(true)
    expect(wrapper.find('.sh-pagination__button--prev').exists()).toBe(true)
    expect(wrapper.find('.sh-pagination__button--next').exists()).toBe(true)
    expect(wrapper.find('.sh-pagination__button--last').exists()).toBe(true)

    wrapper.unmount()
  })

  it('hides first/last buttons when showEdges is false', () => {
    const wrapper = mount(Pagination, {
      props: { total: 100, pageSize: 10, showEdges: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-pagination__button--first').exists()).toBe(false)
    expect(wrapper.find('.sh-pagination__button--last').exists()).toBe(false)

    wrapper.unmount()
  })

  it('hides prev/next buttons when showPrevNext is false', () => {
    const wrapper = mount(Pagination, {
      props: { total: 100, pageSize: 10, showPrevNext: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-pagination__button--prev').exists()).toBe(false)
    expect(wrapper.find('.sh-pagination__button--next').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('Pagination — page click / v-model', () => {
  it('emits update:value and change with the clicked page number', async () => {
    const wrapper = mount(Pagination, {
      props: { value: 1, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    const target = pageButtons(wrapper).find((b) => b.text() === '2')
    expect(target).toBeTruthy()
    await target!.trigger('click')

    expect(wrapper.emitted('update:value')?.[0]).toEqual([2])
    expect(wrapper.emitted('change')?.[0]).toEqual([2])

    wrapper.unmount()
  })

  it('does not emit when clicking the already-active page', async () => {
    const wrapper = mount(Pagination, {
      props: { value: 3, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    const target = pageButtons(wrapper).find((b) => b.text() === '3')
    await target!.trigger('click')

    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })

  it('marks the current page button as active', () => {
    const wrapper = mount(Pagination, {
      props: { value: 4, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    const active = wrapper.find('.sh-pagination__button--active')
    expect(active.exists()).toBe(true)
    expect(active.text()).toBe('4')

    wrapper.unmount()
  })

  it('clicking prev emits the previous page number', async () => {
    const wrapper = mount(Pagination, {
      props: { value: 5, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-pagination__button--prev').trigger('click')

    expect(wrapper.emitted('update:value')?.[0]).toEqual([4])
    expect(wrapper.emitted('change')?.[0]).toEqual([4])

    wrapper.unmount()
  })

  it('clicking next emits the next page number', async () => {
    const wrapper = mount(Pagination, {
      props: { value: 5, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-pagination__button--next').trigger('click')

    expect(wrapper.emitted('update:value')?.[0]).toEqual([6])
    expect(wrapper.emitted('change')?.[0]).toEqual([6])

    wrapper.unmount()
  })

  it('clicking first/last jumps to page 1 / the last page', async () => {
    const wrapper = mount(Pagination, {
      props: { value: 5, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    await wrapper.find('.sh-pagination__button--last').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([10])

    wrapper.unmount()
  })
})

describe('Pagination — disabled', () => {
  it('disables every page button and blocks clicks when disabled', async () => {
    const wrapper = mount(Pagination, {
      props: { value: 3, total: 100, pageSize: 10, disabled: true },
      attachTo: document.body,
    })

    const target = pageButtons(wrapper).find((b) => b.text() === '2')
    expect((target!.element as HTMLButtonElement).disabled).toBe(true)

    await target!.trigger('click')
    expect(wrapper.emitted('update:value')).toBeFalsy()

    wrapper.unmount()
  })

  it('disables prev/next/first/last buttons when disabled', () => {
    const wrapper = mount(Pagination, {
      props: { value: 5, total: 100, pageSize: 10, disabled: true },
      attachTo: document.body,
    })
    ;[
      '.sh-pagination__button--first',
      '.sh-pagination__button--prev',
      '.sh-pagination__button--next',
      '.sh-pagination__button--last',
    ].forEach((selector) => {
      const el = wrapper.find(selector).element as HTMLButtonElement
      expect(el.disabled).toBe(true)
    })

    wrapper.unmount()
  })
})

describe('Pagination — page list algorithm (ellipsis breakpoints)', () => {
  // Actual algorithm read from src/components/Pagination/index.vue:
  //   leftSiblingIndex  = max(current - siblingCount, 1)
  //   rightSiblingIndex = min(current + siblingCount, totalPages)
  //   shouldShowLeftDots  = leftSiblingIndex > 2
  //   shouldShowRightDots = rightSiblingIndex < totalPages - 1
  // With the default siblingCount of 2, dots only appear once totalPages
  // exceeds siblingCount + 2 (i.e. > 4) *and* the current page is far enough
  // from the corresponding edge.

  it('shows every page with no ellipsis when total pages fit within the sibling window', () => {
    // totalPages = 5 (50 items / 10 per page), current = 3 (middle):
    // leftSiblingIndex = max(3-2,1) = 1 (not > 2)      -> no left dots
    // rightSiblingIndex = min(3+2,5) = 5 (not < 5-1=4)  -> no right dots
    const wrapper = mount(Pagination, {
      props: { value: 3, total: 50, pageSize: 10 },
      attachTo: document.body,
    })

    expect(pageNumbers(wrapper)).toEqual(['1', '2', '3', '4', '5'])
    expect(ellipsisCount(wrapper)).toBe(0)

    wrapper.unmount()
  })

  it('shows only a right ellipsis when the current page is near the start', () => {
    // totalPages = 10 (100 items / 10 per page), current = 1:
    // leftSiblingIndex = max(1-2,1) = 1 (not > 2)        -> no left dots
    // rightSiblingIndex = min(1+2,10) = 3 (3 < 10-1=9)   -> right dots shown
    const wrapper = mount(Pagination, {
      props: { value: 1, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    expect(pageNumbers(wrapper)).toEqual(['1', '2', '3', '10'])
    expect(ellipsisCount(wrapper)).toBe(1)

    // the single ellipsis must sit after page 3 and before page 10
    const items = wrapper.findAll(
      '.sh-pagination__button--page, .sh-pagination__ellipsis',
    )
    expect(items.at(-2)!.classes()).toContain('sh-pagination__ellipsis')

    wrapper.unmount()
  })

  it('shows only a left ellipsis when the current page is near the end', () => {
    // totalPages = 10, current = 10:
    // leftSiblingIndex = max(10-2,1) = 8 (8 > 2)          -> left dots shown
    // rightSiblingIndex = min(10+2,10) = 10 (not < 9)     -> no right dots
    const wrapper = mount(Pagination, {
      props: { value: 10, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    expect(pageNumbers(wrapper)).toEqual(['1', '8', '9', '10'])
    expect(ellipsisCount(wrapper)).toBe(1)

    const items = wrapper.findAll(
      '.sh-pagination__button--page, .sh-pagination__ellipsis',
    )
    expect(items.at(1)!.classes()).toContain('sh-pagination__ellipsis')

    wrapper.unmount()
  })

  it('shows an ellipsis on both sides when the current page is in the middle', () => {
    // totalPages = 10, current = 5:
    // leftSiblingIndex = max(5-2,1) = 3 (3 > 2)   -> left dots shown
    // rightSiblingIndex = min(5+2,10) = 7 (7 < 9) -> right dots shown
    const wrapper = mount(Pagination, {
      props: { value: 5, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    expect(pageNumbers(wrapper)).toEqual([
      '1',
      '3',
      '4',
      '5',
      '6',
      '7',
      '10',
    ])
    expect(ellipsisCount(wrapper)).toBe(2)

    wrapper.unmount()
  })

  it('respects a custom siblingCount when computing the dot breakpoints', () => {
    // siblingCount = 1, totalPages = 10, current = 5:
    // leftSiblingIndex = max(5-1,1) = 4 (4 > 2)   -> left dots shown
    // rightSiblingIndex = min(5+1,10) = 6 (6 < 9) -> right dots shown
    const wrapper = mount(Pagination, {
      props: { value: 5, total: 100, pageSize: 10, siblingCount: 1 },
      attachTo: document.body,
    })

    expect(pageNumbers(wrapper)).toEqual(['1', '4', '5', '6', '10'])
    expect(ellipsisCount(wrapper)).toBe(2)

    wrapper.unmount()
  })

  it('recomputes the ellipsis layout when the current page changes via props', async () => {
    const wrapper = mount(Pagination, {
      props: { value: 1, total: 100, pageSize: 10 },
      attachTo: document.body,
    })

    expect(pageNumbers(wrapper)).toEqual(['1', '2', '3', '10'])

    await wrapper.setProps({ value: 5 })

    expect(pageNumbers(wrapper)).toEqual([
      '1',
      '3',
      '4',
      '5',
      '6',
      '7',
      '10',
    ])
    expect(ellipsisCount(wrapper)).toBe(2)

    wrapper.unmount()
  })
})
