import React, { useState } from 'react';
import Form from './components/form'; // Ajusta la ruta según tu estructura de archivos
import Nav from './components/nav';
import VerCliente from './components/verCliente'; // Asegúrate de que VerCliente esté importado correctamente

function App() {
  const [showForm, setShowForm] = useState(true); // Muestra el formulario por defecto al cargar la página

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleShowClientes = () => {
    setShowForm(false); // Cambia el estado para mostrar la lista de clientes
  };

  return (
    <div>
      <Nav onShowForm={handleShowForm} onShowClientes={handleShowClientes} />
      {showForm ? <Form /> : <VerCliente />} {/* Renderiza Form o VerCliente según el estado showForm */}
    </div>
  );
}

export default App;
