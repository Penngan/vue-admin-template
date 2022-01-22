export type MenuItem = {
  icon?: string
  title: string
  path: string
  disabled?: boolean
  children?: MenuItem[]
  group?: boolean
}
