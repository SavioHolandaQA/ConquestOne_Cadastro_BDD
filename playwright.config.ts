import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: process.env.HEADLESS === 'true',
    viewport: { width: 1280, height: 720 },
  },
});