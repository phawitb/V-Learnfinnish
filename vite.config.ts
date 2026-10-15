import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ jsxImportSource: '@sisu/i18n' }), {
    name: 'keep-local-language-context-shared',
    configResolved(config) {
      // Prebundling this local runtime would create a second LanguageContext.
      config.optimizeDeps.include = config.optimizeDeps.include?.filter(name => !name.startsWith('@sisu/i18n'));
    },
  }],
  resolve: { alias: { '@sisu/i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)) } },
  optimizeDeps: { exclude: ['@sisu/i18n/jsx-runtime', '@sisu/i18n/jsx-dev-runtime'] },
  server: { port: 5173, proxy: { '/api': 'http://127.0.0.1:4174' } }
})
