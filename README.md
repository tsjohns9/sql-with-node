# MySQL With NodeJS

A store that runs from the command line. Built with node and MySQL

There are 3 ways to interact with the store. The first is as a customer. To get started first run ```npm install```, and then  run 

```
node bamazonCustomer
```

This will present a table that displays all the products for sale, and then a prompt asking for the product ID to make a purchase.

The second is as a manager. This will display options to buy more of a product, check low inventory, add a new product, and display products for sale.

```
node bamazonManager
```

The last option is to interact with the store as a supervisor. This will display an option to see all product sales by department, and the option to add a new department to the store.

```
node bamazonSuperviser
```

## User Stories

### Customer

1. As a customer I can see a table of all products for sale, and their price.
2. I am prompted to enter the product ID of the item I want to buy.
3. After entering the product ID, I am asked how many I want to buy.
4. If the product quantity is in store, I will be informed of the total cost.
5. If the product is not in stock I will not be able to make a purchase.

### Manager

6. As a manager I am presented with a prompt.
7. I can buy more products, check low inventory, add a new product, and display products for sale.
8. After making a choice, I am presented with the option to return to the main prompt.
9. If I check low inventory and products for sale I am presented with a table of the products.
10. If I buy more products I am asked for the product ID, and the quantity to buy
11. If I add a new product I am asked for the name, the price, the quantity, and its department

### Supervisor

12. As a Supervisor, I am presented with a prompt to view product sales, and create a new department
13. When I create a new department I am prompted to add the name, and the over head cost.
14. If I view sales by department I will see the new department in the result
