import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  reporter: [['html', { open: 'never' }]],

 use: {
  testIdAttribute: 'data-test',
  trace: 'on-first-retry',
},

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});