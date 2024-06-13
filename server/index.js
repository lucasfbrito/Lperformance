const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, PORT } = require("./config");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post("/create", (req, res) => {
    const { nombre, vehiculo, precio } = req.body;

    // Calcula el costo y beneficio basado en el precio
    const costo = precio * 0.55;
    const beneficio = precio * 0.45;
    const total = costo + beneficio; // Calcula el total

    db.query('INSERT INTO clientes (nombre, vehiculo, precio, costo, beneficio, total) VALUES (?, ?, ?, ?, ?, ?)', 
        [nombre, vehiculo, precio, costo, beneficio, total],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Ocurrió un error al cargar el cliente');
            } else {
                res.send("Cliente cargado con éxito");
            }
        }
    );
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, vehiculo, precio } = req.body;

    // Calcula el costo y beneficio basado en el precio
    const costo = precio * 0.55;
    const beneficio = precio * 0.45;
    const total = costo + beneficio; // Calcula el total

    db.query('UPDATE clientes SET nombre=?, vehiculo=?, precio=?, costo=?, beneficio=?, total=? WHERE id=?',
        [nombre, vehiculo, precio, costo, beneficio, total, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Ocurrió un error al actualizar el cliente');
            } else {
                res.send("Cliente actualizado con éxito");
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM clientes WHERE id=?',
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Ocurrió un error al eliminar el cliente');
            } else {
                res.send("Cliente eliminado con éxito");
            }
        }
    );
});

app.get("/cliente", (req, res) => {
    db.query('SELECT * FROM clientes',
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Ocurrió un error al obtener los clientes');
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log("Corriendo en el puerto 3006");
});
