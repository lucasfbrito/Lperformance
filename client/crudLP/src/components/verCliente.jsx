import React, { useState, useEffect } from 'react';
import Axios from 'axios';
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3002"
function VerCliente() {
  const [clienteList, setClienteList] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState();
  const [nombre, setNombre] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [beneficio, setBeneficio] = useState(0);
  const [total, setTotal] = useState(0);
  const [costo, setCosto] = useState();

  const eliminarCliente = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`)
      .then(() => {
        fetchData(); // Actualiza la lista después de eliminar
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };
  
  useEffect(() => {
    const costoCalculado = Math.round(precio * 0.55);
    const beneficioCalculado = Math.round(precio * 0.45);
    setCosto(costoCalculado);
    setBeneficio(beneficioCalculado);
    setTotal(costoCalculado + beneficioCalculado);
  }, [precio]);

  useEffect(() => {
    const nuevoBeneficio = total - costo;
    setBeneficio(nuevoBeneficio);
  }, [total]);

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get("http://localhost:3002/cliente")
      .then((response) => {
        setClienteList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };

  const editarCliente = (val) => {
    setEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setVehiculo(val.Vehiculo);
    setPrecio(val.precio);
    setBeneficio(val.beneficio);
    setTotal(val.total);
  };

  const cancelarEdicion = () => {
    setEditar(false);
  };

  const update = () => {
    Axios.put(`http://localhost:3002/update/${id}`, {
      id: id,
      nombre: nombre,
      vehiculo: vehiculo,
      precio: parseInt(precio),
      beneficio: parseInt(beneficio),
      total: parseInt(total),
    })
      .then(() => {
        setEditar(false); // Cambia el estado de edición a falso
        fetchData(); // Vuelve a cargar los datos actualizados
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="overflow-x-auto">
          {editar ? (
            <form className="w-full max-w-screen-lg sm:w-96 bg-gray-800 p-4 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-2xl mb-4">Editar Cliente</h2>
              <div className="space-y-4">
                <label className="block">
                  Nombre
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <label className="block">
                  Vehículo
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                    value={vehiculo}
                    onChange={(e) => setVehiculo(e.target.value)}
                  />
                </label>
                <label className="block">
                  Precio
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                    value={parseInt(precio)}
                    onChange={(e) => setPrecio(parseInt(e.target.value))}
                  />
                </label>
                <label className="block">
                  Costo
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                    value={parseInt(costo.toFixed())} 
                    readOnly
                  />
                </label>
                <label className="block">
                  Beneficio
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                    value={beneficio}
                    onChange={(e) => setBeneficio(parseInt(e.target.value))}
                  />
                </label>
                <label className="block">
                  Total
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                    value={(costo + beneficio).toFixed()}
                    
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-400 text-white font-lora py-2 px-4 rounded mr-2"
                    onClick={cancelarEdicion}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-400 text-white font-lora py-2 px-4 rounded"
                    onClick={update}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <table className="min-w-full bg-gray-800 text-white">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Nombre</th>
                  <th className="px-4 py-2 border">Vehículo</th>
                  <th className="px-4 py-2 border">Precio</th>
                  <th className="px-4 py-2 border">Costo</th>
                  <th className="px-4 py-2 border">Beneficio</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Fecha</th>
                  <th className="px-4 py-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clienteList.map((val, index) => (
                  <tr key={val.id} className="text-white">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{val.nombre}</td>
                    <td className="border px-4 py-2">{val.Vehiculo}</td>
                    <td className="border px-4 py-2">{val.precio}</td>
                    <td className="border px-4 py-2">{val.costo}</td>
                    <td className="border px-4 py-2">{val.beneficio}</td>
                    <td className="border px-4 py-2">{val.total}</td>
                    <td className="border px-4 py-2">{formatDate(val.fecha)}</td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col sm:flex-row">
                        <button
                          className="w-full sm:max-w-xs bg-gray-900 hover:bg-green-600 text-white font-lora py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                          onClick={() => editarCliente(val)}
                        >
                          Editar
                        </button>
                        <button
                          className="w-full sm:max-w-xs bg-gray-900 hover:bg-red-600 text-white font-lora py-2 px-4 rounded"
                          onClick={() => eliminarCliente(val.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerCliente;
