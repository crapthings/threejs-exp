const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
      // secure: false,
      // logLevel: 'debug',
      pathRewrite: {
        '^/api': '',
      },
    })
  )
}
