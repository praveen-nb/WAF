const http = require('http');

const WAF = {
  blockedIPs: new Set(),
  blockedUserAgents: new Set(),
  blockedPaths: new Set(),
  blockedHeaders: new Set(),
  blockedMethods: new Set(),
  blockedStatusCodes: new Set(),
  blockIP(ip) {
    this.blockedIPs.add(ip);
  },
  blockUserAgent(userAgent) {
    this.blockedUserAgents.add(userAgent);
  },
  blockPath(path) {
    this.blockedPaths.add(path);
  },
  blockHeader(header) {
    this.blockedHeaders.add(header);
  },
  blockMethod(method) {
    this.blockedMethods.add(method);
  },
  blockStatusCode(statusCode) {
    this.blockedStatusCodes.add(statusCode);
  },
  shouldBlock(req) {
    const { ip, headers, url, method } = req;
    const userAgent = headers['user-agent'];

    return (
      this.blockedIPs.has(ip) ||
      this.blockedUserAgents.has(userAgent) ||
      this.blockedPaths.has(url) ||
      this.blockedHeaders.has(headers) ||
      this.blockedMethods.has(method) ||
      this.blockedStatusCodes.has(res.statusCode)
    );
  },
};

const server = http.createServer((req, res) => {
  if (WAF.shouldBlock(req)) {
    res.statusCode = 403;
    res.end('Access Denied');
  } else {
    // Handle normal request
    res.end('Hello World!');
  }
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
