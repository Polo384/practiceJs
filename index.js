const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*Pa61[Ch41',
    database: 'practicejs'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.send('Record added');
    });
});

app.get('/records', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/records/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        res.send('Record updated');
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Record deleted');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});