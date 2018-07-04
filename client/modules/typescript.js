module.exports = function() {
    // Add .ts extension for store, middleware and more
    this.nuxt.options.extensions.push("ts")
    // Extend build
    this.extendBuild(config => {
        const tsLoader = {
            loader: "ts-loader",
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        }
        config.module.rules.push({
            test: /\.tsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                typeCheck: true
            }
        })
        // Add TypeScript loader
        config.module.rules.push(Object.assign({
            test: /\.tsx?$/
        }, tsLoader))
        // Add TypeScript loader for vue files
        for (let rule of config.module.rules) {
            if (rule.loader === "vue-loader") {
                rule.options.loaders.ts = tsLoader
            }
        }
        // Add .ts extension in webpack resolve
        if (config.resolve.extensions.indexOf(".ts") === -1) {
            config.resolve.extensions.push(".ts")
        }
    })
}