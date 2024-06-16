CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    vehiculo VARCHAR(100),
    precio DECIMAL(20,6),
    costo DECIMAL(20,6),
    beneficio DECIMAL(20,6),
    total DECIMAL(20,6),
    fecha DATE DEFAULT CURRENT_DATE
);