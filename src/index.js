import React from "react";
import ReactDOM from "react-dom/client"; 
import { Inicio } from "./Inicio";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Inventario } from "./inventario";
import { Opciones } from "./opciones";
import { Registro } from "./registro";





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter> {/* Cambiado a BrowserRouter */}
        <Routes>
            <Route path="/" element={<Inicio />} /> {/* Aquí se muestra la interfaz de inicio */}
            <Route path="/opciones" element={<Opciones />} /> {/* Asegúrate de que el nombre sea correcto */}
            <Route path="/inventario" element={<Inventario />} /> {/* Componente de inventario */}
            <Route path="/registro" element={<Registro />} /> {/* Componente de inventario */}
        </Routes>
    </BrowserRouter>
);
