// src/Opciones.js 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../src/estilos/estilo_op.css';

export function Opciones() {
    const navigate = useNavigate();
    const [mostrarMiniventana, setMostrarMiniventana] = useState(false);

    const handleClick = () => navigate('/inventario');
    const handleClick1 = () => navigate('/registro');

    return (
        <div className="container">
            <main>
                <h1 className='texto1'>Bienvenido</h1>
                <p className="texto2">Seleccione una opción para comenzar a gestionar el inventario.</p>
                <div className="botonContainer">
                    <button className="boton" onClick={handleClick}>Ver Inventario</button>
                    <button className="boton" onClick={handleClick1}>Añadir Equipos</button>
                </div>
            </main>
             
        </div>
    );
}


