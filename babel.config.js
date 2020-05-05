module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: ['10']
      }
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
}
