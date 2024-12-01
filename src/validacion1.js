// validaciones.js
export function validarCampos(campos) {
    const errores = {};
  
    campos.forEach(({ nombre, valor }) => {
      if (!valor.trim()) {
        errores[nombre] = "Este campo no puede estar vacío";
      }
    });
  
    return errores;
  }
  