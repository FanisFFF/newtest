export function useLocalStorage<T>(key: string, initial: T) {
  const load = (): T => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  }

  const save = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return { load, save }
}
