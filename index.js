// Import necessary dependencies
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

// Create a MySQL connection
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Initialize Express app
const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Create a new superheroes post
app.post('/superheroes', async (req, res) => {
    const { name, power } = req.body;
    const [result] = await connection.query(
        `INSERT INTO superheroes(name, power) VALUES (?, ?);`,
        [name, power]
    );
    res.json({ status: 'success', id: result.insertId });
});

// Sort superheroes
app.get('/superheroes', async (req, res) => {
    const sort = req.query.sort || 'id';
    const sortOrder = req.query.sortOrder || 'DESC';
    const [result] = await connection.query(
        `SELECT * FROM superheroes ORDER BY ${sort} ${sortOrder}`
    );
    res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log('Server started on port: ', port);
});