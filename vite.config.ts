import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const repoName = 'JetLend';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    globals: true,
  },
})
