# sql-with-node

A store that runs from the command line. Built with node and MySQL

There are 3 ways to interact with the store. The first is as a customer. To get started run the command below:

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
