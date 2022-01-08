/** @type {import('@babel/core').TransformOptions} */
const config = {
  presets: ['next/babel'],
  plugins: [
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
  ],
};

module.exports = config;
