const jestConfig = {
  testURL: "http://localhost",
  collectCoverageFrom: ["src/**/*.+(js|jsx|ts|tsx)"],
  coverageDirectory: "<rootDir>/coverage",
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/__tests__/**/*.+(js|jsx|ts|tsx)"],
  transformIgnorePatterns: ["/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

module.exports = jestConfig;
