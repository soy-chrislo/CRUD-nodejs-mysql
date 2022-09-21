const e = require('express');
const mysql = require('mysql');

function insert(connection, data, callback){
    let insertQuery = "INSERT INTO productos (nombre, precio) VALUES (?, ?)";
    let query = mysql.format(insertQuery, [data.name, data.price]);
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function read(connection, callback){
    connection.query('SELECT * FROM productos', function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function update(connection, data, callback){
    let updateQuery = "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?";
    let query = mysql.format(updateQuery, [data.name, data.price, data.id]);

    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function remove(connection, data, callback){
    let deleteQuery = "DELETE FROM productos WHERE id = ?";
    let query = mysql.format(deleteQuery, [data.id]);

    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });

}

module.exports = { insert, read, update, remove };