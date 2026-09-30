/** Guide progress lives only in this browser (localStorage). Every access is guarded. */
const KEY = 'atlas-guide-progress';

export function readProgress(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function markComplete(slug: string) {
  const done = new Set(readProgress());
  done.add(slug);
  try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch { /* storage unavailable */ }
}

export function resetProgress() {
  try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
}
