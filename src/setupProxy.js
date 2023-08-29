const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // the base URL where you want to proxy requests
    createProxyMiddleware({
      target: 'https://vhloybnwf3poctpcjw2m66uh6q0kruyq.lambda-url.ap-southeast-2.on.aws/', // your API server URL
      changeOrigin: true, // change the origin of the request to match the target URL
      pathRewrite: {
        '^/api': '', // remove the '/api' prefix when forwarding the request
      },
    })
  );
};
