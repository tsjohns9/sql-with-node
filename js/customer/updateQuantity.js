var connection = require("../connection");

// updates the new quantity and makes the purchase
function updateQuantity(requested, item) {
  // contains the new total after the customers purchase
  var newStock = item[0].stock_quantity - requested.quantity;

  // updates the db for the item the customer purchased, and sets the new total quantity for the item
  var query = "UPDATE products SET ? WHERE ?;";
  connection.query(
    query,
    [
      {
        stock_quantity: newStock
      },
      {
        item_id: requested.id
      }
    ],

    // displays the total cost of the purchase
    function(err, res) {
      console.log(
        `You bought ${requested.quantity} ${
          item[0].product_name
        } Your total cost is $${item[0].price * requested.quantity}`
      );
      connection.end();
    }
  );
}

module.exports = updateQuantity;
