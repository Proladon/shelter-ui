# UnoCSS Theme Colors

This file defines the allowed UnoCSS theme colors for new components in this repository.

```ts
{
  primary: 'var(--sh-primary)',
  secondary: 'var(--sh-secondary)',
  'bg.primary': 'var(--sh-bg-primary)',
  'bg.secondary': 'var(--sh-bg-secondary)',
  'text.base': 'var(--sh-text-base)',
  'text.primary': 'var(--sh-text-primary)',
  'border.base': 'var(--sh-border-base)',
  'border.primary': 'var(--sh-border-primary)',
  'status.info': 'var(--sh-status-info)',
  'status.danger': 'var(--sh-status-danger)',
  'status.warning': 'var(--sh-status-warning)',
  'status.success': 'var(--sh-status-success)',
  'primary.darken': 'var(--sh-primary-darken)',
  'primary.lighten': 'var(--sh-primary-lighten)',
  'primary.fade': 'var(--sh-primary-fade)',
  'secondary.darken': 'var(--sh-secondary-darken)',
  'secondary.lighten': 'var(--sh-secondary-lighten)',
  'secondary.fade': 'var(--sh-secondary-fade)',
  'bg.primary.darken': 'var(--sh-bg-primary-darken)',
  'bg.primary.lighten': 'var(--sh-bg-primary-lighten)',
  'bg.primary.fade': 'var(--sh-bg-primary-fade)',
  'bg.secondary.darken': 'var(--sh-bg-secondary-darken)',
  'bg.secondary.lighten': 'var(--sh-bg-secondary-lighten)',
  'bg.secondary.fade': 'var(--sh-bg-secondary-fade)',
  'text.base.darken': 'var(--sh-text-base-darken)',
  'text.base.lighten': 'var(--sh-text-base-lighten)',
  'text.base.fade': 'var(--sh-text-base-fade)',
  'text.primary.darken': 'var(--sh-text-primary-darken)',
  'text.primary.lighten': 'var(--sh-text-primary-lighten)',
  'text.primary.fade': 'var(--sh-text-primary-fade)',
  'border.base.darken': 'var(--sh-border-base-darken)',
  'border.base.lighten': 'var(--sh-border-base-lighten)',
  'border.base.fade': 'var(--sh-border-base-fade)',
  'border.primary.darken': 'var(--sh-border-primary-darken)',
  'border.primary.lighten': 'var(--sh-border-primary-lighten)',
  'border.primary.fade': 'var(--sh-border-primary-fade)',
  'status.info.darken': 'var(--sh-status-info-darken)',
  'status.info.lighten': 'var(--sh-status-info-lighten)',
  'status.info.fade': 'var(--sh-status-info-fade)',
  'status.danger.darken': 'var(--sh-status-danger-darken)',
  'status.danger.lighten': 'var(--sh-status-danger-lighten)',
  'status.danger.fade': 'var(--sh-status-danger-fade)',
  'status.warning.darken': 'var(--sh-status-warning-darken)',
  'status.warning.lighten': 'var(--sh-status-warning-lighten)',
  'status.warning.fade': 'var(--sh-status-warning-fade)',
  'status.success.darken': 'var(--sh-status-success-darken)',
  'status.success.lighten': 'var(--sh-status-success-lighten)',
  'status.success.fade': 'var(--sh-status-success-fade)'
}
```

## Usage

- In class attributes, use Uno utility tokens, for example: `class="bg-bg.primary"`.
- In `<style>` blocks, use `@apply`, for example:

```css
.some-class {
  @apply bg-bg.primary border-border.primary;
}
```

- In inline style or script logic, use CSS variables directly (for example `var(--sh-primary)`) instead of hard-coded colors.

Do not introduce hard-coded `hex/rgb/hsl` colors for component UI styles.
