import React, { useState } from 'react';
import logo from '../images/lpLogo.png';

function Nav({ onShowForm, onShowClientes }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-flame border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={logo} className="h-8 flex items-center space-x-3 rtl:space-x-reverse" alt="LPperformance logo" />
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-flame focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Abrir menú</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-lora flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-raisenblack md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="#" onClick={onShowForm} className="block py-2 px-3 text-white bg-jonquil rounded md:bg-transparent md:hover:text-jonquil md:p-0" aria-current="page">Cargar</a>
            </li>
            <li>
              <a href="#" onClick={onShowClientes} className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-jonquil md:p-0">Ver</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
