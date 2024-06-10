// const jsonServer = require('json-server')
// const cors = require('cors')
// const path = require('path')

// const server = jsonServer.create()
// const router = jsonServer.router(path.join(__dirname, 'db.json'))
// const middlewares = jsonServer.defaults()

// server.use(cors())
// server.use(jsonServer.bodyParser)
// server.use(middlewares)
// server.use(router)

// const PORT = 3001

// server.listen(PORT, () => {
//   console.log(`JSON Server is running on http://localhost:${PORT}`)
// })


const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults();


server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }))
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});

module.exports = server;
