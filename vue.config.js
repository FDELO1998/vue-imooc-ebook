
module.exports = {
    publicPath: 'http://192.168.1.104:8080' === 'production'
    ? './'
    : '/',
    devServer: {
    },
    configureWebpack: {
        performance: {
            hints: 'warning',
            maxAssetSize: 524288,
            maxEntrypointSize: 524288
        }
    }
}

