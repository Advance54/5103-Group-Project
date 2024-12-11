-- add initial employee test data


INSERT INTO Employee (Title,firstlast,Company,Password,Email)
 VALUES ('Manager','Michael Tracy','Fanshawe','password','mt@abc.com');

INSERT INTO Employee (Title,firstlast,Company,Password,Email)
 VALUES ('Manager','Marcel Ramos','FanshaweC','password','marcel@ramos.com'); 

--Menu items
CREATE TABLE MenuItem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL
);
INSERT INTO MenuItem (name, price) VALUES ('Burger', 10.99);
INSERT INTO MenuItem (name, price) VALUES ('Pizza', 12.99);
INSERT INTO MenuItem (name, price) VALUES ('Pasta', 8.99); 