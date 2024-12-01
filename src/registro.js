import React, { useState, useEffect } from 'react';
import "../src/estilos/estilo_form.css";
import { validarCampos } from './validacion1';

export function Registro() {
  const [errores, setErrores] = useState({});
  const [marca, setMarca] = useState("");
  const [serie, setSerie] = useState("");
  const [adquisicion, setAdquisicion] = useState("");
  const [mantenimiento, setMantenimiento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descripcionMantenimiento, setDescripcionMantenimiento] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [inventario, setInventario] = useState([]);

  // Cargar inventario desde localStorage al montar el componente
  useEffect(() => {
    const inventarioGuardado = JSON.parse(localStorage.getItem('inventario')) || [];
    setInventario(inventarioGuardado);
  }, []);

  // Guardar inventario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('inventario', JSON.stringify(inventario));
  }, [inventario]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const erroresEncontrados = validarCampos([
      { nombre: "marca", valor: marca },
      { nombre: "serie", valor: serie },
      { nombre: "adquisicion", valor: adquisicion },
      { nombre: "mantenimiento", valor: mantenimiento },
      { nombre: "descripcion", valor: descripcion },
      { nombre: "descripcionMantenimiento", valor: descripcionMantenimiento }
    ]);

    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length === 0) {
      const datosFormulario = {
        marca,
        serie,
        adquisicion,
        mantenimiento,
        descripcion,
        descripcionMantenimiento
      };

      // Agregar el nuevo registro al inventario
      setInventario([...inventario, datosFormulario]);

      // Limpiar el formulario y mostrar el modal de confirmación
      setMarca("");
      setSerie("");
      setAdquisicion("");
      setMantenimiento("");
      setDescripcion("");
      setDescripcionMantenimiento("");
      setModalVisible(true);
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1 className='texto_registro'>Registro de Equipos</h1>
        <div className="inputContainer">
          {/* Campos del formulario */}
          <div className="inputGroup">
            <label className="label">Marca:</label>
            <input 
              type="text" 
              className="input" 
              value={marca}
              onChange={(e) => setMarca(e.target.value)} 
            />
            {errores.marca && <span className="error">{errores.marca}</span>}
            
            <label className="label">Fecha de Adquisición:</label>
            <input 
              type="date" 
              className="input" 
              value={adquisicion}
              onChange={(e) => setAdquisicion(e.target.value)} 
            />
            {errores.adquisicion && <span className="error">{errores.adquisicion}</span>}
            
            <label className="label">Descripcion del equipo:</label>
            <textarea 
              className="textarea" 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
            {errores.descripcion && <span className="error">{errores.descripcion}</span>}
          </div>
          <div className="inputGroup">
            <label className="label">Número de Serie:</label>
            <input 
              type="text" 
              className="input" 
              value={serie} 
              onChange={(e) => setSerie(e.target.value)} 
            />
            {errores.serie && <span className="error">{errores.serie}</span>}
            
            <label className="label">Fecha de mantenimiento:</label>
            <input 
              type="date" 
              className="input" 
              value={mantenimiento} 
              onChange={(e) => setMantenimiento(e.target.value)} 
            />
            {errores.mantenimiento && <span className="error">{errores.mantenimiento}</span>}
            
            <label className="label">Descripcion del mantenimiento:</label>
            <textarea 
              className="textarea" 
              value={descripcionMantenimiento} 
              onChange={(e) => setDescripcionMantenimiento(e.target.value)}
            ></textarea>
            {errores.descripcionMantenimiento && <span className="error">{errores.descripcionMantenimiento}</span>}
          </div>
        </div>
        <div className="buttonContainer">
          <button type="submit" className="submitButton">ENVIAR</button>
        </div>
      </form>

      {/* Modal de confirmación */}
      {modalVisible && (
        <div className="modal">
          <div className="modalContent">
            <h1 className='texto_confirmar'>¡Equipo registrado exitosamente!</h1>
            <button onClick={cerrarModal} className="okButton">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}






