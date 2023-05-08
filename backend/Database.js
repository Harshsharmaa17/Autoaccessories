var mysqlobj = require('mysql');
let conn;
    conn = mysqlobj.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'information'
    })
    conn.connect(function(err) {
        if(err)
        throw err;
        else 
        console.log("database connected")
    })
    conn.query(`USE information`);

conn.query(`
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(100) NOT NULL, 
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL UNIQUE,
  mobile BIGINT UNSIGNED,
  password VARCHAR(100) NOT NULL,
  dob DATE,
  dor TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  gender ENUM('MALE', 'FEMALE', 'OTHER'),
  city_id INT,
  verified ENUM('TRUE', 'FALSE') DEFAULT 'TRUE',
  soft_delete TINYINT(1) DEFAULT 0
);
`);
    module.exports=conn;
    