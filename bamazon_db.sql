DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) DEFAULT NULL,
  department_name VARCHAR(100) DEFAULT NULL,
  price DECIMAL(10,2) DEFAULT NULL,
  stock_quantity INT DEFAULT NULL,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY(item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) DEFAULT NULL,
  over_head_costs DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, over_head_costs) VALUES
('electronics', 10000),
('books', 800),
('groceries', 4000),
('clothes', 400),
('animals', 5),
('music', 2000),
('gaming', 7000);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES 
('Laptop', 'electronics', 800.00, 5),
('Keyboard', 'electronics', 100.00, 8),
('A book', 'books', 12.00, 462),
('Some food', 'groceries', 26.32, 1547),
('Socks', 'clothing', 14.00, 91),
('Shirts', 'clothing', 22.50, 231),
('A lizard', 'animals', 6.02, 1),
('A cat', 'animals', 1.00, 2),
('Guitar', 'music', 300.00, 46),
('Cool video game', 'gaming', 59.990, 753);

SELECT * FROM departments;

SELECT departments.department_id AS 'Department ID',
products.department_name AS 'Department',
departments.over_head_costs AS 'Over Head Costs',
products.product_sales AS 'Product Sales'
FROM products INNER JOIN departments
ON (departments.department_name = products.department_name)
GROUP BY department;