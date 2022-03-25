export const removeProperty = (target: Record<string, unknown>, propertyToRemove: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [propertyToRemove]: _, ...newTarget } = target
  return newTarget
}

const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function triggerWindowResize() {
  const ev = new Event('resize', { bubbles: true, cancelable: false })
  window.dispatchEvent(ev)
}
