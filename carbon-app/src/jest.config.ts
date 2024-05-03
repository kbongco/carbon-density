// jest.config.js

module.exports = {
  // Other Jest configuration options...
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',// Add this line for SCSS files
    '^.+\\.scss$': 'jest-transform-css',
  },
};
