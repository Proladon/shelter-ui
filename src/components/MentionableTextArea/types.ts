export interface MentionItem {
  value: string
  listValue: string
}

export interface MentionableTextAreaProps {
  value?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
  triggers?: string[]
  userList?: MentionItem[]
  issueList?: MentionItem[]
  emojiList?: MentionItem[]
  label?: string
  class?: string
}

export interface MentionableTextAreaEmits {
  'update:value': [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  mention: [trigger: string, searchValue: string]
}

export interface MentionData {
  users: MentionItem[]
  issues: MentionItem[]
  emoji: MentionItem[]
}
