const jsonServer = require('json-server');
const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Keeps the router setup the same
const middlewares = jsonServer.defaults();

const adapter = new Memory();
const db = low(adapter);

// Seed the in-memory database with the contents of db.json
const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, 'db.json');
const dbContent = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));

db.defaults(dbContent).write();

server.use(middlewares);

// Custom route handling
server.use((req, res, next) => {
  req.db = db;
  next();
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
