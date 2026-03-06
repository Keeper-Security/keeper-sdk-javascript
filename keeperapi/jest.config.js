module.exports = {
  // Only match test files with .test.ts or .test.js extensions
  testMatch: [
    "<rootDir>/src/__tests__/**/*.test.ts",
    "<rootDir>/src/__tests__/**/*.test.js",
  ],

  // Ignore dist folder and node_modules
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // Transform ESM packages from node_modules
  transformIgnorePatterns: ["node_modules/(?!@noble/)"],

  // Module file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Setup file to run before each test file
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
