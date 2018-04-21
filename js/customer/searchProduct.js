var updateQuantity = require("./updateQuantity");
var connection = require("../connection");

// Searches the db based on the product ID the user entered
function searchProduct(val) {
  var query =
    "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?;";

  // executes the above query. Second parameter replaces the '?' in the query.
  connection.query(query, { item_id: val.id }, function(err, res) {
    if (err) throw err;

    if (val.quantity > res[0].stock_quantity) {
      console.log("Not enough in stock");
      return connection.end();
    }

    // allows the purchase to go through if there is enough in stock
    updateQuantity(val, res);
  });
}

module.exports = searchProduct;
