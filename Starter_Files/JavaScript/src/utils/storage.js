/* ============================================================
   src/utils/storage.js — localStorage Wrapper
   Deejoft Coding School | JavaScript Course Starter
   ============================================================ */

/**
 * Get a value from localStorage. Returns the defaultValue if the key
 * does not exist or if the stored JSON is corrupted.
 *
 * @param {string} key
 * @param {any} [defaultValue=null]
 * @returns {any}
 */
export function storageGet(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * Save a value to localStorage as JSON.
 *
 * @param {string} key
 * @param {any} value
 */
export function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`storageSet('${key}') failed:`, error)
  }
}

/**
 * Remove a key from localStorage.
 *
 * @param {string} key
 */
export function storageRemove(key) {
  localStorage.removeItem(key)
}
