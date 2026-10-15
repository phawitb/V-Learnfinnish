import { describe, expect, it, vi } from 'vitest'
import { registerPwa } from './pwa'

describe('PWA registration', () => {
  it('registers the root service worker', async () => {
    const register = vi.fn().mockResolvedValue({})

    await registerPwa({ register } as unknown as ServiceWorkerContainer)

    expect(register).toHaveBeenCalledWith('/sw.js')
  })
})

it('does not serve Vite development modules from the offline cache', async () => {
  const { readFileSync } = await import('node:fs');
  const { runInNewContext } = await import('node:vm');
  const handlers: Record<string, (event: unknown) => void> = {};
  const match = vi.fn();
  runInNewContext(readFileSync('public/sw.js', 'utf8'), {
    self: { location: { origin: 'http://localhost:5174' }, addEventListener: (name: string, callback: (event: unknown) => void) => { handlers[name] = callback; } },
    URL, caches: { match }, fetch: vi.fn(),
  });
  for (const path of ['/src/App.tsx', '/src/i18n/Language.tsx', '/node_modules/.vite/deps/react.js', '/@vite/client', '/@react-refresh']) {
    const respondWith = vi.fn();
    handlers.fetch({ request: { method: 'GET', url: `http://localhost:5174${path}`, mode: 'cors' }, respondWith });
    expect(respondWith).not.toHaveBeenCalled();
  }
  expect(match).not.toHaveBeenCalled();
});
