// utils/storage.js
// ============================================================
// Deejoft Coding School | React Native Course Starter
// AsyncStorage wrapper — always JSON.stringify / JSON.parse
// ============================================================
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Storage = {
  /**
   * Read a value. Returns null if the key does not exist.
   * @param {string} key
   * @returns {Promise<any>}
   */
  async get(key) {
    try {
      const raw = await AsyncStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : null
    } catch (e) {
      console.error(`Storage.get('${key}') error:`, e)
      return null
    }
  },

  /**
   * Write a value (serialised to JSON).
   * @param {string} key
   * @param {any} value
   */
  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(`Storage.set('${key}') error:`, e)
    }
  },

  /**
   * Remove a key.
   * @param {string} key
   */
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.error(`Storage.remove('${key}') error:`, e)
    }
  },

  /**
   * Clear all keys — use on logout.
   */
  async clear() {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.error('Storage.clear() error:', e)
    }
  },
}
