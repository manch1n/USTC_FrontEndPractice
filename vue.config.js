module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://180.76.183.142:80',
                //target: 'http://127.0.0.1:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}