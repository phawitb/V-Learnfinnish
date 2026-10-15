import { jsx as originalJsx, jsxs as originalJsxs } from 'react/jsx-runtime';
import { LocalizedElement } from './LocalizedElement';
export { Fragment } from 'react/jsx-runtime';
export type { JSX } from 'react/jsx-runtime';
export const jsx: typeof originalJsx = (type, props, key) => typeof type === 'string'
  ? originalJsx(LocalizedElement, { ...(props as Record<string, unknown>), localeTag: type }, key)
  : originalJsx(type, props, key);
export const jsxs: typeof originalJsxs = (type, props, key) => typeof type === 'string'
  ? originalJsxs(LocalizedElement, { ...(props as Record<string, unknown>), localeTag: type }, key)
  : originalJsxs(type, props, key);
