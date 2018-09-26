const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function () {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts")
  // Extend build
  this.extendBuild(config => {
    const tslintLoader = {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {
        typeCheck: true
      }
    }
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/]
      }
    }
    // Add TypeScript loader
    // config.module.rules.push(tslintLoader)
    config.module.rules.push(
      Object.assign({
          test: /((client|server)\.js)|(\.tsx?)$/
        },
        tsLoader
      )
    )
    // Add TypeScript loader for vue files
    for (let rule of config.module.rules) {
      if (rule.loader === "vue-loader") {
        rule.options.loaders = {
          ts: 'ts-loader!tslint-loader'
        }
      }
    }
    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf(".ts") === -1) {
      config.resolve.extensions.push(".ts");
    }

    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      vue: true,
      tslint: true,
      formatter: 'codeframe',
      // https://github.com/TypeStrong/ts-loader#happypackmode-boolean-defaultfalse
      checkSyntacticErrors: process.env.NODE_ENV === 'production'
    }))
  })
}
