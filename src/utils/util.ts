export const removeProperty = (target: Record<string, unknown>, propertyToRemove: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [propertyToRemove]: _, ...newTarget } = target
  return newTarget
}
