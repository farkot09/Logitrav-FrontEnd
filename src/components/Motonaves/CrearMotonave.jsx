import React from 'react'

export const CrearMotonave = () => {
  return (
    <form className="mb-2">     
         <label>Anunciar Motonave</label>
          <div className="mb-3">
            <label for="nombre_motonave" className="form-label">
                Nombre Motonave:
            </label>
            
            <input type="text" className="form-control inputs-general" id="nombre_motonave" required />
          </div>
          <div className="mb-3">
            <label for="cantidad" className="form-label">
                Cantidad:
            </label>
            <input type="number" className="form-control inputs-general" id="cantidad" required />
          </div>
          <div className="mb-3">
            <label for="cantidad_bls" className="form-label">
                Cantidad Bls:
            </label>
            <input type="number" className="form-control inputs-general" id="cantidad_bls" required />
          </div>
          <div className="mb-3">
            <label for="31 de enero de 2023" className="form-label">
                ETA
            </label>
            <input type="text" className="form-control inputs-general" id="31 de enero de 2023" required />
          </div>
          
          <button type="submit" className="boton-login">Crear</button>
        </form>
  )
}
