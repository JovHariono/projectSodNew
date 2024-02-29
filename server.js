const { createServer } = require('https'); // Use 'https' module
const { readFileSync } = require('fs');
const { parse } = require('url');
const next = require('next');
const jsonServer = require('json-server');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 8080;
const jsonServerPort = 3001;

// Read SSL certificates
const privateKey = readFileSync('./ssl/private-key.pem', 'utf8');
const certificate = readFileSync('./ssl/certificate.pem', 'utf8');
const ca = readFileSync('./ssl/ca.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Create HTTPS server
createServer(credentials, async (req, res) => {
  try {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      await app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      await app.render(req, res, '/b', query);
    } else {
      await handle(req, res, parsedUrl);
    }
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.statusCode = 500;
    res.end('internal server error');
  }
}).listen(port, hostname, (err) => {
  if (err) throw err;
  console.log(`> Next.js Ready on https://${hostname}:${port}`);
});

// Create JSON Server
const jsonServerApp = jsonServer.create();
const jsonRouter = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
jsonServerApp.use(middlewares);
jsonServerApp.use('/api', jsonRouter);

// Listen for JSON Server on HTTP (not HTTPS)
jsonServerApp.listen(jsonServerPort, hostname, () => {
  console.log(`> JSON Server Ready on https://${hostname}:${jsonServerPort}/api`);
});

// Note: JSON Server is running on HTTP. If needed, you can set up HTTPS for it as well.
