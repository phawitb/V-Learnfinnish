import { jsxDEV as original } from 'react/jsx-dev-runtime';
import { LocalizedElement } from './LocalizedElement';
export { Fragment } from 'react/jsx-dev-runtime';
export type { JSX } from 'react/jsx-dev-runtime';
export const jsxDEV: typeof original = (type, props, key, isStaticChildren, source, self) => typeof type === 'string'
  ? original(LocalizedElement, { ...(props as Record<string, unknown>), localeTag: type }, key, isStaticChildren, source, self)
  : original(type, props, key, isStaticChildren, source, self);
