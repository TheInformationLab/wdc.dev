const proxy = require('http-proxy-middleware');

var postStatsFilter = function(pathname, req) {
  return pathname.match('^/api/stats') && req.method === 'POST'
}

var getStatsFilter = function(pathname, req) {
  return pathname.match('^/api/stats') && req.method === 'GET'
}

module.exports = function(app) {
  app.use(proxy('/api/health', { target: 'http://localhost:3001/api/health' }));
  app.use(proxy(postStatsFilter, {target: 'http://localhost:3002/api/stats' }));
  app.use(proxy(getStatsFilter, {target: 'http://localhost:3003/api/stats' }));
};
