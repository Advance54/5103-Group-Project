-- -- add initial employee test data
--     private int Id;
--     private String item_name;
--     private BigDecimal amount;

--     private String Description;
--     private BigDecimal item_order_cost;
--     private BigDecimal item_cost;


INSERT INTO Item(item_name, amount, Description, item_order_cost, item_cost)
VALUES ('Chicken Breat', 15 ,'Four chicken breasts',7.5 ,14.99);
INSERT INTO Item(item_name, amount, Description, item_order_cost, item_cost)
VALUES ('Chicken Thighs', 12 ,'Four chicken Thighs',5.5 ,13.99);
INSERT INTO Item(item_name, amount, Description, item_order_cost, item_cost)
VALUES ('Tomato', 55 ,'Three medium sized tomatos',0.5 ,1.00);
INSERT INTO Item(item_name, amount, Description, item_order_cost, item_cost)
VALUES ('White bread', 54 ,'One loaf',1.5 ,2.99);
INSERT INTO Employee (Title,firstlast,Company,Password,Email)
 VALUES ('Manager','Michael Tracy','Fanshawe','','m');
 INSERT INTO Employee (Title,firstlast,Company,Password,Email)
 VALUES ('Employee','Michael Tracy2','Fanshawe','','mt');
 INSERT INTO Employee (Title,firstlast,Company,Password,Email)
 VALUES ('Employee','Michael Tracy3','Fanshawe','password3','mt3@abc.com');