const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';
require('dotenv').config(); 
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'propertymanagement'
});

db.connect(err => {
    if(err){
        throw err;
    } 
    else{
        console.log('Connected to MySQL Database!');
     }
    
});

app.get('/', (req, res) => {
    res.send('Backend is running!');
  });
  

app.post('/register', (req, res) => {
    const { Username, email, password } = req.body;
    db.query(
        'INSERT INTO userinfo (Username, email, password) VALUES (?, ?, ?)',
        [Username, email, password],
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Registration failed' });
            }
            res.send({ message: 'User registered successfully!' });
        }
    );
});




app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM userinfo WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Simple JWT creation
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token valid for 1 hour
      );

      res.json({
        message: 'Login successful',
        username: user.username,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});








app.get("/properties", (req, res) => {
  const query = "SELECT * FROM propertyinfo";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching properties", err);
      res.status(500).json({ message: "Error fetching properties" });
    } else {
      res.json(results);
    }
  });
});

// Add a new property
app.post("/properties", (req, res) => {
  const { PropertyName, PImage, Location, PropertyType, DateOfPurchase } = req.body;
  const query = "INSERT INTO propertyinfo (PropertyName, PImage, Location, PropertyType, DateOfPurchase) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [PropertyName, PImage, Location, PropertyType, DateOfPurchase], (err, results) => {
    if (err) {
      console.error("Error adding property", err);
      res.status(500).json({ message: "Error adding property" });
    } else {
      res.json({ message: "Property added successfully" });
    }
  });
});

// Delete a property
app.delete("/properties/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM propertyinfo WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting property", err);
      res.status(500).json({ message: "Error deleting property" });
    } else {
      res.json({ message: "Property deleted successfully" });
    }
  });
});

// Edit property (can be extended with more fields)
app.put("/properties/:id", (req, res) => {
  const { id } = req.params;
  const { PropertyName, PImage, Location, PropertyType, DateOfPurchase } = req.body;
  const query = "UPDATE propertyinfo SET PropertyName = ?, PImage = ?, Location = ?, PropertyType = ?, DateOfPurchase = ? WHERE id = ?";
  db.query(query, [PropertyName, PImage, Location, PropertyType, DateOfPurchase, id], (err, results) => {
    if (err) {
      console.error("Error updating property", err);
      res.status(500).json({ message: "Error updating property" });
    } else {
      res.json({ message: "Property updated successfully" });
    }
  });
});




app.put('/properties/:id', (req, res) => {
  const { id } = req.params;
  const { PropertyName, PImage, Location, PropertyType, DateOfPurchase } = req.body;

  const query = `
    UPDATE propertyinfo
    SET PropertyName = ?, PImage = ?, Location = ?, PropertyType = ?, DateOfPurchase = ?
    WHERE id = ?
  `;
  
  db.query(query, [PropertyName, PImage, Location, PropertyType, DateOfPurchase, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating property" });
    }
    res.status(200).json({ message: "Property updated successfully" });
  });
});





app.get('/services', (req, res) => {
  const sql = `
    SELECT services.id, services.ServiceType, services.DateOfService, services.CostOfService, services.PropertyId, properties.PropertyName 
    FROM services
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching services');
    } else {
      res.json(results);
    }
  });
});

app.post('/services', (req, res) => {
  const { ServiceType, DateOfService, CostOfService, PropertyId } = req.body;
  const sql = 'INSERT INTO services (ServiceType, DateOfService, CostOfService, PropertyId) VALUES (?, ?, ?, ?)';
  db.query(sql, [ServiceType, DateOfService, CostOfService, PropertyId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding service');
    } else {
      res.status(201).send('Service added successfully');
    }
  });
});

app.delete('/services/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM services WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting service');
    } else {
      res.send('Service deleted successfully');
    }
  });
});




app.listen(3001, () => {
    console.log('Server running on port 3001');
});


