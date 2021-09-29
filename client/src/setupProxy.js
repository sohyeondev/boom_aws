const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use("https://server.boompro.ml/signup",
        createProxyMiddleware({
            target:'https://server.boompro.ml',
            changeOrigin: true
        })
    )
    app.use('http://3.37.192.173/writedid',
        createProxyMiddleware({
            target: 'http://3.37.192.173',
            changeOrign: true
        })

    )
};