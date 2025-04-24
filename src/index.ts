import type { App } from 'vue'
import 'virtual:uno.css'

// 導入組件
import SButton from './components/Button/index.vue'
import SInput from './components/Input/index.vue'

// 組件列表
const components = {
  SButton,
  SInput,
}

// 類型聲明
export type { ButtonProps } from './components/Button/types'
export type { InputProps } from './components/Input/types'

// 安裝函數
const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
  return app
}

// 默認導出
export default { install, version: '0.1.0', ...components }

// 單獨導出組件
export {
  SButton,
  SInput,
}