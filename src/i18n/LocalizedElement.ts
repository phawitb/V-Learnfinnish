import { createElement, type ReactNode } from 'react';
import { useLanguage } from './Language';
import { translateText } from './translate';

function translateChildren(value: ReactNode): ReactNode {
  if (typeof value === 'string') return translateText(value);
  if (Array.isArray(value)) return value.map(translateChildren);
  return value;
}
/** Localize host elements at React render time, without mutating the DOM or form values. */
export function LocalizedElement({ localeTag, ...props }: Record<string, unknown> & { localeTag: string }) {
  const { language } = useLanguage();
  if (language === 'th' || props['data-no-localize']) return createElement(localeTag, props);
  const translated = { ...props };
  for (const name of ['title', 'alt', 'placeholder', 'aria-label', 'aria-description']) {
    if (typeof translated[name] === 'string') translated[name] = translateText(translated[name] as string);
  }
  if (translated.lang === 'th') translated.lang = 'en';
  translated.children = translateChildren(props.children as ReactNode);
  return createElement(localeTag, translated);
}
