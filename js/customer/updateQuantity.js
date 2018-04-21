var connection = require("../connection");
var getSales = require("./getSales");

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
      var sale = item[0].price * requested.quantity;
      console.log(
        `You bought ${requested.quantity} ${
          item[0].product_name
        } Your total cost is $${sale}`
      );

      // gets the total sales for the purchased product
      getSales(requested.id, sale);
    }
  );
}

module.exports = updateQuantity;
