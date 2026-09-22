import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { defineConfig } from 'vite-plus'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE_PATH || '/',
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        /* Deterministic, so the client and server builds agree on every class name. */
        generateScopedName: mode === 'production' ? '[local]_[hash:base64:5]' : '[name]__[local]__[hash:base64:4]',
      },
    },
    server: { port: 5290, strictPort: true },
    preview: { port: 4290, strictPort: true },
    build: { target: 'baseline-widely-available', assetsInlineLimit: 0 },
    test: {
      include: ['tests/**/*.test.{ts,tsx}'],
      environment: 'node',
      coverage: {
        // Build and image scripts are exercised by the build/E2E gate; the runtime and SEO logic carry the coverage gate.
        include: ['src/**/*.{ts,tsx}', 'config/**/*.ts'],
        reporter: ['text', 'html'],
        thresholds: { lines: 90, branches: 90 },
      },
    },
    lint: {
      ignorePatterns: ['dist/**', '.ssr/**', 'coverage/**', 'playwright-report/**', 'test-results/**'],
      plugins: ['typescript', 'unicorn', 'oxc', 'react', 'jsx-a11y', 'import'],
      options: { typeAware: true, typeCheck: true },
      rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'react/rules-of-hooks': 'error',
        'react/exhaustive-deps': 'error',
      },
    },
    fmt: {
      ignorePatterns: ['dist/**', '.ssr/**', 'coverage/**', '**/*.html', '**/*.css', '**/*.md', 'bun.lock'],
      semi: false,
      singleQuote: true,
      printWidth: 140,
    },
  }
})
