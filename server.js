const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const ROUTE_MAP = {
  '/': '/index.html',
  '/home-1': '/index.html',
  '/home1': '/index.html',
  '/home-2': '/home-premium.html',
  '/home2': '/home-premium.html',
  '/products': '/shop/products.html',
  '/shop/products': '/shop/products.html',
  '/occasions': '/shop/occasions.html',
  '/shop/occasions': '/shop/occasions.html',
  '/personalized-gifts': '/customization/personalized-gifts.html',
  '/gift-wrapping': '/customization/gift-wrapping.html',
  '/corporate-gifts': '/customization/corporate-gifts.html',
  '/build-gift-box': '/customization/build-gift-box.html',
  '/contact': '/contact.html',
  '/contact-us': '/contact.html',
  '/about': '/about.html'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (ROUTE_MAP[reqPath]) {
    reqPath = ROUTE_MAP[reqPath];
  } else if (reqPath === '' || reqPath === '/') {
    reqPath = '/index.html';
  }

  let filePath = path.join(__dirname, reqPath);

  // If path has no extension and is not a file, check for .html extension
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      const notFoundPath = path.join(__dirname, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.end(fs.readFileSync(notFoundPath));
      } else {
        res.end('<h1>404 Not Found</h1>');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`LuxeNest Boutique Server running at http://localhost:${PORT}/`);
});
