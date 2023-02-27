import React, { useState } from "react";
import motonavesData from "../../data/motonaves.json";


export const EditarMotonave = ({id_motonave}) => {
    const [dataMotonaves] = useState(motonavesData);
    const data = dataMotonaves.data.filter(mn => mn._id === id_motonave)    
  return (
    <form className="mb-2">     
         <label>Editar Motonave</label>
         <div className="mb-3">
            <label for="id_motonave" className="form-label">
                Id
            </label>
            
            <input value={id_motonave} type="text" className="form-control inputs-general" id="id_motonave" required disabled />
          </div>
          <div className="mb-3">
            <label for="nombre_motonave" className="form-label">
                Nombre Motonave:
            </label>
            
            <input value={data[0].nombre_motonave} type="text" className="form-control inputs-general" id="nombre_motonave" required />
          </div>
          <div className="mb-3">
            <label for="cantidad" className="form-label">
                Cantidad:
            </label>
            <input value={data[0].cantidad} type="number" className="form-control inputs-general" id="cantidad" required />
          </div>
          <div className="mb-3">
            <label for="cantidad_bls" className="form-label">
                Cantidad Bls:
            </label>
            <input value={data[0].cantidad_bls} type="number" className="form-control inputs-general" id="cantidad_bls" required />
          </div>
          <div className="mb-3">
            <label for="31 de enero de 2023" className="form-label">
                ETA
            </label>
            <input value={data[0].eta} type="text" className="form-control inputs-general" id="31 de enero de 2023" required />
          </div>
          
          <button type="submit" className="boton-login">Actualizar</button>
        </form>
  )
}
