var connection = require("../connection");
var updateSales = require("./updateSales");

// gets the total sales for the purchased product based on the item id.
// sale parameter is passed in to use in the updateSales function to update the total sales
function getSales(id, sale) {
  // gets the current product sales for the product based on the id
  var query = "SELECT product_sales FROM products WHERE ?;";

  connection.query(
    query,
    {
      item_id: id
    },
    function(err, res) {
      // stores the value to be set for product_sales
      var totalSales = res[0].product_sales + sale;
      if (err) throw err;
      // pass in id to locate the product, and totalSales to set the new value.
      updateSales(id, totalSales);
    }
  );
}

module.exports = getSales;
