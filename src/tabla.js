import React, { useState } from 'react';
import "../src/estilos/estilo_tabla.css";

export default function Tabla({ datos, isEditable, updateDatosFiltrados }) {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedRow, setEditedRow] = useState({});

    const handleEdit = (index, dato) => {
        setEditingIndex(index);
        setEditedRow(dato);
    };

    const handleSave = (index) => {
        const updatedDatos = [...datos];
        updatedDatos[index] = editedRow;
        updateDatosFiltrados(updatedDatos); // Actualiza datos y datosFiltrados
        setEditingIndex(null);
    };

    const handleDelete = (index) => {
        const updatedDatos = datos.filter((_, i) => i !== index);
        updateDatosFiltrados(updatedDatos); // Actualiza datos y datosFiltrados
    };

    const handleChange = (e, field) => {
        setEditedRow({ ...editedRow, [field]: e.target.value });
    };

    return (
        <div className="tabla-container">
            <table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Número de Serie</th>
                        <th>Fecha de Adquisición</th>
                        <th>Especificaciones</th>
                        <th>Fecha de Mantenimiento</th>
                        <th>Descripción del Mantenimiento</th>
                        <th>Estado</th>
                        <th>Lugar</th>
                        <th>Responsable a Cargo</th>
                        {isEditable && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato, index) => (
                        <tr key={index}>
                            {editingIndex === index ? (
                                <>
                                    <td><input type="text" value={editedRow.marca} onChange={(e) => handleChange(e, 'marca')} /></td>
                                    <td><input type="text" value={editedRow.serie} onChange={(e) => handleChange(e, 'serie')} /></td>
                                    <td><input type="date" value={editedRow.adquisicion} onChange={(e) => handleChange(e, 'adquisicion')} /></td>
                                    <td><input type="text" value={editedRow.descripcion} onChange={(e) => handleChange(e, 'descripcion')} /></td>
                                    <td><input type="date" value={editedRow.mantenimiento} onChange={(e) => handleChange(e, 'mantenimiento')} /></td>
                                    <td><input type="text" value={editedRow.descripcionMantenimiento} onChange={(e) => handleChange(e, 'descripcionMantenimiento')} /></td>
                                    <td>
                                        <select value={editedRow.estado} onChange={(e) => handleChange(e, 'estado')}>
                                            <option value="EN USO">EN USO</option>
                                            <option value="DAÑADO">DAÑADO</option>
                                            <option value="EN MANTENIMIENTO">EN MANTENIMIENTO</option>
                                        </select>
                                    </td>
                                    <td><input type="text" value={editedRow.lugar} onChange={(e) => handleChange(e, 'lugar')} /></td>
                                    <td><input type="text" value={editedRow.responsable} onChange={(e) => handleChange(e, 'responsable')} /></td>
                                </>
                            ) : (
                                <>
                                    <td data-label="Marca">{dato.marca}</td>
                                    <td data-label="Número de Serie">{dato.serie}</td>
                                    <td data-label="Fecha de Adquisición">{dato.adquisicion}</td>
                                    <td data-label="Especificaciones">{dato.descripcion}</td>
                                    <td data-label="Fecha de Mantenimiento">{dato.mantenimiento}</td>
                                    <td data-label="Descripción del Mantenimiento">{dato.descripcionMantenimiento}</td>
                                    <td data-label="Estado">{dato.estado || "No especificado"}</td>
                                    <td data-label="Lugar">{dato.lugar || "No especificado"}</td>
                                    <td data-label="Responsable a Cargo">{dato.responsable || "No especificado"}</td>

                                </>
                            )}
                            {isEditable && (
                                <td>
                                    {editingIndex === index ? (
                                        <>
                                            <button className='guardar' onClick={() => handleSave(index)}>Guardar</button>
                                            <button className='cancelar' onClick={() => setEditingIndex(null)}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='editar' onClick={() => handleEdit(index, dato)}>Editar</button>
                                            <button className='eliminar' onClick={() => handleDelete(index)}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



