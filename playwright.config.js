const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './e2e-tests',
  
  timeout: 30 * 1000,
  
  fullyParallel: false,
  
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,
  
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5001',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Sekcja odpowiedzialna za automatyczne podniesienie apki do testów
  webServer: {
    command: 'npm run start-prod',
    url: 'http://localhost:5001',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
})