import type { Config } from 'jest';

const config: Config = {
  // core config from NestJs
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.{controller,service,guard,strategy,decorator,handler,pipe}.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',

  // additional config
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/$1',
  },
};

export default config;
