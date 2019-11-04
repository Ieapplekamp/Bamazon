require('dotenv').config();
const key = require('./key.js');
const mySQL = require("mysql");
const inquirer = require("inquirer");

var connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: key.mySQL.userName,
    password: key.mySQL.password,
    database: "bamazon"
});

connection.connect(function (err) {
    
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();

});

function start() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View products for sale", "View low Inventory", "Add products to inventory", "Add NEW products to inventory", "EXIT"]
        }
    ]).then(function(answer) {
        switch(answer.options) {
            case "View products for sale":
                viewInventory();
                break;
            case "View low Inventory":
                lowInventory();
                break;
            case "Add products to inventory":
                addToInventory();
                break;
            case "Add a NEW products to inventory":
                newProduct();
                break;
            case "EXIT":
                connection.end();
                break; 
        }
    });
}

function viewInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        
        if(err) throw err;
        console.table(res);
        start();

    });
}

function lowInventory() {
    connection.query("SELECT * FROM products HAVING stock_quantity < 10", function (err, res) {
        
        if(err) throw err;
        console.table(res)
        start();

    });
}


function addToInventory() {
    inquirer.prompt([
    {
        name: "item_id",
        type: "input",
        message: "Please enter the Item ID of the product:"
    },
    {
        name: "quanitity",
        type: "input",
        message: "What is the quanitity you would like to add to the inventory?"
    }
    ]).then(function(update) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: update.item_id }, function (err, res) {
            
            if (err) throw err;
            
            if (res[0] === undefined) {
                
                console.log("\n We do not carry an item with that ID. \n");
                start();

            } else {
            
                var addInventory = res[0].stock_quantity += parseInt(update.quanitity);

                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: addInventory
                    },
                    {
                        item_id: update.item_id
                    }],
                        function (err) {
                    
                            if (err) throw err;
                        
                            console.log("\n" + update.quanitity + " " + res[0].product_name + " " + res[0].department_name + "(s). The total stock quantity is now " + res[0].stock_quantity + ".\n");

                            start();

                        });
            }
        });
    });
}

function newProduct() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Create a two digit item id:"
        },
        {
            name: "product_name",
            type: "input",
            message: "What is the product name?"
        },
        {
            name: "department_name",
            type: "list",
            message: "Which department would you like to add this product to?",
            choices: ["Coffee", "Espresso Grinders", "Regular Grinders"]
        },
        {
            name: "price",
            type: "input",
            message: "Price for this product:"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "What is the stock quantity of this product:"
        }
    ]).then(function(response) {
        connection.query("INSER INTO products SET ?",
        [{
            item_id: response.item_id,
            product_name: response.product_name,
            department_name: response.department_name,
            price: response.price,
            stock_quantity: response.stock_quantity
        }],
            function (err) {

            if(err) throw err;
            viewInventory();
                
        });
    });
}

