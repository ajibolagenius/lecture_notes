/* ============================================================
   src/utils/api.js — Data Fetching Utilities
   Deejoft Coding School | JavaScript Course Starter
   ============================================================ */

/**
 * Fetch JSON from a URL with error handling and optional abort signal.
 *
 * @param {string} url
 * @param {object} [options]
 * @param {AbortSignal} [options.signal] - Optional AbortController signal
 * @returns {Promise<any>} Parsed JSON data
 * @throws {Error} On network failure or non-2xx HTTP status
 *
 * @example
 * const data = await fetchJSON('https://api.example.com/users')
 */
export async function fetchJSON(url, { signal } = {}) {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch multiple URLs in parallel. Returns an array of results.
 * Uses Promise.allSettled so one failure does not cancel the others.
 *
 * @param {string[]} urls
 * @returns {Promise<Array<any|null>>} Array of results (null for failures)
 *
 * @example
 * const [users, courses] = await fetchAll(['/api/users', '/api/courses'])
 */
export async function fetchAll(urls) {
  const results = await Promise.allSettled(urls.map(url => fetchJSON(url)))
  return results.map(r => (r.status === 'fulfilled' ? r.value : null))
}

/**
 * Fetch JSON with an automatic timeout.
 *
 * @param {string} url
 * @param {number} [timeoutMs=8000] - Timeout in milliseconds
 * @returns {Promise<any>}
 * @throws {Error} On timeout or fetch failure
 */
export async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const data = await fetchJSON(url, { signal: controller.signal })
    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms`)
    }
    throw error
  } finally {
    clearTimeout(timer)
  }
}
