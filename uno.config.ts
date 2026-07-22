import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { presetShelterUI } from './src/preset'

// Single source of truth for the shelter-ui UnoCSS setup — the preset itself
// (safelist, shortcuts, theme, shared keyframes) lives in src/preset.ts and
// is also what downstream consumer projects import from '@proladon/shelter-ui/preset'.
// presetUno must be explicit here: providing any `presets` array opts out of
// UnoCSS's implicit default-preset injection, so it has to be listed by hand.
export default defineConfig({
  presets: [presetUno(), presetShelterUI()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
