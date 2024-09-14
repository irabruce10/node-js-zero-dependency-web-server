// server.js
import { createServer } from 'node:http';
import { access, constants, readFile } from 'node:fs';
import { join, extname as _extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, 'public');

const server = createServer((req, res) => {
  const filePath = join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    const extname = _extname(filePath);
    const contentType = getContentType(extname);

    readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
