DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(70) NOT NULL,
  department_name VARCHAR(70) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Idido", "Coffee", 19.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jabanto - Natural Sundried", "Coffee", 18.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Prennial", "Coffee", 18.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ADENISA", "Coffee", 18.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apollo", "Coffee", 15.75, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Slow Motion", "Coffee", 15.75, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mahlkonig EK43 Commercial Grinder", "Espresso Grinder", 2700.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eureka Atom 65 Espresso Grinder", "Espresso Grinder", 1099.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baratza Vario Burr Grinder with Metal PortaHolder", "Espresso Grinder", 479.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("OXO BREW Conical Burr Coffee Grinder with Integrated Scale", "Regular Grinder", 222.37, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baratza Encore Conical Burr Coffee Grinder", "Regular Grinder", 139.00, 13);

