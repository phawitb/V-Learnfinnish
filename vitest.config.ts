import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
export default defineConfig({ plugins: [react({ jsxImportSource: '@sisu/i18n' })], resolve: { alias: { '@sisu/i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)) } }, test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' } })
