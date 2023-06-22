/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["src"],
  preset: "ts-jest",
  moduleFileExtensions: ["js", "ts", "tsx", "json", "node"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|sass|scss)$": "identity-obj-proxy",
    "src/(.*)": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};

export default config;
