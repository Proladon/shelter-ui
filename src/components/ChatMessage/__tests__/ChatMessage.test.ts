import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import ChatMessage from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('ChatMessage — rendering', () => {
  it('renders username, content, and time from props', () => {
    const wrapper = mount(ChatMessage, {
      props: { username: 'Alice', content: 'Hello there', time: '10:00' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__username').text()).toBe('Alice')
    expect(wrapper.find('.sh-chat-message__content').text()).toBe('Hello there')
    expect(wrapper.find('.sh-chat-message__time').text()).toBe('10:00')

    wrapper.unmount()
  })

  it('hides the username block when showUsername is false', () => {
    const wrapper = mount(ChatMessage, {
      props: { username: 'Alice', showUsername: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__username').exists()).toBe(false)

    wrapper.unmount()
  })

  it('hides the time block when showTime is false', () => {
    const wrapper = mount(ChatMessage, {
      props: { time: '10:00', showTime: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__time').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('ChatMessage — position', () => {
  it('applies the left position class by default', () => {
    const wrapper = mount(ChatMessage, { attachTo: document.body })

    expect(wrapper.classes()).toContain('sh-chat-message--left')

    wrapper.unmount()
  })

  it('applies the right position class to the root and bubble when position is right', () => {
    const wrapper = mount(ChatMessage, {
      props: { position: 'right', content: 'Hi' },
      attachTo: document.body,
    })

    expect(wrapper.classes()).toContain('sh-chat-message--right')
    expect(wrapper.find('.sh-chat-message__bubble').classes()).toContain(
      'sh-chat-message__bubble--right',
    )

    wrapper.unmount()
  })
})

describe('ChatMessage — copy button', () => {
  it('renders the copy button by default and emits copy with the message content on click', async () => {
    const wrapper = mount(ChatMessage, {
      props: { content: 'Copy me' },
      attachTo: document.body,
    })

    const copyBtn = wrapper.find('.sh-chat-message__copy-btn')
    expect(copyBtn.exists()).toBe(true)

    await copyBtn.trigger('click')
    await flushPromises()

    const emitted = wrapper.emitted('copy')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['Copy me'])

    wrapper.unmount()
  })

  it('does not render the copy button when showCopyButton is false', () => {
    const wrapper = mount(ChatMessage, {
      props: { content: 'Hi', showCopyButton: false },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__copy-btn').exists()).toBe(false)

    wrapper.unmount()
  })
})

describe('ChatMessage — status indicator', () => {
  it('shows no status indicator when status is unset', () => {
    const wrapper = mount(ChatMessage, {
      props: { position: 'right' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__status').exists()).toBe(false)

    wrapper.unmount()
  })

  it('never shows a status indicator on the left position, even with a status set', () => {
    const wrapper = mount(ChatMessage, {
      props: { position: 'left', status: 'sending' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__status').exists()).toBe(false)

    wrapper.unmount()
  })

  it('shows the sending indicator on the right position', () => {
    const wrapper = mount(ChatMessage, {
      props: { position: 'right', status: 'sending' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__status-text--sending').exists()).toBe(true)

    wrapper.unmount()
  })

  it('shows the failed indicator on the right position', () => {
    const wrapper = mount(ChatMessage, {
      props: { position: 'right', status: 'failed' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__status-text--failed').exists()).toBe(true)

    wrapper.unmount()
  })

  it('shows the sent indicator on the right position', () => {
    const wrapper = mount(ChatMessage, {
      props: { position: 'right', status: 'sent' },
      attachTo: document.body,
    })

    expect(wrapper.find('.sh-chat-message__status-text--sent').exists()).toBe(true)

    wrapper.unmount()
  })
})
