export interface FlexContainerProps {
  align?:
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly"
    | "flex-end"
  justify?:
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly"
    | "space-between"
    | "flex-end"
  gap?: number | string
  col?: boolean
  wrap?: boolean
}
