# Bamazon

### Overview 

'Bamazon' is a command line storefront app that allows a customer to access a database of products for sale and 'purchase' their desired product. The app also allows for a 'manager' to update the database as needed.

**Technologies Used**
```
   * Node.js
   * Inquirer
   * MYSQL
   * DotEnv
```
### Customer
```
node bamazonCustomer.js
```

The customer command line will return the information from the database, prompting the user to select an department to browse. Once selected, the database will return all the values of that department. If a user is unable to purchase a product due to supply, the will be notified and given a option to continue or disconnect. 

![Customer Gif](https://media.giphy.com/media/W2F260Ya8FbjZYJ56h/giphy.gif)
![Please](/please.png)

### Manager
```
node bamazonManager.js
```

The Manager command line prompts the user to select from an array of options. The 'View products for sale' will return the entire database for an 'overview' of what is available, where the 'View low Inventory' will return a smaller table of all the products with a stock under 10 items. 'Managers' also have the ability to update the existing items in the database or deploy new products to existing departments.

![Manager1 Gif](https://media.giphy.com/media/iE3hLGwM50dBEtMSK9/giphy.gif)

![Manager2 Gif](https://media.giphy.com/media/SWcDAKBXU6TtEOQ9se/giphy.gif)

##### Thank you for shopping at 'Bamazon'
