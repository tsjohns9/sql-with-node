DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) DEFAULT NULL,
    department_name VARCHAR(100) DEFAULT NULL,
    price DECIMAL(10,2) DEFAULT NULL,
    stock_quantity INT DEFAULT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Laptop', 'electronics', 800.00, 5),
       ('Keyboard', 'electronics', 100.00, 8),
       ('A book', 'books', 12.00, 462),
       ('Some food', 'groceries', 26.32, 1547),
       ('Socks', 'clothing', 14.00, 91),
       ('Shirts', 'clothing', 22.50, 231),
       ('A lizard', 'animals', 6.02, 1),
       ('A cat', 'animals', 1.00, 2),
       ('Guitar', 'music', 300.00, 46),
       ('Cool video game', 'gaming', 59.990, 753);
       
SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id=1;
