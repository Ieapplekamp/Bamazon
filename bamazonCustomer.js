require('dotenv').config();
const key = require('./key.js');
const mySQL = require("mysql");
const inquirer = require("inquirer");
let inventory = [];
// const { table } = require('table');
var connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: key.mySQL.userName,
    password: key.mySQL.password,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});


function start() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    console.table(res)
    inventory = res;
    questions();
  })
}


function questions() {
    inquirer
      .prompt({
        name: "shopping",
        type: "list",
        message: "Would are we looking to buy?",
        choices: ["Coffee", "Espresso Grinder", "Regular Grinder", "EXIT"]
      })
      .then(function(answer) {
        
        if (answer.shopping === "Coffee") {
          coffee();
        }
        else if (answer.shopping === "Espresso Grinder") {
          // coffee();
          // espressoGrinder();
        } else if(answer.shopping === "Regular Grinder") {
        //   regularGrinder();
        } else {
          connection.end();
        }
      });
}

function coffee() {

  connection.query("SELECT * FROM products WHERE department_name=?", ["Coffee"], function(err, res) {
    
    if (err) throw err;
    console.table(res);

    inquirer.prompt([
      {
        type: "input",
        name: "item_id",
        message: "Which Item Id would you like to buy?"
      },
      {
        type: "input",
        name: "stock_quantity",
        message: "How much were you looking to buy?"
      }
    ]).then(function (userInput) {
        
      var stock_quantity = inventory[userInput.item_id -1].stock_quantity;
      var price = inventory[userInput.item_id -1].price;
  
      // console.log(stock_quantity);
       
      if (stock_quantity > userInput.stock_quantity) {
        var customerTotal = price * userInput.stock_quantity;
        console.log("Bro your order will be: $" + customerTotal);
        // customerTotal(price, userInput.stock_quantity, stock_quantity);
        connection.end();
      } else {
        console.log("Not enough in stock");
        connection.end();
      }
    })
      
  });

}
