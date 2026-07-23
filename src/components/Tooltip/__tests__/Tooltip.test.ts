import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import Tooltip from '../index.vue'

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

describe('Tooltip — rendering', () => {
  it('does not render content by default (hidden)', () => {
    const wrapper = mount(Tooltip, {
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    expect(document.querySelector('.sh-tooltip-content')).toBeNull()

    wrapper.unmount()
  })

  it('renders the arrow by default once shown', async () => {
    const wrapper = mount(Tooltip, {
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('focus')
    await settle()

    expect(document.querySelector('.sh-tooltip-arrow')).not.toBeNull()

    wrapper.unmount()
  })

  it('does not render the arrow when arrow is false', async () => {
    const wrapper = mount(Tooltip, {
      props: { arrow: false },
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('focus')
    await settle()

    expect(document.querySelector('.sh-tooltip-content')).not.toBeNull()
    expect(document.querySelector('.sh-tooltip-arrow')).toBeNull()

    wrapper.unmount()
  })
})

describe('Tooltip — show/hide (v-model)', () => {
  it('shows the tooltip and emits update:value(true) when the trigger gains focus', async () => {
    const wrapper = mount(Tooltip, {
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('focus')
    await settle()

    const content = document.querySelector('.sh-tooltip-content')
    expect(content).not.toBeNull()
    expect(content?.textContent).toContain('Tooltip text')

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([true])

    wrapper.unmount()
  })

  it('hides the tooltip and emits update:value(false) when the trigger blurs', async () => {
    const wrapper = mount(Tooltip, {
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    const trigger = wrapper.find('button')
    await trigger.trigger('focus')
    await settle()
    expect(document.querySelector('.sh-tooltip-content')).not.toBeNull()

    await trigger.trigger('blur')
    await settle()

    expect(document.querySelector('.sh-tooltip-content')).toBeNull()
    const emitted = wrapper.emitted('update:value')
    expect(emitted![emitted!.length - 1]).toEqual([false])

    wrapper.unmount()
  })

  // The trigger also listens for `pointermove`/`pointerleave` (hover), separately
  // from `focus`/`blur`. Opening via hover goes through reka-ui's real
  // `setTimeout`-backed delay timer even when `delayDuration` is 0, so a short
  // real (non-fake) timer wait is used here instead of `vi.useFakeTimers()`.
  it('shows the tooltip on pointer hover when delayDuration is 0', async () => {
    const wrapper = mount(Tooltip, {
      props: { delayDuration: 0 },
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    await wrapper
      .find('button')
      .trigger('pointermove', { pointerType: 'mouse' })
    await new Promise((resolve) => setTimeout(resolve, 20))

    expect(document.querySelector('.sh-tooltip-content')).not.toBeNull()

    wrapper.unmount()
  })

  it('reacts when the parent updates the controlled value prop', async () => {
    const wrapper = mount(Tooltip, {
      props: { value: false },
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })
    await settle()
    expect(document.querySelector('.sh-tooltip-content')).toBeNull()

    await wrapper.setProps({ value: true })
    await settle()
    expect(document.querySelector('.sh-tooltip-content')).not.toBeNull()

    await wrapper.setProps({ value: false })
    await settle()
    expect(document.querySelector('.sh-tooltip-content')).toBeNull()

    wrapper.unmount()
  })
})

describe('Tooltip — disabled', () => {
  it('applies the native disabled attribute to the trigger', () => {
    const wrapper = mount(Tooltip, {
      props: { disabled: true },
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    expect((wrapper.find('button').element as HTMLButtonElement).disabled).toBe(
      true,
    )

    wrapper.unmount()
  })

  // These two tests dispatch raw DOM events directly at the trigger element rather
  // than using `wrapper.trigger(...)`. That's deliberate: Vue Test Utils' `trigger('focus')`
  // calls the real `HTMLElement.focus()` under the hood, and `trigger('pointermove')` is
  // also gated the same way -- both already silently no-op on a *natively* `disabled`
  // element (confirmed directly against happy-dom), regardless of whatever reka-ui does
  // internally. Since the trigger always carries a native `disabled` attribute (a purely
  // cosmetic HTML attribute -- see the test above), asserting via `wrapper.trigger(...)`
  // would pass even without wiring shelter-ui's `disabled` prop into reka-ui's own
  // TooltipRoot/TooltipProvider `disabled` context, and would NOT catch a regression.
  // A raw `dispatchEvent` bypasses that native browser-level gate entirely and isolates
  // reka-ui's own context-based `disabled` handling -- the actual mechanism this fix relies on.
  it('does not open on focus when disabled', async () => {
    const wrapper = mount(Tooltip, {
      props: { disabled: true },
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    const button = wrapper.find('button').element as HTMLButtonElement
    button.dispatchEvent(new FocusEvent('focus', { bubbles: false }))
    await settle()

    expect(document.querySelector('.sh-tooltip-content')).toBeNull()

    wrapper.unmount()
  })

  it('does not open on pointer hover when disabled', async () => {
    const wrapper = mount(Tooltip, {
      props: { disabled: true, delayDuration: 0 },
      slots: { trigger: 'Hover me', default: 'Tooltip text' },
      attachTo: document.body,
    })

    const button = wrapper.find('button').element as HTMLButtonElement
    button.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        pointerType: 'mouse',
      } as PointerEventInit),
    )
    await new Promise((resolve) => setTimeout(resolve, 20))
    await settle()

    expect(document.querySelector('.sh-tooltip-content')).toBeNull()

    wrapper.unmount()
  })
})
