import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import UploadZone from '../index.vue'
import type { UploadZoneFile } from '../types'

afterEach(() => {
  document.body.innerHTML = ''
})

/**
 * UploadZone's real selection trigger is the native hidden
 * `<input type="file" @change="handleFileInputChange">` (see index.vue) —
 * drag/drop calls the same internal `addFiles()` from a `drop` handler, but
 * the file input is the simplest, most direct way to exercise `addFiles()`.
 * happy-dom's HTMLInputElement exposes a writable `files` property, but we
 * shadow it with `Object.defineProperty` so this works the same regardless
 * of test environment (jsdom/happy-dom) and doesn't require constructing a
 * real FileList.
 */
function selectFiles(wrapper: VueWrapper<any>, files: File[]) {
  const input = wrapper.find('input[type="file"]')
  Object.defineProperty(input.element, 'files', {
    value: files,
    configurable: true,
  })
  return input.trigger('change')
}

function makeFile(name: string, sizeBytes: number, type = 'text/plain') {
  return new File(['x'.repeat(sizeBytes)], name, { type })
}

describe('UploadZone — selecting valid files', () => {
  it('adds a valid file within limits and emits update:value/change', async () => {
    const wrapper = mount(UploadZone, { attachTo: document.body })

    const file = makeFile('hello.txt', 11)
    await selectFiles(wrapper, [file])

    const updateEmitted = wrapper.emitted('update:value')
    expect(updateEmitted).toBeTruthy()
    const uploaded = updateEmitted![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(1)
    expect(uploaded[0].name).toBe('hello.txt')
    expect(uploaded[0].size).toBe(file.size)
    expect(uploaded[0].raw).toBe(file)
    expect(uploaded[0].status).toBe('idle')

    const changeEmitted = wrapper.emitted('change')
    expect(changeEmitted).toBeTruthy()
    expect(changeEmitted![0][0]).toEqual(uploaded)

    wrapper.unmount()
  })

  it('only keeps the first file when multiple is false, even if several are selected', async () => {
    const wrapper = mount(UploadZone, {
      props: { multiple: false },
      attachTo: document.body,
    })

    await selectFiles(wrapper, [makeFile('a.txt', 5), makeFile('b.txt', 5)])

    const uploaded = wrapper.emitted('update:value')![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(1)
    expect(uploaded[0].name).toBe('a.txt')

    wrapper.unmount()
  })
})

describe('UploadZone — maxSize validation', () => {
  it('rejects a file exceeding maxSize, emits exceed-size, and never emits update:value', async () => {
    const wrapper = mount(UploadZone, {
      props: { maxSize: 10 },
      attachTo: document.body,
    })

    const bigFile = makeFile('big.txt', 20)
    await selectFiles(wrapper, [bigFile])

    const exceedEmitted = wrapper.emitted('exceed-size')
    expect(exceedEmitted).toBeTruthy()
    expect(exceedEmitted![0][0]).toBe(bigFile)

    // every candidate file was rejected -> addFiles() returns before emitting
    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.unmount()
  })

  it('keeps files within maxSize while rejecting the oversized one from the same batch', async () => {
    const wrapper = mount(UploadZone, {
      props: { multiple: true, maxSize: 10 },
      attachTo: document.body,
    })

    const okFile = makeFile('ok.txt', 5)
    const bigFile = makeFile('big.txt', 20)
    await selectFiles(wrapper, [okFile, bigFile])

    expect(wrapper.emitted('exceed-size')![0][0]).toBe(bigFile)

    const uploaded = wrapper.emitted('update:value')![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(1)
    expect(uploaded[0].name).toBe('ok.txt')

    wrapper.unmount()
  })

  it('treats a file exactly at maxSize as valid (boundary is inclusive)', async () => {
    const wrapper = mount(UploadZone, {
      props: { maxSize: 10 },
      attachTo: document.body,
    })

    const exactFile = makeFile('exact.txt', 10)
    await selectFiles(wrapper, [exactFile])

    expect(wrapper.emitted('exceed-size')).toBeFalsy()
    const uploaded = wrapper.emitted('update:value')![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(1)

    wrapper.unmount()
  })

  it('does not reject anything when maxSize is 0 (unlimited, the default)', async () => {
    const wrapper = mount(UploadZone, { attachTo: document.body })

    const hugeFile = makeFile('huge.txt', 10_000)
    await selectFiles(wrapper, [hugeFile])

    expect(wrapper.emitted('exceed-size')).toBeFalsy()
    expect(wrapper.emitted('update:value')![0][0]).toHaveLength(1)

    wrapper.unmount()
  })
})

describe('UploadZone — maxCount validation', () => {
  it('rejects files beyond maxCount and emits exceed-count with the excess files', async () => {
    const wrapper = mount(UploadZone, {
      props: { multiple: true, maxCount: 2 },
      attachTo: document.body,
    })

    const files = [
      makeFile('a.txt', 3),
      makeFile('b.txt', 3),
      makeFile('c.txt', 3),
    ]
    await selectFiles(wrapper, files)

    const exceedEmitted = wrapper.emitted('exceed-count')
    expect(exceedEmitted).toBeTruthy()
    expect(exceedEmitted![0][0]).toEqual([files[2]])

    const uploaded = wrapper.emitted('update:value')![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(2)
    expect(uploaded.map((f) => f.name)).toEqual(['a.txt', 'b.txt'])

    wrapper.unmount()
  })

  it('does not apply maxCount (or emit exceed-count) when multiple is false', async () => {
    const wrapper = mount(UploadZone, {
      props: { multiple: false, maxCount: 1 },
      attachTo: document.body,
    })

    await selectFiles(wrapper, [makeFile('a.txt', 3), makeFile('b.txt', 3)])

    expect(wrapper.emitted('exceed-count')).toBeFalsy()
    const uploaded = wrapper.emitted('update:value')![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(1)
    expect(uploaded[0].name).toBe('a.txt')

    wrapper.unmount()
  })

  it('counts files already present in the v-model value toward the remaining count', async () => {
    const existing: UploadZoneFile[] = [
      {
        id: 'existing-1',
        raw: makeFile('existing.txt', 1),
        name: 'existing.txt',
        size: 1,
        type: 'text/plain',
        status: 'idle',
        progress: 0,
      },
    ]
    const wrapper = mount(UploadZone, {
      props: { multiple: true, maxCount: 2, value: existing },
      attachTo: document.body,
    })

    const files = [makeFile('a.txt', 3), makeFile('b.txt', 3)]
    await selectFiles(wrapper, files)

    // remaining = maxCount(2) - existing(1) = 1, so only the first new file fits
    expect(wrapper.emitted('exceed-count')![0][0]).toEqual([files[1]])

    const uploaded = wrapper.emitted('update:value')![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(2)
    expect(uploaded.map((f) => f.name)).toEqual(['existing.txt', 'a.txt'])

    wrapper.unmount()
  })

  it('does not limit selection when maxCount is 0 (unlimited, the default)', async () => {
    const wrapper = mount(UploadZone, {
      props: { multiple: true },
      attachTo: document.body,
    })

    const files = [makeFile('a.txt', 3), makeFile('b.txt', 3), makeFile('c.txt', 3)]
    await selectFiles(wrapper, files)

    expect(wrapper.emitted('exceed-count')).toBeFalsy()
    expect(wrapper.emitted('update:value')![0][0]).toHaveLength(3)

    wrapper.unmount()
  })
})

describe('UploadZone — trigger mechanism', () => {
  // The hidden <input type="file"> is a DOM descendant of the clickable
  // dropzone div, and openFilePicker() calls inputRef.value.click() from
  // within the dropzone's own click handler. A real browser's click()
  // implementation is reentrancy-guarded (the spec's "click in progress"
  // flag), so the bubbled synthetic click's own click() call is a safe
  // no-op — verified separately against real Chromium, where the handler
  // runs exactly twice and never recurses further. happy-dom does not
  // implement that guard, so letting the click actually dispatch here
  // would recurse without end. The mock below replaces click() with a
  // no-op so this test exercises the real assertion (the dropzone wires
  // up to open the input) without depending on that unimplemented guard.
  it('clicking the dropzone opens the native file picker', async () => {
    const wrapper = mount(UploadZone, { attachTo: document.body })
    const input = wrapper.find('input[type="file"]')
    const clickSpy = vi
      .spyOn(input.element as HTMLInputElement, 'click')
      .mockImplementation(() => {})

    await wrapper.find('.sh-upload-zone-dropzone').trigger('click')

    expect(clickSpy).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('does not open the file picker when disabled', async () => {
    const wrapper = mount(UploadZone, {
      props: { disabled: true },
      attachTo: document.body,
    })
    const input = wrapper.find('input[type="file"]')
    const clickSpy = vi
      .spyOn(input.element as HTMLInputElement, 'click')
      .mockImplementation(() => {})

    await wrapper.find('.sh-upload-zone-dropzone').trigger('click')

    expect(clickSpy).not.toHaveBeenCalled()

    wrapper.unmount()
  })
})

describe('UploadZone — remove', () => {
  it('removes a file from the list and emits update:value/remove', async () => {
    const existing: UploadZoneFile[] = [
      {
        id: 'file-1',
        raw: makeFile('keep.txt', 1),
        name: 'keep.txt',
        size: 1,
        type: 'text/plain',
        status: 'idle',
        progress: 0,
      },
      {
        id: 'file-2',
        raw: makeFile('remove.txt', 1),
        name: 'remove.txt',
        size: 1,
        type: 'text/plain',
        status: 'idle',
        progress: 0,
      },
    ]
    const wrapper = mount(UploadZone, {
      props: { multiple: true, value: existing },
      attachTo: document.body,
    })

    const removeButtons = wrapper.findAll('.sh-upload-zone-remove')
    expect(removeButtons).toHaveLength(2)
    await removeButtons[1].trigger('click')

    const uploaded = wrapper.emitted('update:value')![0][0] as UploadZoneFile[]
    expect(uploaded).toHaveLength(1)
    expect(uploaded[0].id).toBe('file-1')

    const removeEmitted = wrapper.emitted('remove')
    expect(removeEmitted).toBeTruthy()
    expect((removeEmitted![0][0] as UploadZoneFile).id).toBe('file-2')

    wrapper.unmount()
  })
})
