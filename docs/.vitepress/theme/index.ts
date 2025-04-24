import DefaultTheme from 'vitepress/theme'
import ShelterUI from '../../../src/index'
import '../../../src/style.css'
import 'uno.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ShelterUI)
  }
}