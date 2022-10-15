const path = require("path");

const jestConfig = {
  // rootDir: path.join(__dirname, "src"),
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.+(js|jsx|ts|tsx)"],
  coverageDirectory: "<rootDir>/coverage",
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/__tests__/**/*.+(js|jsx|ts|tsx)"],
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

module.exports = jestConfig;
