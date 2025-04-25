import type { App } from 'vue'
import 'virtual:uno.css'

// 導入組件
import SButton from './components/Button/index.vue'
import SInput from './components/Input/index.vue'
import SSpin from './components/Spin/index.vue'

// 組件列表
const components = {
  SButton,
  SSpin,
  SInput,
}

/**
 * Say hello function - returns a greeting message
 * @param name - Optional name to greet, defaults to "world"
 * @returns A greeting message
 */
export function sayHello(name: string = 'world'): string {
  return `Hello, ${name}!`
}

// 類型聲明
export type { ButtonProps } from './components/Button/types'
export type { InputProps } from './components/Input/types'
export type { SpinProps } from './components/Spin/types'

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
  SSpin
}