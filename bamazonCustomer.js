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
        message: "Were we looking to buy?",
        choices: ["Coffee", "Espresso Grinder", "Regular Grinder"]
      })
      .then(function(answer) {
        if (answer.shopping) {
          getProducts(answer.shopping);
        } 
      });
}

function getProducts(department_name) {

  connection.query("SELECT * FROM products WHERE department_name=?", department_name, function(err, res) {
    
    if (err) throw err;
    if(res[0] === undefined) {
      console.log("We do not carry an item with that ID.");
      start();
    }
    console.table(res);

    inquirer.prompt([
      {
        type: "input",
        name: "item_id",
        message: "Type the item_id of the product you would like:"
      },
      {
        type: "input",
        name: "stock_quantity",
        message: "How many were you looking to buy?"
      }
    ]).then(function (userInput) {
        
      var stock_quantity = inventory[userInput.item_id -1].stock_quantity;
      var price = inventory[userInput.item_id -1].price;
  
      if (stock_quantity >= userInput.stock_quantity) {
        var customerTotal = price * userInput.stock_quantity;
        console.log("Your order will be: $" + customerTotal);
        updateInventory(stock_quantity, userInput.stock_quantity, userInput.item_id);
      } else {
        console.log("Not enough in stock");
        inquirer.prompt([
          {
            name: 'next',
            type: 'list',
            message: "What would you like to do next?",
            choices: ["Continue Shopping", "Exit Store"]
          }
        ]).then(function (answer) {
          if (answer.next === "Continue Shopping") {
            questions();
          } else {
            console.log("Thank you, please don't come back!")
            connection.end();
          }
        })
      }
    })
      
  });

}


function updateInventory(stock_quantity, userInputQuantity, item_id) {

  var updatedQuantity = stock_quantity - userInputQuantity;

  connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [updatedQuantity, item_id],
    function (err) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: 'next',
          type: 'list',
          message: "What would you like to do next?",
          choices: ["Continue Shopping", "Exit Store"]
        }
      ]).then(function (answer) {
        if(answer.next === "Continue Shopping") {
          questions();
        } else {
          console.log("Thank you come again!")
          connection.end();
        }
      })
    });
}