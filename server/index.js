const express = require('express');
const mysql = require("mysql");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerce"
});

app.get("/api/products", (req, res) => {
    const searchTerm = req.query.search;

    const sql = "SELECT * FROM products WHERE name LIKE ?";

    db.query(
        sql,
        [`%${searchTerm}%`],
        (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(result);
    })
});

app.post("/submit-form", (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const subject = req.body.subject;

    const sql = "INSERT INTO contact(firstName, lastName, email, subject) " +
        "VALUES(?, ?, ?, ?)";

    db.query(
        sql,
        [firstName, lastName, email, subject],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            console.log("saved contact submission");
            res.send();
        }
    );
});

app.post("/api/ecommerce/cart", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const image_url = req.body.image_url;
    const description = req.body.description;
    const price = req.body.price;

    const sql = "INSERT INTO cart(id, name, image_url, description, price) VALUES(?,?,?,?,?)";

    db.query(
        sql,
        [id, name, image_url, description, price],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(result);
        }
    )
});

app.get("/api/ecommerce/cart", (req, res) => {
    const sql = "SELECT * FROM cart";

    db.query(
        sql,
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(result);
        }
    )
});

app.delete("/api/ecommerce/cart/:id", (req, res) => {
    const productId = req.params.id;

    const sql = `DELETE FROM cart WHERE id = ?`;

    db.query(
        sql,
        [productId],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(result);
        }
    );
})

app.listen(3001);