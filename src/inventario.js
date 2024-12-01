import React, { useEffect, useState } from 'react';
import "../src/estilos/estilo_inv.css";
import Tabla from './tabla';
import { jsPDF } from "jspdf"; // Importa jsPDF

export function Inventario() {
    const [criterio, setCriterio] = useState("marca");
    const [valorBusqueda, setValorBusqueda] = useState("");
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const [datos, setDatos] = useState([]);
    const [isModificarEnabled, setIsModificarEnabled] = useState(false);
    const [totales, setTotales] = useState({ enUso: 0, danado: 0, enMantenimiento: 0 });

    useEffect(() => {
        const cargarDatos = async () => {
            let datosFusionados = [];
    
            // Cargar datos del archivo JSON
            try {
                const responseJson = await fetch("/datos.json");
                if (responseJson.ok) {
                    const datosJson = await responseJson.json();
                    datosFusionados = [...datosJson];
                }
            } catch (error) {
                console.warn("Error al cargar datos JSON:", error);
            }
    
            // Cargar datos del archivo XML
            try {
                const responseXml = await fetch("/Datos.xml");
                if (responseXml.ok) {
                    const xmlText = await responseXml.text();
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                    const equipos = xmlDoc.getElementsByTagName('equipo');
                    const datosXml = Array.from(equipos).map((equipo) => ({
                        marca: equipo.getElementsByTagName('marca')[0]?.textContent,
                        serie: equipo.getElementsByTagName('serie')[0]?.textContent,
                        adquisicion: equipo.getElementsByTagName('adquisicion')[0]?.textContent,
                        descripcion: equipo.getElementsByTagName('descripcion')[0]?.textContent,
                        mantenimiento: equipo.getElementsByTagName('mantenimiento')[0]?.textContent,
                        descripcionMantenimiento: equipo.getElementsByTagName('descripcionMantenimiento')[0]?.textContent,
                        estado: equipo.getElementsByTagName('estado')[0]?.textContent,
                        lugar: equipo.getElementsByTagName('lugar')[0]?.textContent,
                        responsable: equipo.getElementsByTagName('responsable')[0]?.textContent,
                    }));
                    datosFusionados = [...datosFusionados, ...datosXml];
                }
            } catch (error) {
                console.warn("Error al cargar datos XML:", error);
            }
    
            // Cargar datos del formulario almacenados en localStorage
            const registroLocal = JSON.parse(localStorage.getItem("inventario")) || [];
            datosFusionados = [...datosFusionados, ...registroLocal];
    
            // Actualizar los estados
            setDatos(datosFusionados);
            setDatosFiltrados(datosFusionados);
            calcularTotales(datosFusionados);
        };
    
        cargarDatos();
    }, []);

    const handleBusqueda = () => {
        const resultados = datos.filter(dato => {
            if (criterio && valorBusqueda) {
                return dato[criterio]?.toLowerCase().includes(valorBusqueda.toLowerCase());
            }
            return true;
        });
        setDatosFiltrados(resultados);
    };

    const handleSwitchToggle = () => {
        setIsModificarEnabled(!isModificarEnabled);
    };

    const updateDatosFiltrados = (newDatos) => {
        setDatos(newDatos);
        setDatosFiltrados(newDatos);
        calcularTotales(newDatos);
        localStorage.setItem("inventario", JSON.stringify(newDatos)); // Guardar cambios en el almacenamiento local
    };

    const calcularTotales = (datos) => {
        const enUso = datos.filter(dato => dato.estado === "EN USO").length;
        const danado = datos.filter(dato => dato.estado === "DAÑADO").length;
        const enMantenimiento = datos.filter(dato => dato.estado === "EN MANTENIMIENTO").length;
        setTotales({ enUso, danado, enMantenimiento });
    };

    // Función para generar el PDF con los totales
    const generarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Reporte de Totales de Inventario', 20, 20);
        
        // Agregar un espacio entre el título y los detalles
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);
        doc.text('------------------------------------------------------------', 20, 35);
        // Agregar los totales con un formato más ordenado
        doc.text('Resumen del Inventario:', 20, 45);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total de Equipos: ${datos.length}`, 20, 55);
        doc.text(`Total de Equipos en Uso: ${totales.enUso}`, 20, 65);
        doc.text(`Total de Equipos en Mal Estado: ${totales.danado}`, 20, 75);
        doc.text(`Total de Equipos en Mantenimiento: ${totales.enMantenimiento}`, 20, 85);

         // Agregar el pie de página debajo de los totales
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Generado automáticamente desde el sistema de gestión de inventario de equipos informaticos.', 20, 105);
        
        doc.save('reporte_totales.pdf');
    };

    return (
        <header className="header_inv">
            <div className="container_inv">
                <h1 className="header_title">Información:</h1>
                <div className="totales_container">
                    <p className="texto1_inv">Total de equipos: {datos.length}</p>
                    <p className="texto1_inv">Total de Equipos en Uso: {totales.enUso}</p>
                    <p className="texto1_inv">Total de Equipos en Mal Estado: {totales.danado}</p>
                    <p className="texto1_inv">Total de Equipos en Mantenimiento: {totales.enMantenimiento}</p>
                </div>
                <button className="download_button" onClick={generarPDF}>Generar Reporte PDF</button>
            </div>
            <div className="container_tab">
                <div className="container_input">
                    <label className="search_label">Búsqueda Avanzada</label>
                    <select className="search_select" onChange={(e) => setCriterio(e.target.value)} value={criterio}>
                        <option value="marca">Buscar por Marca</option>
                        <option value="serie">Buscar por Número de Serie</option>
                        <option value="estado">Buscar por Estado</option>
                        <option value="lugar">Buscar por Lugar</option>
                        <option value="responsable">Buscar por Responsable</option>
                    </select>
                    <input
                        type="text"
                        className="search_input"
                        placeholder="Valor a buscar"
                        onChange={(e) => setValorBusqueda(e.target.value)}
                        value={valorBusqueda}
                    />
                    <button className="search_button" onClick={handleBusqueda}>Buscar</button>
                    <label className="search_label">Modificar :</label>
                    <div className="switch-container">
                        <input
                            type="checkbox"
                            id="modifySwitch"
                            checked={isModificarEnabled}
                            onChange={handleSwitchToggle}
                        />
                        <label className="slider" htmlFor="modifySwitch"></label>
                    </div>
                </div>
                <div>
                    <Tabla datos={datosFiltrados} isEditable={isModificarEnabled} updateDatosFiltrados={updateDatosFiltrados} />
                </div>
            </div>
        </header>
    );
}

export default Inventario;








