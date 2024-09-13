import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const hostname = '127.0.0.1';
const port = 3001;
const publicDir = path.join(process.cwd(), 'public');

const server = createServer((req, res) => {
  const filePath = path.join(publicDir, req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File not founds');
      return;
    }

    const a = res.end('/', 'index/html');
    console.log(a);

    const extname = path.extname(filePath);
    let contentType;

    switch (extname) {
      case '':
        contentType = 'text/html';
        break;
      case '.html':
        contentType = 'text/html';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;

      default:
        contentType = 'text/html';
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
