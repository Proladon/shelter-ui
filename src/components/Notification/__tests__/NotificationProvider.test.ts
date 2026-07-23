import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import SHNotificationProvider from '../NotificationProvider.vue'
import { useNotification } from '../useNotification'
import type { NotificationApi, NotificationProviderProps } from '../types'

/**
 * The actual queueing/eviction logic lives in NotificationProvider.vue's
 * `createNotification`/`removeNotification`, and is only reachable through
 * the `useNotification()` composable injected into descendants. There is no
 * pre-existing test-harness component in the repo, so a minimal inline host
 * captures the injected API for direct calls from the tests below.
 */
function mountWithHost(providerProps: NotificationProviderProps = {}) {
  let api: NotificationApi | undefined

  const TestHost = defineComponent({
    name: 'NotificationTestHost',
    setup() {
      api = useNotification()
      return () => h('div', { class: 'test-host' })
    },
  })

  const wrapper = mount(SHNotificationProvider, {
    props: providerProps,
    slots: { default: () => h(TestHost) },
    attachTo: document.body,
  })

  return { wrapper, api: api! }
}

/** Wait for the reactive notifications array to flush through Teleport +
 * each SHNotification child's own mounted-triggered `visible` transition. */
async function settle() {
  await nextTick()
  await nextTick()
  await nextTick()
  await flushPromises()
}

function notificationEls() {
  return document.querySelectorAll('.sh-notification')
}

function messages() {
  return Array.from(
    document.querySelectorAll('.sh-notification__message'),
  ).map((el) => el.textContent?.trim())
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('NotificationProvider — queueing', () => {
  it('adds a notification to the queue when the API is called', async () => {
    const { wrapper, api } = mountWithHost()

    api.create({ message: 'first' })
    await settle()

    expect(notificationEls()).toHaveLength(1)
    expect(messages()).toEqual(['first'])

    wrapper.unmount()
  })

  it('adds multiple notifications from repeated calls, preserving order', async () => {
    const { wrapper, api } = mountWithHost()

    api.info({ message: 'one' })
    api.success({ message: 'two' })
    api.warning({ message: 'three' })
    await settle()

    expect(notificationEls()).toHaveLength(3)
    expect(messages()).toEqual(['one', 'two', 'three'])

    wrapper.unmount()
  })

  it('applies the type-specific class for each notification variant', async () => {
    const { wrapper, api } = mountWithHost()

    api.danger({ message: 'oops' })
    await settle()

    expect(document.querySelector('.sh-notification--danger')).not.toBeNull()

    wrapper.unmount()
  })

  it('defaults new notifications to the info type when none is given', async () => {
    const { wrapper, api } = mountWithHost()

    api.create({ message: 'no type specified' })
    await settle()

    expect(document.querySelector('.sh-notification--info')).not.toBeNull()

    wrapper.unmount()
  })
})

describe('NotificationProvider — max eviction', () => {
  it('defaults to a max of 10 simultaneous notifications, evicting the oldest once exceeded', async () => {
    const { wrapper, api } = mountWithHost()

    for (let i = 1; i <= 11; i++) {
      api.create({ message: `n${i}` })
    }
    await settle()

    expect(notificationEls()).toHaveLength(10)
    // n1 was the oldest and should have been evicted, leaving n2..n11
    expect(messages()).toEqual([
      'n2',
      'n3',
      'n4',
      'n5',
      'n6',
      'n7',
      'n8',
      'n9',
      'n10',
      'n11',
    ])

    wrapper.unmount()
  })

  it('evicts the oldest notification once the queue exceeds a custom `max`', async () => {
    const { wrapper, api } = mountWithHost({ max: 3 })

    api.create({ message: 'n1' })
    api.create({ message: 'n2' })
    api.create({ message: 'n3' })
    await settle()
    expect(messages()).toEqual(['n1', 'n2', 'n3'])

    api.create({ message: 'n4' })
    await settle()

    expect(notificationEls()).toHaveLength(3)
    expect(messages()).toEqual(['n2', 'n3', 'n4'])

    wrapper.unmount()
  })

  it('keeps evicting FIFO-style as more notifications arrive beyond max', async () => {
    const { wrapper, api } = mountWithHost({ max: 2 })

    api.create({ message: 'a' })
    api.create({ message: 'b' })
    api.create({ message: 'c' })
    api.create({ message: 'd' })
    await settle()

    expect(notificationEls()).toHaveLength(2)
    expect(messages()).toEqual(['c', 'd'])

    wrapper.unmount()
  })
})

describe('NotificationProvider — destroy', () => {
  it('removes a specific notification by key via destroy()', async () => {
    const { wrapper, api } = mountWithHost()

    api.create({ message: 'keep-a' })
    const keyB = api.create({ message: 'remove-me' })
    api.create({ message: 'keep-c' })
    await settle()
    expect(notificationEls()).toHaveLength(3)

    api.destroy(keyB)
    await settle()

    expect(notificationEls()).toHaveLength(2)
    expect(messages()).toEqual(['keep-a', 'keep-c'])

    wrapper.unmount()
  })

  it('does nothing when destroy() is called with an unknown key', async () => {
    const { wrapper, api } = mountWithHost()

    api.create({ message: 'stays' })
    await settle()
    expect(notificationEls()).toHaveLength(1)

    api.destroy('not-a-real-key')
    await settle()

    expect(notificationEls()).toHaveLength(1)

    wrapper.unmount()
  })

  it('destroyAll() clears every notification at once', async () => {
    const { wrapper, api } = mountWithHost()

    api.create({ message: 'a' })
    api.create({ message: 'b' })
    await settle()
    expect(notificationEls()).toHaveLength(2)

    api.destroyAll()
    await settle()

    expect(notificationEls()).toHaveLength(0)
    // the whole container is v-if'd off once the queue is empty
    expect(document.querySelector('.sh-notification-container')).toBeNull()

    wrapper.unmount()
  })
})

describe('useNotification — provider requirement', () => {
  it('throws when used outside of a SHNotificationProvider', () => {
    const Orphan = defineComponent({
      name: 'OrphanHost',
      setup() {
        useNotification()
        return () => h('div')
      },
    })

    expect(() =>
      mount(Orphan, { attachTo: document.body }),
    ).toThrow(/SHNotificationProvider/)
  })
})
