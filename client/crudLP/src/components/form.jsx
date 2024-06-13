import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const mostrarAlerta = () => {
  Swal.fire({
    title: "¡Cliente Guardado!",
    text: "¡Un auto mas fundido!",
    icon: "success",
    background: '#1f2937', // Cambia el color de fondo
    confirmButtonColor: '#3085d6', // Cambia el color del botón de confirmación
    cancelButtonColor: '#d33', // Cambia el color del botón de cancelación (si lo usas)
    color: '#fff', // Cambia el color del texto
  });
}

function Form() {
  const [nombre, setNombre] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [costo, setCosto] = useState(0);
  const [beneficio, setBeneficio] = useState(0);
  const [total, setTotal] = useState(0);

  // Calcular costo y beneficios desde precio
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

  // Registra clientes
  const add = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3006/create", {
      nombre: nombre,
      vehiculo: vehiculo,
      precio: parseInt(precio),
      costo: parseInt(costo),
      beneficio: parseInt(beneficio),
    }).then(() => {
      mostrarAlerta();
      // Restablece los campos
      setNombre("");
      setVehiculo("");
      setPrecio(0);
      setCosto(0);
      setBeneficio(0);
      setTotal(0);
    });
  };

  return (
    <div className='flex justify-center items-center min-h-screen font-lora bg-gray-800'>
      <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={add}>
        <ul className='space-y-6'>
          <li>
            <label className='block text-gray-300'>
              Nombre
              <input
                required
                onChange={(event) => setNombre(event.target.value)}
                value={nombre}
                type='text'
                name='nombre'
                className='mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white'
              />
            </label>
          </li>
          <li>
            <label className='block text-gray-300'>
              Vehículo
              <input
                required
                onChange={(event) => setVehiculo(event.target.value)}
                value={vehiculo}
                type='text'
                name='vehiculo'
                className='mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white'
              />
            </label>
          </li>
          <li>
            <label className='block text-gray-300'>
              Precio
              <input
                required
                onChange={(event) => setPrecio(parseInt(event.target.value))}
                value={precio}
                type='number'
                name='precio'
                className='mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white'
              />
            </label>
          </li>
          <li>
            <label className='block text-gray-300'>
              Costo
              <input
                value={costo}
                readOnly
                type='number'
                name='costo'
                className='mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white'
              />
            </label>
          </li>
          <li>
            <label className='block text-gray-300'>
              Beneficio
              <input
                value={beneficio}
                readOnly
                type='number'
                name='beneficio'
                className='mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white'
              />
            </label>
          </li>
          <li>
            <label className='block text-gray-300'>
              Total
              <input
                onChange={(event) => setTotal(parseInt(event.target.value))}
                value={total}
                type='number'
                name='total'
                className='mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white'
              />
            </label>
          </li>
        </ul>
        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-jonquil text-white font-lora py-2 px-4 rounded mt-6'
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Form;
