## Goal

建立一個新的組件，名為 `MentionableTextArea`

## All Needed Context

### Code References

- component:

```
<script setup lang="ts">
import type { ReferenceElement } from 'reka-ui'
import { computedWithControl } from '@vueuse/core'
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxPortal, ComboboxRoot, Label, useFilter } from 'reka-ui'
import { computed, ref, watch, watchEffect } from 'vue'
import { getList, getValue } from './list'
import { getAnchorRect, getSearchValue, getTrigger, getTriggerOffset, replaceValue } from './utils'

const { contains } = useFilter({ sensitivity: 'base' })

const value = ref('')
const trigger = ref<string | null>(null)
const caretOffset = ref<number | null>(null)
const open = ref(false)
const searchValue = ref('')

const textareaRef = ref<InstanceType<typeof ComboboxInput>>()

const reference = computedWithControl(() => [searchValue.value, open.value], () => ({
  getBoundingClientRect: () => {
    if (textareaRef.value?.$el) {
      const { x, y, height } = getAnchorRect(textareaRef.value?.$el)
      return { x, y, height, top: y, left: x, width: 0 }
    }
    else {
      return null
    }
  },
}) as ReferenceElement)

const list = computed(() => {
  const _list = getList(trigger.value)
  return _list.filter(item => contains(item, searchValue.value))
})

watch(() => list.value.length, () => {
  open.value = !!list.value.length
})

watchEffect(() => {
  const textarea = textareaRef.value?.$el as HTMLTextAreaElement | undefined
  if (caretOffset.value !== null && textarea) {
    textarea.setSelectionRange(caretOffset.value, caretOffset.value)
  }
})

function handleChange(ev: InputEvent) {
  const target = ev.target as HTMLTextAreaElement
  const _trigger = getTrigger(target)
  const _searchValue = getSearchValue(target)

  if (_trigger) {
    trigger.value = _trigger
    open.value = true
  }
  else if (!_searchValue) {
    trigger.value = null
    open.value = false
  }

  value.value = target.value
  searchValue.value = _searchValue

  if (!_trigger)
    open.value = false
}

function handleSelect(ev: CustomEvent) {
  const textarea = textareaRef.value?.$el
  if (!textarea)
    return

  const offset = getTriggerOffset(textarea)
  const displayValue = getValue(ev.detail.value, trigger.value)
  if (!displayValue)
    return

  // prevent setting `ComboobxInput`
  ev.preventDefault()

  trigger.value = null
  value.value = replaceValue(value.value, offset, searchValue.value, displayValue)
  const nextCaretOffset = offset + displayValue.length + 1
  caretOffset.value = nextCaretOffset
}
</script>

<template>
  <ComboboxRoot
    v-model:open="open"
    ignore-filter
    :reset-search-term-on-blur="false"
    class="text-foreground flex flex-col"
  >
    <Label
      for="comment"
      class="text-sm font-semibold"
    >
      Comment
    </Label>

    <ComboboxInput
      id="comment"
      ref="textareaRef"
      v-model="value"
      as="textarea"
      class="mt-2 border rounded-md border-muted w-80 p-2"
      rows="5"
      placeholder="Type @, # or :"
      @input="handleChange"
      @pointerdown="open = false"
      @keydown.enter="(ev: KeyboardEvent) => {
        if (open)
          ev.preventDefault()
      }"
      @keydown.left.right="open = false"
    />
    <ComboboxAnchor :reference="reference" />

    <ComboboxPortal>
      <ComboboxContent
        v-if="list.length"
        position="popper"
        side="bottom"
        align="start"
        class="overflow-y-auto overflow-x-hidden max-h-48 max-w-80 bg-card border border-muted-foreground/30 p-1.5 rounded-md"
      >
        <ComboboxItem
          v-for="item in list"
          :key="item"
          :value="item"
          class="px-2 py-1 data-[highlighted]:bg-muted rounded flex cursor-default"
          @select="handleSelect"
        >
          <span class="truncate">{{ item }}</span>
        </ComboboxItem>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
```

- mockData

```
const users = [
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
  { value: '@Guria', listValue: 'Guria' },
  { value: '@anuraghazra', listValue: 'anuraghazra' },
  { value: '@jxom', listValue: 'jxom' },
  { value: '@renatorib', listValue: 'renatorib' },
  { value: '@folz', listValue: 'folz' },
  { value: '@Slapbox', listValue: 'Slapbox' },
  { value: '@jyash97', listValue: 'jyash97' },
  { value: '@AliLynne', listValue: 'AliLynne' },
  { value: '@DaniGuardiola', listValue: 'DaniGuardiola' },
  { value: '@frassinier', listValue: 'frassinier' },
  { value: '@jperasmus', listValue: 'jperasmus' },
  { value: '@sjaq', listValue: 'sjaq' },
  { value: '@johnsonthedev', listValue: 'johnsonthedev' },
  { value: '@mattrothenberg', listValue: 'mattrothenberg' },
  { value: '@rafael-vitor', listValue: 'rafael-vitor' },
  { value: '@namjul', listValue: 'namjul' },
  { value: '@georgekaran', listValue: 'georgekaran' },
  { value: '@agneym', listValue: 'agneym' },
  { value: '@akinncar', listValue: 'akinncar' },
  { value: '@Miaxos', listValue: 'Miaxos' },
  { value: '@binhxn', listValue: 'binhxn' },
  { value: '@klzns', listValue: 'klzns' },
  { value: '@kaisermann', listValue: 'kaisermann' },
  { value: '@Regaddi', listValue: 'Regaddi' },
  { value: '@codyaverett', listValue: 'codyaverett' },
  { value: '@jrmyio', listValue: 'jrmyio' },
  { value: '@deini', listValue: 'deini' },
  { value: '@danielbartsch', listValue: 'danielbartsch' },
  { value: '@danieldelcore', listValue: 'danieldelcore' },
  { value: '@dkempner', listValue: 'dkempner' },
  { value: '@thebuilder', listValue: 'thebuilder' },
  { value: '@davesteinberg', listValue: 'davesteinberg' },
  { value: '@Saeris', listValue: 'Saeris' },
  { value: '@edkf', listValue: 'edkf' },
  { value: '@forivall', listValue: 'forivall' },
  { value: '@nstfkc', listValue: 'nstfkc' },
  { value: '@ramiel', listValue: 'ramiel' },
  { value: '@itsmealves', listValue: 'itsmealves' },
  { value: '@gabrielreisn', listValue: 'gabrielreisn' },
  { value: '@ggoodman', listValue: 'ggoodman' },
  { value: '@guillaumewuip', listValue: 'guillaumewuip' },
  { value: '@jeremija', listValue: 'jeremija' },
  { value: '@JMIHC', listValue: 'JMIHC' },
  { value: '@menor', listValue: 'menor' },
  { value: '@JuhQ', listValue: 'JuhQ' },
  { value: '@frontendwizard', listValue: 'frontendwizard' },
  { value: '@onluiz', listValue: 'onluiz' },
  { value: '@luizcieslak', listValue: 'luizcieslak' },
  { value: '@luciorubeens', listValue: 'luciorubeens' },
  { value: '@MADEiN83', listValue: 'MADEiN83' },
  { value: '@madiodio', listValue: 'madiodio' },
  { value: '@manojkumar-ally', listValue: 'manojkumar-ally' },
  { value: '@ciampo', listValue: 'ciampo' },
  { value: '@MateusAndrade', listValue: 'MateusAndrade' },
  { value: '@matthaywardwebdesign', listValue: 'matthaywardwebdesign' },
  { value: '@mattfwood', listValue: 'mattfwood' },
  { value: '@mitjapotocin', listValue: 'mitjapotocin' },
  { value: '@nathanforce', listValue: 'nathanforce' },
  { value: '@ItsJonQ', listValue: 'ItsJonQ' },
  { value: '@ReutSher1', listValue: 'ReutSher1' },
  { value: '@roblevintennis', listValue: 'roblevintennis' },
  { value: '@Thebigbignooby', listValue: 'Thebigbignooby' },
  { value: '@ryardley', listValue: 'ryardley' },
  { value: '@lxcid', listValue: 'lxcid' },
  { value: '@Taym95', listValue: 'Taym95' },
  { value: '@TimonVS', listValue: 'TimonVS' },
  { value: '@vhfmag', listValue: 'vhfmag' },
  { value: '@vvo', listValue: 'vvo' },
  { value: '@wardoost', listValue: 'wardoost' },
  { value: '@yeion7', listValue: 'yeion7' },
  { value: '@ZachHaber', listValue: 'ZachHaber' },
  { value: '@nicomaligne', listValue: 'nicomaligne' },
  { value: '@sarayourfriend', listValue: 'sarayourfriend' },
  { value: '@strass', listValue: 'strass' },
  { value: '@haodt', listValue: 'haodt' },
]

const issues = [
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
  { value: '#1011', listValue: '#1011 Dependency Dashboard' },
  { value: '#983', listValue: '#983 [V2] Transition component' },
  { value: '#981', listValue: '#981 chore: Add `disclosure-animated` example' },
  { value: '#972', listValue: '#972 Add. turborepo' },
  { value: '#970', listValue: '#970 chore: Add `toolbar` example ' },
  {
    value: '#964',
    listValue: '#964 chore: Add `tab-auto-collapsible` example',
  },
  { value: '#955', listValue: '#955 Accordion' },
  { value: '#939', listValue: '#939 [v2] Examples' },
  {
    value: '#931',
    listValue:
      '#931 Tooltip doesn\'t recalculate placement on inner text change',
  },
  { value: '#929', listValue: '#929 Type error for latest Reakit' },
  { value: '#928', listValue: '#928 Fix Popover link to dialog docs' },
  {
    value: '#925',
    listValue:
      '#925 Remove aria-controls and aria-expanded from modal disclosures',
  },
  {
    value: '#919',
    listValue: '#919 Tab: Add option to not activate tab on mousedown',
  },
  {
    value: '#890',
    listValue:
      '#890 Use a state machine for representing Dialog/Tooltip/Popover state',
  },
  {
    value: '#887',
    listValue:
      '#887 Tooltips need to follow wcag 1.4.13 - allow hovering over tooltip',
  },
  {
    value: '#885',
    listValue:
      '#885 Body scroll should be enabled only after the animation ends',
  },
  {
    value: '#865',
    listValue: '#865 Tooltip doesn\'t show up in fullscreen mode',
  },
  {
    value: '#863',
    listValue:
      '#863 Dialog doesn\'t allow interaction with 1password browser extension',
  },
  {
    value: '#856',
    listValue:
      '#856 Unexpected body scrolls when using Menu with `modal: true`',
  },
  {
    value: '#855',
    listValue:
      '#855 input with `autoFocus` inside Dialog breaks returned focus',
  },
  {
    value: '#844',
    listValue: '#844 IdProvider produces changing ids with next.js',
  },
  {
    value: '#818',
    listValue:
      '#818 fix: Fix accidental menu item click by opening `Menu` with space on Firefox',
  },
  {
    value: '#814',
    listValue:
      '#814 Firefox automatically select first menu item on Space for opening menu',
  },
  {
    value: '#806',
    listValue:
      '#806 Cannot select text without focusable container when Dialog is open',
  },
  { value: '#802', listValue: '#802 fix: Fix `Portal` warning on Next.js' },
  { value: '#745', listValue: '#745 RFC: Hybrid implicit/explicit state' },
  {
    value: '#656',
    listValue: '#656 Warning message outputted while using tooltip with nextjs',
  },
  { value: '#653', listValue: '#653 More configurability for tooltip' },
  { value: '#626', listValue: '#626 Examples' },
  { value: '#624', listValue: '#624 Cross browser testing' },
  { value: '#487', listValue: '#487 RFC: Support controlled state hooks' },
  { value: '#469', listValue: '#469 Cannot scroll on view in popup' },
  { value: '#434', listValue: '#434 Who is using Ariakit?' },
  { value: '#399', listValue: '#399 State what screen readers are tested' },
  { value: '#374', listValue: '#374 DateTime Picker' },
]

const emoji = [
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
  { value: '😙', listValue: '😙 kissing_smiling_eyes' },
  { value: '😛', listValue: '😛 stuck_out_tongue' },
  { value: '😴', listValue: '😴 sleeping' },
  { value: '😟', listValue: '😟 worried' },
  { value: '😦', listValue: '😦 frowning' },
  { value: '😧', listValue: '😧 anguished' },
  { value: '😮', listValue: '😮 open_mouth' },
  { value: '😬', listValue: '😬 grimacing' },
  { value: '😕', listValue: '😕 confused' },
  { value: '😯', listValue: '😯 hushed' },
  { value: '😑', listValue: '😑 expressionless' },
  { value: '😒', listValue: '😒 unamused' },
  { value: '😅', listValue: '😅 sweat_smile' },
  { value: '😓', listValue: '😓 sweat' },
  { value: '😥', listValue: '😥 disappointed_relieved' },
  { value: '😩', listValue: '😩 weary' },
  { value: '😔', listValue: '😔 pensive' },
  { value: '😞', listValue: '😞 disappointed' },
  { value: '😖', listValue: '😖 confounded' },
  { value: '😨', listValue: '😨 fearful' },
  { value: '😰', listValue: '😰 cold_sweat' },
  { value: '😣', listValue: '😣 persevere' },
  { value: '😢', listValue: '😢 cry' },
  { value: '😭', listValue: '😭 sob' },
  { value: '😂', listValue: '😂 joy' },
  { value: '😲', listValue: '😲 astonished' },
  { value: '😱', listValue: '😱 scream' },
  { value: '😫', listValue: '😫 tired_face' },
  { value: '😠', listValue: '😠 angry' },
  { value: '😡', listValue: '😡 rage' },
  { value: '😤', listValue: '😤 triumph' },
  { value: '😪', listValue: '😪 sleepy' },
  { value: '😋', listValue: '😋 yum' },
  { value: '😷', listValue: '😷 mask' },
  { value: '😎', listValue: '😎 sunglasses' },
  { value: '😵', listValue: '😵 dizzy_face' },
  { value: '👿', listValue: '👿 imp' },
  { value: '😈', listValue: '😈 smiling_imp' },
  { value: '😐', listValue: '😐 neutral_face' },
  { value: '😶', listValue: '😶 no_mouth' },
  { value: '😇', listValue: '😇 innocent' },
  { value: '👽', listValue: '👽 alien' },
  { value: '💛', listValue: '💛 yellow_heart' },
  { value: '💙', listValue: '💙 blue_heart' },
  { value: '💜', listValue: '💜 purple_heart' },
  { value: '❤️', listValue: '❤️ heart' },
  { value: '💚', listValue: '💚 green_heart' },
  { value: '💔', listValue: '💔 broken_heart' },
  { value: '💓', listValue: '💓 heartbeat' },
  { value: '💗', listValue: '💗 heartpulse' },
  { value: '💕', listValue: '💕 two_hearts' },
  { value: '💞', listValue: '💞 revolving_hearts' },
  { value: '💘', listValue: '💘 cupid' },
  { value: '💖', listValue: '💖 sparkling_heart' },
  { value: '✨', listValue: '✨ sparkles' },
  { value: '⭐', listValue: '⭐ star' },
  { value: '🌟', listValue: '🌟 star2' },
  { value: '💫', listValue: '💫 dizzy' },
  { value: '💥', listValue: '💥 boom' },
  { value: '💥', listValue: '💥 collision' },
  { value: '💢', listValue: '💢 anger' },
  { value: '❗', listValue: '❗ exclamation' },
  { value: '❓', listValue: '❓ question' },
  { value: '💤', listValue: '💤 zzz' },
  { value: '💨', listValue: '💨 dash' },
  { value: '💦', listValue: '💦 sweat_drops' },
  { value: '🎶', listValue: '🎶 notes' },
  { value: '🎵', listValue: '🎵 musical_note' },
  { value: '🔥', listValue: '🔥 fire' },
  { value: '💩', listValue: '💩 hankey' },
  { value: '💩', listValue: '💩 poop' },
  { value: '💩', listValue: '💩 shit' },
  { value: '👍', listValue: '👍 +1' },
  { value: '👍', listValue: '👍 thumbsup' },
  { value: '👎', listValue: '👎 +1' },
  { value: '👎', listValue: '👎 thumbsdown' },
  { value: '👌', listValue: '👌 ok_hand' },
  { value: '👊', listValue: '👊 facepunch' },
  { value: '✊', listValue: '✊ fist' },
  { value: '✌️', listValue: '✌️ v' },
  { value: '👋', listValue: '👋 wave' },
  { value: '✋', listValue: '✋ raised_hand' },
  { value: '👐', listValue: '👐 open_hands' },
  { value: '☝️', listValue: '☝️ point_up' },
  { value: '👇', listValue: '👇 point_down' },
  { value: '👈', listValue: '👈 point_left' },
  { value: '👉', listValue: '👉 point_right' },
  { value: '🙌', listValue: '🙌 raised_hands' },
  { value: '🙏', listValue: '🙏 pray' },
  { value: '👆', listValue: '👆 point_up_2' },
  { value: '👏', listValue: '👏 clap' },
  { value: '💪', listValue: '💪 muscle' },
  { value: '🤘', listValue: '🤘 metal' },
  { value: '🖕', listValue: '🖕 fu' },
  { value: '🚶', listValue: '🚶 walking' },
  { value: '🏃', listValue: '🏃 runner' },
  { value: '🏃', listValue: '🏃 running' },
  { value: '👫', listValue: '👫 couple' },
  { value: '👪', listValue: '👪 family' },
  { value: '👬', listValue: '👬 two_men_holding_hands' },
  { value: '👭', listValue: '👭 two_women_holding_hands' },
  { value: '💃', listValue: '💃 dancer' },
  { value: '👯', listValue: '👯 dancers' },
  { value: '🙆‍♀️', listValue: '🙆‍♀️ ok_woman' },
  { value: '🙅', listValue: '🙅 no_good' },
  { value: '💁', listValue: '💁 information_desk_person' },
  { value: '🙋', listValue: '🙋 raising_hand' },
  { value: '👰‍♀️', listValue: '👰‍♀️ bride_with_veil' },
  { value: '🙇', listValue: '🙇 bow' },
  { value: '💏', listValue: '💏 couplekiss' },
  { value: '💑', listValue: '💑 couple_with_heart' },
  { value: '💆', listValue: '💆 massage' },
  { value: '💇', listValue: '💇 haircut' },
  { value: '💅', listValue: '💅 nail_care' },
  { value: '👦', listValue: '👦 boy' },
  { value: '👧', listValue: '👧 girl' },
  { value: '👩', listValue: '👩 woman' },
  { value: '👨', listValue: '👨 man' },
  { value: '👶', listValue: '👶 baby' },
  { value: '👵', listValue: '👵 older_woman' },
  { value: '👴', listValue: '👴 older_man' },
  { value: '👲', listValue: '👲 man_with_gua_pi_mao' },
  { value: '👳‍♂️', listValue: '👳‍♂️ man_with_turban' },
  { value: '👷', listValue: '👷 construction_worker' },
  { value: '👮', listValue: '👮 cop' },
  { value: '👼', listValue: '👼 angel' },
  { value: '👸', listValue: '👸 princess' },
  { value: '😺', listValue: '😺 smiley_cat' },
  { value: '😸', listValue: '😸 smile_cat' },
  { value: '😻', listValue: '😻 heart_eyes_cat' },
  { value: '😽', listValue: '😽 kissing_cat' },
  { value: '😼', listValue: '😼 smirk_cat' },
  { value: '🙀', listValue: '🙀 scream_cat' },
  { value: '😿', listValue: '😿 crying_cat_face' },
  { value: '😹', listValue: '😹 joy_cat' },
  { value: '😾', listValue: '😾 pouting_cat' },
  { value: '👹', listValue: '👹 japanese_ogre' },
  { value: '👺', listValue: '👺 japanese_goblin' },
  { value: '🙈', listValue: '🙈 see_no_evil' },
  { value: '🙉', listValue: '🙉 hear_no_evil' },
  { value: '🙊', listValue: '🙊 speak_no_evil' },
  { value: '💂‍♂️', listValue: '💂‍♂️ guardsman' },
  { value: '💀', listValue: '💀 skull' },
  { value: '🐾', listValue: '🐾 feet' },
  { value: '👄', listValue: '👄 lips' },
  { value: '💋', listValue: '💋 kiss' },
  { value: '💧', listValue: '💧 droplet' },
  { value: '👂', listValue: '👂 ear' },
  { value: '👀', listValue: '👀 eyes' },
  { value: '👃', listValue: '👃 nose' },
  { value: '👅', listValue: '👅 tongue' },
  { value: '🔔', listValue: '🔔 bell' },
  { value: '🔕', listValue: '🔕 no_bell' },
  { value: '🎋', listValue: '🎋 tanabata_tree' },
  { value: '🎉', listValue: '🎉 tada' },
  { value: '🎊', listValue: '🎊 confetti_ball' },
  { value: '🔮', listValue: '🔮 crystal_ball' },
  { value: '♻️', listValue: '♻️ recycle' },
  { value: '🔚', listValue: '🔚 end' },
  { value: '🔛', listValue: '🔛 on' },
  { value: '🔜', listValue: '🔜 soon' },
]

export const defaultTriggers = ['@', '#', ':']

export function getList(trigger: string | null) {
  switch (trigger) {
    case '@':
      return users.map(user => user.listValue)
    case '#':
      return issues.map(issue => issue.listValue)
    case ':':
      return emoji.map(item => item.listValue)
    default:
      return []
  }
}

export function getValue(listValue: string, trigger: string | null) {
  const list
    = trigger === '@'
      ? users
      : trigger === '#'
        ? issues
        : trigger === ':'
          ? emoji
          : []
  return list.find(item => item.listValue === listValue)?.value
}
```

- utils:

```
import { defaultTriggers } from './list'

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
  if (!previousChar)
    return null
  const secondPreviousChar = value[selectionStart - 2]
  const isIsolated = !secondPreviousChar || /\s/.test(secondPreviousChar)
  if (!isIsolated)
    return null
  if (triggers.includes(previousChar))
    return previousChar
  return null
}

export function getSearchValue(
  element: HTMLTextAreaElement,
  triggers = defaultTriggers,
) {
  const offset = getTriggerOffset(element, triggers)
  if (offset === -1)
    return ''
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

const properties: (keyof CSSStyleDeclaration)[] = [
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
  'MozTabSize',
]

const isBrowser = typeof window !== 'undefined'
const isFirefox = isBrowser && window.navigator.userAgent.toLowerCase().includes('firefox')

function getCaretCoordinates(element: HTMLInputElement | HTMLTextAreaElement, position: number, options?: CaretOptions): CaretCoordinates {
  if (!isBrowser) {
    throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser')
  }

  const debug = options?.debug ?? false
  const isInput = element.nodeName === 'INPUT'

  const div = document.createElement('div')
  div.id = 'input-textarea-caret-position-mirror-div'
  document.body.appendChild(div)

  const style = div.style
  const computed = window.getComputedStyle(element)

  style.whiteSpace = 'pre-wrap'
  if (!isInput)
    style.wordWrap = 'break-word'
  style.position = 'absolute'
  if (!debug)
    style.visibility = 'hidden'

  properties.forEach((prop) => {
    if (isInput && prop === 'lineHeight') {
      handleInputLineHeight(style, computed)
    }
    else {
      style[prop] = computed[prop]
    }
  })

  if (isFirefox) {
    if (element.scrollHeight > parseInt(computed.height)) {
      style.overflowY = 'scroll'
    }
  }
  else {
    style.overflow = 'hidden'
  }

  div.textContent = element.value.substring(0, position)
  if (isInput)
    div.textContent = div.textContent.replace(/\s/g, '\u00A0')

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
  }
  else {
    document.body.removeChild(div)
  }

  return coordinates
}

function handleInputLineHeight(style: CSSStyleDeclaration, computed: CSSStyleDeclaration): void {
  if (computed.boxSizing === 'border-box') {
    const height = parseInt(computed.height)
    const outerHeight
      = parseInt(computed.paddingTop)
        + parseInt(computed.paddingBottom)
        + parseInt(computed.borderTopWidth)
        + parseInt(computed.borderBottomWidth)
    const targetHeight = outerHeight + parseInt(computed.lineHeight)
    if (height > targetHeight) {
      style.lineHeight = `${height - outerHeight}px`
    }
    else if (height === targetHeight) {
      style.lineHeight = computed.lineHeight
    }
    else {
      style.lineHeight = '0'
    }
  }
  else {
    style.lineHeight = computed.height
  }
}
```

### Data models and structure

```
interface ChipProps {
  label: string
  image: string
  icon: component
  removable: boolean
  removeIcon: component
}


ChipSlots:
  - default
  - icon

ChipEmits:
  - remove
  - removeicon
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 MentionableTextArea 組件相關檔案
CREATE: src/components/MentionableTextArea/
    - CREATE: src/components/MentionableTextArea/demos/
    - CREATE: src/components/MentionableTextArea/index.vue
    - CREATE: src/components/MentionableTextArea/utils.ts
    - CREATE: src/components/MentionableTextArea/types.ts

- Task2: 建立 MentionableTextArea 組件相關 demo
UPDATE: src/components/Chip/demos/

- Task3:
EXECUTE: Prps/UpdateComponentDocs.md

- Task4:
EXECUTE: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
