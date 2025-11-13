import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Test configuration options
    globals: true,
    environment: "node",
    coverage: {
      enabled: true,
      reporter: ["text", "json", "html"],
    },
    include: ["__tests__/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },  
  }
});