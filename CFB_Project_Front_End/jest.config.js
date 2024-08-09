export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.ts',
    },
    // other Jest configuration options
  
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  }
  };
  