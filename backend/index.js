const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
  });
  

// Get all colleges
app.get("/api/colleges", (req, res) => {
  pool.query("Select * from Colleges", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

// Get all departments of a college
app.get("/api/colleges/:collegeId/departments", (req, res) => {
  const { collegeId } = req.params;
  pool.query("SELECT * FROM Departments WHERE CollegeID = ?", [collegeId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

// Add a new college
app.post("/api/colleges", (req, res) => {
  const { Name, Address, ContactNos } = req.body;
  pool.query(
    "INSERT INTO Colleges (Name, Address, ContactNos) VALUES (?, ?, ?)",
    [Name, Address, ContactNos],
    (err, result) => {
      if (err) {
        console.error("Error adding college:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "College added successfully" });
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));