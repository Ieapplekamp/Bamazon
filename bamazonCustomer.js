require('dotenv').config();
const key = require('./key.js');
const mySQL = require("mysql");
const inquirer = require("inquirer");
let inventory = [];
// const { table } = require('table');

// console.log('hi' + mySQL);
// console.log(key.mySQL.userName);
var connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: key.mySQL.userName,
    password: key.mySQL.password,
    database: "bamazon",
    insecureAuth : true
});



connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // console.log("this is working");
    
    start();
});

// console.log(makeTable);

function start() {
    inquirer
      .prompt({
        name: "shopping",
        type: "list",
        message: "Would you like to buy [Coffee], an [Espresso Grinder] or a [Regular Grinder]?",
        choices: ["Coffee", "Espresso Grinder", "Regular Grinder", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the coffee or espressoGrinder or regularGrinder functions
        if (answer.shipping === "Coffee") {
        //   coffee();
        }
        else if(answer.shopping === "Espresso Grinder") {
        //   espressoGrinder();
        } else if(answer.shopping === "Regular Grinder") {
        //   regularGrinder();
        } else {
          connection.end();
        }
      });
}

// function coffee() {
//     connection.query("SELECT department_name * FROM products", function (err, results) {
//         if (err) throw err;
//     }
        
        
// }


// function makeTable() {
//     connection.query("SELECT * FROM products", function (err, results) {
//         if (err) throw err;
    

//     })

 

// -- Something slacked out on monday(day u missed) has to do with connecting to the server, the password is your mySQL passwork 'yourRootPassword'
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourRootPassword'