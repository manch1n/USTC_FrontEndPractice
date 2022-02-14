module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://180.76.183.142:80',
                ws: true,
                changeOrigin: true
            }
        }
    }
}