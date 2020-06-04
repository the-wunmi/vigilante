const http = require('http');
const https = require('https');
const events = require('events');
const url = require('url')

const protocols = {
  'http:': http.request,
  'https:': https.request
}
function attachToOutgoingRequest(URI, options) {
  if (typeof URI === "string") options = { ...url.parse(URI), protocol: URI.startsWith("https") ? "https:" : "http:", ...(options || {}) }
  else if (typeof URI === "object") options = URI
  const request = protocols[options.protocol].apply(this, arguments);
  const _request = {
    host: options.host, port: options.port, hash: options.hash, search: options.search, query: options.query,
    pathname: options.pathname, path: options.path, href: options.href, url: options.url, method: request.method || "GET",
    headers: options.headers, body: options.body
  }
  request.on('response', function (res) {
    let data = ''
    res.on('data', chunk => data += chunk);
    res.on('end', () => vigilante.emit('success', _request, {
      statusCode: res.statusCode, headers: res.headers, trailers: res.trailers,
      httpVersion: res.httpVersion, url: res.url, body: data
    }));
    res.on('error', error => vigilante.emit('error', _request, error));
  });
  request.on('error', error => vigilante.emit('error', _request, error))
  return request
}
http.request = attachToOutgoingRequest.bind(http)
https.request = attachToOutgoingRequest.bind(https);

const vigilante = module.exports = new events.EventEmitter();