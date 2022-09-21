const e = require('express');
const mysql = require('mysql');

function insertPool(pool, data, callback){
    let insertQuery = "INSERT INTO productos (nombre, precio) VALUES (?, ?)";
    let query = mysql.format(insertQuery, [data.name, data.price]);
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });

    
    
}

function readPool(pool, callback){
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query('SELECT * FROM productos', function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

function updatePool(pool, data, callback){
    let updateQuery = "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?";
    let query = mysql.format(updateQuery, [data.name, data.price, data.id]);
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

function removePool(pool, data, callback){
    let deleteQuery = "DELETE FROM productos WHERE id = ?";
    let query = mysql.format(deleteQuery, [data.id]);

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });

}

module.exports = { insertPool, readPool, updatePool, removePool };