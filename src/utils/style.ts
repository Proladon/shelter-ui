// 取得 CSS 變數
export const getCssVar = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    `--${varName}`,
  )
}

// 設置 CSS 變數
export const setCssVar = (varName: string, value: string) => {
  document.documentElement.style.setProperty(`--${varName}`, value)
}
