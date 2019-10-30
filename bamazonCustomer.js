require('dotenv').config();
const key = require('./key.js');
const mySQL = require("mysql");
const inquirer = require("inquirer");
// const { table } = require('table');

// console.log('hi' + mySQL);
var connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: key.mySQL.user,
    password: key.mySQL.password,
    database: "bamazon"
});
// console.log(connection);

 

// -- Something slacked out on monday(day u missed) has to do with connecting to the server, the password is your mySQL passwork 'yourRootPassword'
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourRootPassword'