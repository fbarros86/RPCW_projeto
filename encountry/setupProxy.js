const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/repositories',
    createProxyMiddleware({
      target: 'http://localhost:7200',
      changeOrigin: true,
    })
  );
};
