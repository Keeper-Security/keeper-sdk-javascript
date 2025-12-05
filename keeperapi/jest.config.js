module.exports = {
  // Only match test files with .test.ts or .test.js extensions
  testMatch: [
    "<rootDir>/src/__tests__/**/*.test.ts",
    "<rootDir>/src/__tests__/**/*.test.js",
  ],

  // Ignore dist folder and node_modules
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // Module file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
