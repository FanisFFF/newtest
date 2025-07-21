export function parseLabels(input: string): { text: string }[] {
  return input
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}
