module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**"],
  resolver: require.resolve(`jest-pnp-resolver`),
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
