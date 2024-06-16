const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
const config = require("./config");
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración del Pool de PostgreSQL
const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Permitir certificados autofirmados
  }
});

// Conexión inicial a la base de datos
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to database:', err.stack);
  }
  console.log('Connected to database');
  release();
});

// Rutas CRUD

// Crear un cliente
app.post("/clientes", async (req, res) => {
  const { nombre, vehiculo, precio } = req.body;

  // Validar que se reciben todos los campos necesarios
  if (!nombre || !vehiculo || !precio) {
    return res.status(400).json({ error: "Se requieren nombre, vehiculo y precio" });
  }

  try {
    // Calcula el costo y beneficio basado en el precio
    const costo = precio * 0.55;
    const beneficio = precio * 0.45;
    const total = costo + beneficio; // Calcula el total

    // Insertar nuevo cliente en la base de datos
    const query = 'INSERT INTO clientes (nombre, vehiculo, precio, costo, beneficio, total) VALUES ($1, $2, $3, $4, $5, $6)';
    const result = await pool.query(query, [nombre, vehiculo, precio, costo, beneficio, total]);

    res.status(201).send("Cliente cargado con éxito");
  } catch (error) {
    console.error('Error al cargar el cliente:', error);
    res.status(500).send('Ocurrió un error al cargar el cliente');
  }
});

// Actualizar un cliente
app.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, vehiculo, precio } = req.body;

  // Validar que se reciben todos los campos necesarios
  if (!nombre || !vehiculo || !precio) {
    return res.status(400).json({ error: "Se requieren nombre, vehiculo y precio" });
  }

  try {
    // Calcula el costo y beneficio basado en el precio
    const costo = precio * 0.55;
    const beneficio = precio * 0.45;
    const total = costo + beneficio; // Calcula el total

    // Actualizar cliente en la base de datos
    const query = 'UPDATE clientes SET nombre=$1, vehiculo=$2, precio=$3, costo=$4, beneficio=$5, total=$6 WHERE id=$7';
    const result = await pool.query(query, [nombre, vehiculo, precio, costo, beneficio, total, id]);

    res.send("Cliente actualizado con éxito");
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).send('Ocurrió un error al actualizar el cliente');
  }
});

// Eliminar un cliente
app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar cliente de la base de datos
    const query = 'DELETE FROM clientes WHERE id=$1';
    const result = await pool.query(query, [id]);

    res.send("Cliente eliminado con éxito");
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).send('Ocurrió un error al eliminar el cliente');
  }
});

// Obtener todos los clientes
app.get("/clientes", async (req, res) => {
  try {
    // Obtener todos los clientes desde la base de datos
    const query = 'SELECT * FROM clientes';
    const result = await pool.query(query);

    res.send(result.rows);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).send('Ocurrió un error al obtener los clientes');
  }
});

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
