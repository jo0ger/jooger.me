module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'no-sequences': 0
  },
  globals: {
    window: true,
    Raven: true,
    particlesJS: true,
    ImageViewer: true
  }
}
