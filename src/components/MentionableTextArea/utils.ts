import type { MentionItem } from './types'

export const defaultTriggers = ['@', '#', ':']

const users: MentionItem[] = [
  { value: '@diegohaz', listValue: 'diegohaz' },
  { value: '@tcodes0', listValue: 'tcodes0' },
  { value: '@SCasarotto', listValue: 'SCasarotto' },
  { value: '@matheus1lva', listValue: 'matheus1lva' },
  { value: '@tom-sherman', listValue: 'tom-sherman' },
  { value: '@amogower', listValue: 'amogower' },
  { value: '@lluia', listValue: 'lluia' },
  { value: '@Andarist', listValue: 'Andarist' },
  { value: '@saideepesh000', listValue: 'saideepesh000' },
  { value: '@david-szabo97', listValue: 'david-szabo97' },
  { value: '@ewgenius', listValue: 'ewgenius' },
  { value: '@gracehaz', listValue: 'gracehaz' },
  { value: '@navin-moorthy', listValue: 'navin-moorthy' },
  { value: '@AlexMunoz', listValue: 'AlexMunoz' },
  { value: '@leonardoelias', listValue: 'leonardoelias' },
]

const issues: MentionItem[] = [
  {
    value: '#1253',
    listValue:
      '#1253 Critical dependency: the request of a dependency is an expression',
  },
  { value: '#1247', listValue: '#1247 Add combobox-textarea example' },
  {
    value: '#1196',
    listValue: '#1196 Add end-to-end tests for `hovercard` example',
  },
  { value: '#1165', listValue: '#1165 fix: Fix composite focus scroll issues' },
  { value: '#1094', listValue: '#1094 Latest Alpha19 throws console warnings' },
  {
    value: '#1085',
    listValue:
      '#1085 [dialog] body scroll happening in iPhone safari browser when dialog is opened',
  },
  {
    value: '#1084',
    listValue:
      '#1084 Feature Request: add isPressed state prop to interactive components',
  },
  { value: '#1059', listValue: '#1059 chore: Add checkbox-mixed example' },
  { value: '#1040', listValue: '#1040 [V2] Popover arrow placement' },
  { value: '#1018', listValue: '#1018 feat: Add `Tree` components' },
]

const emoji: MentionItem[] = [
  { value: '😄', listValue: '😄 smile' },
  { value: '😆', listValue: '😆 laughing' },
  { value: '😊', listValue: '😊 blush' },
  { value: '😃', listValue: '😃 smiley' },
  { value: '😏', listValue: '😏 smirk' },
  { value: '😍', listValue: '😍 heart_eyes' },
  { value: '😘', listValue: '😘 kissing_heart' },
  { value: '😚', listValue: '😚 kissing_closed_eyes' },
  { value: '😳', listValue: '😳 flushed' },
  { value: '😌', listValue: '😌 relieved' },
  { value: '😆', listValue: '😆 satisfied' },
  { value: '😁', listValue: '😁 grin' },
  { value: '😉', listValue: '😉 wink' },
  { value: '😀', listValue: '😀 grinning' },
  { value: '😗', listValue: '😗 kissing' },
  { value: '🔥', listValue: '🔥 fire' },
  { value: '💩', listValue: '💩 hankey' },
  { value: '👍', listValue: '👍 thumbsup' },
  { value: '👎', listValue: '👎 thumbsdown' },
  { value: '👌', listValue: '👌 ok_hand' },
]

export function getList(
  trigger: string | null,
  customLists?: {
    userList?: MentionItem[]
    issueList?: MentionItem[]
    emojiList?: MentionItem[]
  },
) {
  switch (trigger) {
    case '@':
      return (customLists?.userList || users).map((user) => user.listValue)
    case '#':
      return (customLists?.issueList || issues).map((issue) => issue.listValue)
    case ':':
      return (customLists?.emojiList || emoji).map((item) => item.listValue)
    default:
      return []
  }
}

export function getValue(
  listValue: string,
  trigger: string | null,
  customLists?: {
    userList?: MentionItem[]
    issueList?: MentionItem[]
    emojiList?: MentionItem[]
  },
) {
  const list =
    trigger === '@'
      ? customLists?.userList || users
      : trigger === '#'
      ? customLists?.issueList || issues
      : trigger === ':'
      ? customLists?.emojiList || emoji
      : []
  return list.find((item) => item.listValue === listValue)?.value
}

export function getTriggerOffset(
  element: HTMLTextAreaElement,
  triggers = defaultTriggers,
) {
  const { value, selectionStart } = element
  for (let i = selectionStart; i >= 0; i--) {
    const char = value[i]
    if (char && triggers.includes(char)) {
      return i
    }
  }
  return -1
}

export function getTrigger(
  element: HTMLTextAreaElement,
  triggers = defaultTriggers,
) {
  const { value, selectionStart } = element
  const previousChar = value[selectionStart - 1]
  if (!previousChar) return null
  const secondPreviousChar = value[selectionStart - 2]
  const isIsolated = !secondPreviousChar || /\s/.test(secondPreviousChar)
  if (!isIsolated) return null
  if (triggers.includes(previousChar)) return previousChar
  return null
}

export function getSearchValue(
  element: HTMLTextAreaElement,
  triggers = defaultTriggers,
) {
  const offset = getTriggerOffset(element, triggers)
  if (offset === -1) return ''
  return element.value.slice(offset + 1, element.selectionStart)
}

export function getAnchorRect(
  element: HTMLTextAreaElement,
  triggers = defaultTriggers,
) {
  const offset = getTriggerOffset(element, triggers)
  const { left, top, height } = getCaretCoordinates(element, offset + 1)
  const { x, y } = element.getBoundingClientRect()
  return {
    x: left + x - element.scrollLeft,
    y: top + y - element.scrollTop,
    height,
  }
}

export function replaceValue(
  prevValue: string,
  offset: number,
  searchValue: string,
  displayValue: string,
) {
  const nextValue = `${
    prevValue.slice(0, offset) + displayValue
  } ${prevValue.slice(offset + searchValue.length + 1)}`
  return nextValue
}

// reference: https://github.com/component/textarea-caret-position/blob/master/index.js
interface CaretCoordinates {
  top: number
  left: number
  height: number
}

interface CaretOptions {
  debug?: boolean
}

const properties = [
  'direction',
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',
  'letterSpacing',
  'wordSpacing',
  'tabSize',
] as const

const isBrowser = typeof window !== 'undefined'
const isFirefox =
  isBrowser && window.navigator.userAgent.toLowerCase().includes('firefox')

function getCaretCoordinates(
  element: HTMLInputElement | HTMLTextAreaElement,
  position: number,
  options?: CaretOptions,
): CaretCoordinates {
  if (!isBrowser) {
    throw new Error(
      'textarea-caret-position#getCaretCoordinates should only be called in a browser',
    )
  }

  const debug = options?.debug ?? false
  const isInput = element.nodeName === 'INPUT'

  const div = document.createElement('div')
  div.id = 'input-textarea-caret-position-mirror-div'
  document.body.appendChild(div)

  const style = div.style
  const computed = window.getComputedStyle(element)

  style.whiteSpace = 'pre-wrap'
  if (!isInput) style.wordWrap = 'break-word'
  style.position = 'absolute'
  if (!debug) style.visibility = 'hidden'

  properties.forEach((prop) => {
    if (isInput && prop === 'lineHeight') {
      handleInputLineHeight(style, computed)
    } else {
      ;(style as any)[prop] = computed[prop]
    }
  })

  if (isFirefox) {
    if (element.scrollHeight > parseInt(computed.height)) {
      style.overflowY = 'scroll'
    }
  } else {
    style.overflow = 'hidden'
  }

  div.textContent = element.value.substring(0, position)
  if (isInput) div.textContent = div.textContent.replace(/\s/g, '\u00A0')

  const span = document.createElement('span')
  span.textContent = element.value.substring(position) || '.'
  div.appendChild(span)

  const coordinates: CaretCoordinates = {
    top: span.offsetTop + parseInt(computed.borderTopWidth),
    left: span.offsetLeft + parseInt(computed.borderLeftWidth),
    height: parseInt(computed.lineHeight),
  }

  if (debug) {
    span.style.backgroundColor = '#aaa'
  } else {
    document.body.removeChild(div)
  }

  return coordinates
}

function handleInputLineHeight(
  style: CSSStyleDeclaration,
  computed: CSSStyleDeclaration,
): void {
  if (computed.boxSizing === 'border-box') {
    const height = parseInt(computed.height)
    const outerHeight =
      parseInt(computed.paddingTop) +
      parseInt(computed.paddingBottom) +
      parseInt(computed.borderTopWidth) +
      parseInt(computed.borderBottomWidth)
    const targetHeight = outerHeight + parseInt(computed.lineHeight)
    if (height > targetHeight) {
      style.lineHeight = `${height - outerHeight}px`
    } else if (height === targetHeight) {
      style.lineHeight = computed.lineHeight
    } else {
      style.lineHeight = '0'
    }
  } else {
    style.lineHeight = computed.height
  }
}
