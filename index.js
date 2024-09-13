import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { join, extname as _extname } from 'node:path';

const server = createServer((req, res) => {
  const filePath = join('public', req.url);

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    const extname = _extname(filePath);
    let contentType;

    switch (extname) {
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
      case '.png':
        contentType = 'image/png';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(3001, () => {
  console.log('Server running at http://localhost:3000/');
});
