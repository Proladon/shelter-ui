import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import ShelterUI from '../../../src/index'
import '../../../src/style.css'
import 'virtual:uno.css'
import Demo from './components/Demo.vue'

export default {
  ...DefaultTheme,
  Layout() {
    // Drive shelter-ui's own [data-theme] light/dark palette (D8) off
    // VitePress's existing dark-mode toggle, so there's one switch for both.
    const { isDark } = useData()
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
    }
    return h(DefaultTheme.Layout)
  },
  enhanceApp({ app }) {
    app.use(ShelterUI)
    app.component('Demo', Demo)
  }
}