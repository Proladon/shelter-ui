import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import ConfigProvider from '../index.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('ConfigProvider — rendering', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(ConfigProvider, {
      slots: { default: '<button>Inside</button>' },
      attachTo: document.body,
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Inside')

    wrapper.unmount()
  })

  it('does not set the CSS custom property when no themeConfig is provided', () => {
    const wrapper = mount(ConfigProvider, { attachTo: document.body })

    expect(wrapper.element.style.getPropertyValue('--sh-primary')).toBe('')

    wrapper.unmount()
  })
})

// Previously, these all mounted with no themeConfig and then applied one via
// setProps, rather than passing themeConfig directly to the initial mount.
// That was working around a real bug: watch(..., { immediate: true }) fired
// during setup(), before the `containerRef` template ref was bound, so
// `applyTheme` returned early on the very first run and never re-ran unless
// the prop changed again. The fix moves the initial application into
// onMounted() (after the ref is bound) and drops `immediate` from the
// watcher, which now only handles subsequent reactive updates. The test
// directly below ("applies themeConfig passed directly at mount, with no
// setProps required") covers that initial-mount path explicitly; the rest
// continue to exercise updates via setProps.
describe('ConfigProvider — themeConfig', () => {
  it('applies themeConfig passed directly at mount, with no setProps required', () => {
    const wrapper = mount(ConfigProvider, {
      props: { themeConfig: { colors: { primary: '#ff0000' } } },
      attachTo: document.body,
    })

    expect(wrapper.element.style.getPropertyValue('--sh-primary')).toBe('#ff0000')

    wrapper.unmount()
  })

  it('sets --sh-primary on its own container element once themeConfig.colors.primary is applied', async () => {
    const wrapper = mount(ConfigProvider, { attachTo: document.body })

    await wrapper.setProps({ themeConfig: { colors: { primary: '#ff0000' } } })

    expect(wrapper.element.style.getPropertyValue('--sh-primary')).toBe('#ff0000')

    wrapper.unmount()
  })

  it('flattens nested color tokens into dash-joined variable names', async () => {
    const wrapper = mount(ConfigProvider, { attachTo: document.body })

    await wrapper.setProps({
      themeConfig: { colors: { bg: { primary: '#001529' } } },
    })

    expect(wrapper.element.style.getPropertyValue('--sh-bg-primary')).toBe('#001529')

    wrapper.unmount()
  })

  it('applies scale category tokens (e.g. spacing) under their CSS segment', async () => {
    const wrapper = mount(ConfigProvider, { attachTo: document.body })

    await wrapper.setProps({ themeConfig: { spacing: { xs: '2px' } } })

    expect(wrapper.element.style.getPropertyValue('--sh-spacing-xs')).toBe('2px')

    wrapper.unmount()
  })

  it('sets --sh-focus-ring from focusRing', async () => {
    const wrapper = mount(ConfigProvider, { attachTo: document.body })

    await wrapper.setProps({ themeConfig: { focusRing: '0 0 0 2px red' } })

    expect(wrapper.element.style.getPropertyValue('--sh-focus-ring')).toBe(
      '0 0 0 2px red',
    )

    wrapper.unmount()
  })

  it('reactively updates the CSS variable again when themeConfig changes a second time', async () => {
    const wrapper = mount(ConfigProvider, { attachTo: document.body })

    await wrapper.setProps({ themeConfig: { colors: { primary: '#ff0000' } } })
    expect(wrapper.element.style.getPropertyValue('--sh-primary')).toBe('#ff0000')

    await wrapper.setProps({ themeConfig: { colors: { primary: '#00ff00' } } })
    expect(wrapper.element.style.getPropertyValue('--sh-primary')).toBe('#00ff00')

    wrapper.unmount()
  })
})
