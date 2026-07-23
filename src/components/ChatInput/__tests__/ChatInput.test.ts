import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import ChatInput from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

function makeFileList(...files: File[]): FileList {
  const dt = new DataTransfer()
  files.forEach((file) => dt.items.add(file))
  return dt.files
}

/** Override a hidden file input's `files` (read-only in the DOM) for a synthetic change event. */
function setInputFiles(input: HTMLInputElement, fileList: FileList) {
  Object.defineProperty(input, 'files', { value: fileList, configurable: true })
}

describe('ChatInput — v-model', () => {
  it('typing in the textarea emits update:value with the new text', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: '' },
      attachTo: document.body,
    })

    await wrapper.find('.sh-textarea-inner').setValue('Hello')

    const emitted = wrapper.emitted('update:value')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['Hello'])

    wrapper.unmount()
  })

  it('reflects an updated value prop back into the textarea (round trip)', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: '' },
      attachTo: document.body,
    })

    await wrapper.setProps({ value: 'Updated text' })

    expect(
      (wrapper.find('.sh-textarea-inner').element as HTMLTextAreaElement).value,
    ).toBe('Updated text')

    wrapper.unmount()
  })
})

describe('ChatInput — submit', () => {
  it('pressing Enter in the textarea emits submit with the current value', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello world' },
      attachTo: document.body,
    })

    await wrapper.find('.sh-textarea-inner').trigger('keydown.enter')

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['Hello world'])

    wrapper.unmount()
  })

  it('also emits pressEnter with the keyboard event', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello world' },
      attachTo: document.body,
    })

    await wrapper.find('.sh-textarea-inner').trigger('keydown.enter')

    const emitted = wrapper.emitted('pressEnter')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBeInstanceOf(Event)

    wrapper.unmount()
  })

  it('does not clear the value itself after submit — that is left to the consumer', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello world' },
      attachTo: document.body,
    })

    await wrapper.find('.sh-textarea-inner').trigger('keydown.enter')

    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(
      (wrapper.find('.sh-textarea-inner').element as HTMLTextAreaElement).value,
    ).toBe('Hello world')

    wrapper.unmount()
  })

  it('clicking the send button emits submit with the current value', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Click send' },
      attachTo: document.body,
    })

    await wrapper.find('.sh-chat-input__send-btn').trigger('click')

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['Click send'])

    wrapper.unmount()
  })

  it('does not emit submit when the value is empty or whitespace-only', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: '   ' },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('.sh-chat-input__send-btn').element as HTMLButtonElement).disabled,
    ).toBe(true)

    await wrapper.find('.sh-textarea-inner').trigger('keydown.enter')
    expect(wrapper.emitted('submit')).toBeFalsy()

    wrapper.unmount()
  })
})

describe('ChatInput — disabled/loading', () => {
  it('blocks submission via Enter when disabled', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello', disabled: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-textarea-inner').trigger('keydown.enter')

    expect(wrapper.emitted('submit')).toBeFalsy()

    wrapper.unmount()
  })

  it('blocks submission via the send button when disabled', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello', disabled: true },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('.sh-chat-input__send-btn').element as HTMLButtonElement).disabled,
    ).toBe(true)

    await wrapper.find('.sh-chat-input__send-btn').trigger('click')
    expect(wrapper.emitted('submit')).toBeFalsy()

    wrapper.unmount()
  })

  it('disables the textarea when disabled is true', () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello', disabled: true },
      attachTo: document.body,
    })

    expect(
      (wrapper.find('.sh-textarea-inner').element as HTMLTextAreaElement).disabled,
    ).toBe(true)

    wrapper.unmount()
  })

  it('blocks submission via Enter when loading', async () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello', loading: true },
      attachTo: document.body,
    })

    await wrapper.find('.sh-textarea-inner').trigger('keydown.enter')

    expect(wrapper.emitted('submit')).toBeFalsy()

    wrapper.unmount()
  })

  it('disables and shows a spinner on the send button when loading is true', () => {
    const wrapper = mount(ChatInput, {
      props: { value: 'Hello', loading: true },
      attachTo: document.body,
    })

    const sendBtn = wrapper.find('.sh-chat-input__send-btn')
    expect((sendBtn.element as HTMLButtonElement).disabled).toBe(true)
    expect(sendBtn.find('.loader').exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('ChatInput — file/image select', () => {
  it('emits fileSelect with the chosen FileList when a file is picked', async () => {
    const wrapper = mount(ChatInput, { attachTo: document.body })

    const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' })
    const fileList = makeFileList(file)
    const fileInput = wrapper.find('input[type="file"]')
    setInputFiles(fileInput.element as HTMLInputElement, fileList)
    await fileInput.trigger('change')

    const emitted = wrapper.emitted('fileSelect')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBe(fileList)
    expect((emitted![0][0] as FileList).length).toBe(1)

    wrapper.unmount()
  })

  it('emits imageSelect with the chosen FileList when an image is picked', async () => {
    const wrapper = mount(ChatInput, { attachTo: document.body })

    const file = new File(['content'], 'pic.png', { type: 'image/png' })
    const fileList = makeFileList(file)
    // File upload input is registered before the image upload input in the template.
    const imageInput = wrapper.findAll('input[type="file"]')[1]
    setInputFiles(imageInput.element as HTMLInputElement, fileList)
    await imageInput.trigger('change')

    const emitted = wrapper.emitted('imageSelect')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBe(fileList)

    wrapper.unmount()
  })

  it('hides the file upload button when hideFileUpload is true', () => {
    const wrapper = mount(ChatInput, {
      props: { hideFileUpload: true },
      attachTo: document.body,
    })

    expect(wrapper.find('[title="上傳檔案"]').exists()).toBe(false)

    wrapper.unmount()
  })

  it('hides the image upload button when hideImageUpload is true', () => {
    const wrapper = mount(ChatInput, {
      props: { hideImageUpload: true },
      attachTo: document.body,
    })

    expect(wrapper.find('[title="上傳圖片"]').exists()).toBe(false)

    wrapper.unmount()
  })
})
