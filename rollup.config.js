const resolve = require('@rollup/plugin-node-resolve');

module.exports = {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/main.js',
    format: 'es',
  },
  plugins: [resolve()],
};
