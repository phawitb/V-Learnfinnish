import generated from './en-generated.json';
import overrides from './english-overrides.json';
import first from './en-1.json';
import second from './en-2.json';
import third from './en-3.json';
export const english: Record<string, string> = { ...first, ...second, ...third, ...generated, ...overrides };
const hasThai = /[\u0e00-\u0e7f]/;
type Node = { children: Map<string, Node>; value?: string };
let root: Node | undefined;
function dictionary() {
  if (root) return root;
  root = { children: new Map() };
  for (const [source, translated] of Object.entries(english)) {
    let node = root;
    for (const char of source) {
      let next = node.children.get(char);
      if (!next) { next = { children: new Map() }; node.children.set(char, next); }
      node = next;
    }
    node.value = translated;
  }
  return root;
}
/** Preserve Finnish and dynamic values; translate authored text, never remove unknown content. */
export function translateText(text: string): string {
  if (!hasThai.test(text)) return text;
  const trimmed = text.trim();
  if (Object.hasOwn(english, trimmed)) return text.replace(trimmed, english[trimmed]);
  const tree = dictionary();
  let result = '';
  for (let i = 0; i < text.length;) {
    let node = tree, end = i, replacement: string | undefined;
    for (let j = i; j < text.length; j++) {
      const next = node.children.get(text[j]);
      if (!next) break;
      node = next;
      if (node.value !== undefined) { end = j + 1; replacement = node.value; }
    }
    if (replacement !== undefined) { result += replacement; i = end; }
    else { result += text[i]; i++; }
  }
  return result;
}
