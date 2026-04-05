/* ============================================================
   src/utils/dom.js — DOM Utility Functions
   Deejoft Coding School | JavaScript Course Starter
   ============================================================
   Import what you need:
     import { $, $$, createElement } from './utils/dom.js'
   ============================================================ */

/**
 * Shorthand for document.querySelector
 * @param {string} selector - CSS selector
 * @param {Element} [ctx=document] - Optional parent element to search within
 * @returns {Element|null}
 */
export const $ = (selector, ctx = document) => ctx.querySelector(selector)

/**
 * Shorthand for document.querySelectorAll, returns an Array
 * @param {string} selector - CSS selector
 * @param {Element} [ctx=document] - Optional parent element
 * @returns {Element[]}
 */
export const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)]

/**
 * Create a DOM element with optional class, text, and attributes
 * @param {string} tag - HTML tag name
 * @param {object} [options]
 * @param {string} [options.cls] - className string
 * @param {string} [options.text] - textContent (safe — no XSS risk)
 * @param {object} [options.attrs] - key/value attribute pairs
 * @param {object} [options.data] - key/value data-* attribute pairs
 * @returns {Element}
 */
export function createElement(tag, { cls, text, attrs = {}, data = {} } = {}) {
  const el = document.createElement(tag)
  if (cls)  el.className = cls
  if (text) el.textContent = text   // textContent is always safe
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  Object.entries(data).forEach(([k, v]) => (el.dataset[k] = v))
  return el
}

/**
 * Show a loading state inside a container
 * @param {Element} container
 * @param {string} [message='Loading…']
 */
export function showLoading(container, message = 'Loading…') {
  container.innerHTML = ''
  const p = createElement('p', { cls: 'loading-state', text: message })
  container.append(p)
}

/**
 * Show an error state inside a container
 * @param {Element} container
 * @param {string} message
 */
export function showError(container, message) {
  container.innerHTML = ''
  const p = createElement('p', { cls: 'error-state', text: `⚠️ ${message}`, attrs: { role: 'alert' } })
  container.append(p)
}
