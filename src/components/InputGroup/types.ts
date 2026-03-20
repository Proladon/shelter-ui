export interface InputGroupProps {
  /** Reserved for future size propagation */
}

export interface InputGroupAddonProps {
  /**
   * Placement of the addon relative to the adjacent input.
   * - `inline`      — left/right of the input (default)
   * - `block-start` — above the input / textarea (full-width header bar)
   * - `block-end`   — below the input / textarea (full-width footer bar)
   */
  align?: 'inline' | 'block-start' | 'block-end'
}
