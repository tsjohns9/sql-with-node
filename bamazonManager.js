var connection = require("./js/connection");
var inquirer = require("inquirer");
var Table = require("cli-table");
var viewProducts = require("./js/manager/viewProducts");

// Will be used to display mysql data as a table
// var table = new Table({ head: ["ID", "Name", "Price", "Quantity"] });

// initial prompt
function mainPrompt() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add new Product"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          // lowInventory();
          break;

        case "Add to Inventory":
          // addInventory();
          break;

        case "Add new Product":
          // addNewProduct();
          break;
      }
    });
}

// displays all products, prices, and stock quantity
// function viewProducts() {
//   // gets the specified columns, and displays the data with a unique name
//   var query =
//     "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products;";
//   connection.query(query, function(err, res) {
//     if (err) throw err;

//     // adds each item to the table
//     addToTable(res);

//     // info about result
//     console.log("Here are all the products");

//     // brings user to main prompt
//     returnPrompt();
//   });
// }

// displays items with a low inventory of less than 5
// function lowInventory() {
//   // grabs the specified columns of items with less than 5. Orders from lowest to highest quantity
//   var query =
//     "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity ASC;";

//   connection.query(query, function(err, res) {
//     if (err) throw err;

//     // adds each item to the table
//     addToTable(res);

//     console.log("Here is what you are low in");
//     returnPrompt();
//   });
// }

// // prompts the user to get info about what to add to the db, and how many of the product
// function addInventory() {
//   inquirer
//     .prompt([
//       {
//         name: "id",
//         message:
//           "Enter the product ID of the item you would like to buy more of \n",
//         type: "prompt"
//       },
//       {
//         name: "quantity",
//         message: "How many would you like to buy?",
//         type: "prompt"
//       }
//     ])
//     .then(function(ans) {
//       // prevents the user from subtracting items from the inventory
//       if (ans.quantity.includes("-")) {
//         return console.log("You may only add to the the inventory");
//       }

//       // gets the selected items quantity
//       getQuantity(ans.id, ans.quantity);
//     });
// }

// // allows the user to create a new row for a product
// function addNewProduct() {
//   inquirer
//     .prompt([
//       {
//         name: "product",
//         message: "Enter the new product name \n",
//         type: "prompt"
//       },
//       {
//         name: "price",
//         message: "Enter the price of the new product \n",
//         type: "prompt"
//       },
//       {
//         name: "department",
//         message: "What department will this be in? \n",
//         type: "prompt"
//       },
//       {
//         name: "inventory",
//         message: "How many would you like to add? \n",
//         type: "prompt"
//       }
//     ])
//     .then(function(ans) {
//       // query to add a new row based on user input
//       var query = "INSERT INTO products SET ?";
//       connection.query(
//         query,
//         // the object below replaces the ? in the query. It is the info we are adding to the table.
//         {
//           product_name: ans.product,
//           department_name: ans.department,
//           price: ans.price,
//           stock_quantity: ans.inventory
//         },
//         function(err, res) {
//           console.log(ans);
//           if (err) throw err;

//           // gets the new product from the db to display to the user. Done this way so we can get the product ID as well.
//           getNewProduct(ans);
//         }
//       );
//     });
// }

// // gets the new product that was added to the db from the addNewProduct function
// function getNewProduct(product) {
//   // mysql query to the db
//   var query =
//     "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products WHERE ?;";
//   connection.query(
//     query,
//     // object below replaces the ? in the query. searches the product_name column for the specified product name
//     {
//       product_name: product.product
//     },
//     function(err, res) {
//       if (err) throw err;

//       // used to display the new product to the user
//       addToTable(res);

//       // info about the result
//       console.log(`${res[0].Name} has been added to the database`);

//       // brings user back to main prompt
//       returnPrompt();
//     }
//   );
// }

// // gets the current quantity of an item. Called in addInventory so that we can get the current inventory, and the total of the item purchased from addInventory
// function getQuantity(id, totalPurchased) {
//   // throws an error if an invalid product id is entered
//   totalItems(id);

//   // query to find the total amount of something in stock
//   var query = "SELECT stock_quantity FROM products WHERE ?";
//   connection.query(
//     query,
//     // object below replaces the ? in var query. It searches the item_id column of the specified product ID.
//     {
//       item_id: id
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res);

//       // updates inventory with the new total after purchase
//       updateInventory(id, res[0].stock_quantity, totalPurchased);
//     }
//   );
// }

// // updates an item with its current quantity + the new total amount purchased. Called in getQuantity.
// // id is the current product id we are updating. currentQ is how much of it is in the db. totalPurchased is how many more items of the product the user wants.
// function updateInventory(id, currentQ, totalPurchased) {
//   // adds the current inventory to the new total purchased. Number() converts the numbers from a string to a number.
//   var newQ = Number(currentQ) + Number(totalPurchased);

//   // sets the new quantity of the item
//   var query = "UPDATE products SET ? WHERE ?";
//   connection.query(
//     query,

//     // replaces the ? in the query. sets the stock_quantity of the specified product by locating its item_id
//     [
//       {
//         stock_quantity: newQ
//       },
//       {
//         item_id: id
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;

//       // gets the updated item to display to the user
//       getItem(id, totalPurchased);
//     }
//   );
// }

// // gets one item from the db. the item id is passed in, and totalPurchased. gets called in updateInventory to display the updated item.
// function getItem(id, totalPurchased) {
//   var query =
//     "SELECT item_id AS 'ID', product_name AS 'Name', price AS 'Price', stock_quantity AS 'Quantity' FROM products WHERE ?;";

//   connection.query(
//     query,

//     // replaces the ? in query. selects the specified product by its item_id.
//     {
//       item_id: id
//     },
//     function(err, res) {
//       if (err) throw err;

//       // adds the updated item to the table
//       addToTable(res);

//       // info about the result
//       console.log(`You added ${totalPurchased} of ${res[0].Name}`);

//       // brings user to main prompt
//       returnPrompt();
//     }
//   );
// }

// // returns user to main prompt, or exits the app. Gets called in each main option at the end of the function.
// function returnPrompt() {
//   inquirer
//     .prompt([
//       {
//         name: "mainPrompt",
//         type: "list",
//         message: "Return to main menu?",
//         choices: ["Yes", "No"]
//       }
//     ])
//     .then(function(ans) {
//       // resets table so that a new table is displayed for each search
//       table = new Table({ head: ["ID", "Name", "Price", "Quantity"] });
//       if (ans.mainPrompt === "Yes") {
//         mainPrompt();
//       } else {
//         connection.end();
//         return console.log("Goodbye!");
//       }
//     });
// }

// // checks for a valid product ID by returning a total count of rows from the products table. Throws an error if one occurs
// function totalItems(id) {
//   // counts how many rows in the products table
//   var query = "SELECT COUNT(*) AS total FROM products;";

//   connection.query(query, function(err, res) {
//     if (err) throw err;
//     if (id > res[0].total || id < 1) throw "Invalid product ID";
//   });
// }

// takes in the result from a db query, and formats it so it displays as a table
// function addToTable(res) {
//   // loops through each index in res. res may only have 1 index depending on what search invokes it.
//   for (var i = 0; i < res.length; i++) {
//     table.push([res[i].ID, res[i].Name, "$" + res[i].Price, res[i].Quantity]);
//   }

//   // displays the table
//   return console.log(table.toString());
// }

// executes the app
mainPrompt();

module.exports = mainPrompt;
