// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql_libros',
    port: 3306,
    user: 'user',
    password: 'userpassword',
    database: 'libros'
});

module.exports = pool.promise();
