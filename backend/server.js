const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configure CORS
app.use(cors());

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'autoaccessories'
});

// Handle user signup requests
app.post('/api/signup', (req, res) => {
  const { username, password, email, mobile } = req.body;

  // Check if the username already exists in the database
  pool.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        res.status(500).send('An error occurred while processing your request');
      } else if (results.length > 0) {
        res.status(400).send('Username already exists');
      } else {
        // Insert the new user into the database
        pool.query(
          'INSERT INTO users (username, password,email,mobile) VALUES (?, ?)',
          [username, password, email,mobile],
          (err) => {
            if (err) {
              res.status(500).send('An error occurred while processing your request');
            } else {
              res.send('Signup successful');
            }
          }
        );
      }
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
