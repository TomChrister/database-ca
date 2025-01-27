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

// Get superheroes with roles
app.get('/superheroes', async (req, res) => {
    const [rows] = await connection.query(`
        SELECT superheroes.name, superheroes.power, roles.role_type
        FROM superheroes
        JOIN roles ON superheroes.role_id = roles.id;
    `);
    res.json(rows);
});

// Create a new superheroes post
app.post('/superheroes', async (req, res) => {
    const { name, power, role_type } = req.body;
    const [result] = await connection.query(
        `INSERT INTO superheroes(name, power, role_id)
        VALUES (?, ?, (SELECT id FROM roles WHERE role_type = ?));`,
        [name, power, role_type],
    );
    res.json({ status: 'success', id: result.insertId });
});

// Get a superhero by ID
app.get("/superheroes/:id", async (req, res) => {
    const { id } = req.params;
    const [result] = await connection.query("SELECT * FROM superheroes WHERE id=?", [id]);
    res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log('Server started on port: ', port);
});
