import DefaultTheme from 'vitepress/theme'
import ShelterUI from '../../../src/index'
import '../../../src/style.css'
import 'virtual:uno.css'
import Demo from './components/Demo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ShelterUI)
    app.component('Demo', Demo)
  }
}