const express = require('express');

const accountsRouter = require('./budgetRouter');

const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.json({ message: "welcome" })
})

server.use('/api/accounts', accountsRouter);

server.use((err , req, res, next) => {
    console.log(err)
    res.status(500).json({error: "SUM TING WONG"})
})

module.exports = server;