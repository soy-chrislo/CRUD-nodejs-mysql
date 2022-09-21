const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const { insert, read, update, remove } = require('./operations.js');
const { insertPool, readPool, updatePool, removePool } = require('./operations-pool.js');

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});



connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/insert', (req, res) => {
    insert(connection, {name: 'Coca Cola', price: 1500.0}, (result) => {
        res.json(result);
    });
});

app.get('/insert-pool', (req, res) => {
    insertPool(pool, {name: 'Pepsi', price: 1200.0}, (result) => {
        res.json(result);
    });
});


app.get('/read', (req, res) => {
    read(connection, (result) => {
        res.json(result);
    });
});

app.get('/read-pool', (req, res) => {
    readPool(pool, (result) => {
        res.json(result);
    });
});

// /update todavía no funciona.
app.get('/update', (req, res) => {
    update(connection, {name: 'Jabón Fab', price: 11000, id: 1}, (result) => {
        res.json(result);
    });
});

app.get('/update-pool', (req, res) => {
    updatePool(pool, {name: 'Jabón Fab', price: 11000, id: 1}, (result) => {
        res.json(result);
    });
});

app.get('/remove', (req, res) => {
    remove(connection, {id: 6}, (result) => {
        res.json(result);
    });
});

app.get('/remove-pool', (req, res) => {
    removePool(pool, {id: 4}, (result) => {
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});