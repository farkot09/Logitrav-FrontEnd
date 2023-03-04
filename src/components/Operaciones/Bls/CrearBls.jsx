import React, { useState } from "react";
import dataBL from "../../../data/bls.json"
import dataMotonave from "../../../data/motonaves.json"

export const CrearBls = ({id_motonave}) => {
  const [BlsData, setBlsData] = useState(dataBL.data)
  const [MotonaveData, setMotonaveData] = useState(dataMotonave.data)
  const totalBls = MotonaveData.filter(item => item._id === id_motonave)
  const totalBlsCreados = BlsData.filter(item => item.id_motonave === id_motonave)
  let totalCantidadEnBls = 0
  let displayForm =""

  for (let index = 0; index < totalBlsCreados.length; index++) {
    totalCantidadEnBls += totalBlsCreados[index].cantidad
    
  }

  if ((totalBlsCreados.length === totalBls[0].cantidad_bls) && (totalCantidadEnBls === totalBls[0].cantidad)) {
    displayForm = "d-none"
  }
  
  return (
    <div className="row">
      <div className="col-12 col-sm-6">
          <label>Agregar Bls para: <h2>{totalBls[0].nombre_motonave}</h2> </label>
          <form className={`mb-2 ${displayForm}`}>
          <input type="text" className="form-control input-sm inputs-general" value={id_motonave} disabled />
          <input type="text" className="form-control input-sm inputs-general" placeholder="Numero Bl" />
          <input type="number" className="form-control input-sm inputs-general" placeholder="Cantidad" />
          <input type="text" className="form-control input-sm inputs-general" placeholder="Marca" />
          <input type="text" className="form-control input-sm inputs-general" placeholder="Transporte" value="LOGIVECO" />
          <input type="radio" className="form-check-input" name="condicion" checked /><label>Nacionalizado</label>
          <input type="radio" className="form-check-input" name="condicion" /><label>DTA</label>
          <input type="submit" className="form-control input-sm " />
        </form>
      </div>
      <div className="col-12 col-sm-6">        
        <h3>{totalBlsCreados.length} de {totalBls[0].cantidad_bls} Bls Ingresados</h3>
        <h3>{totalCantidadEnBls} de {totalBls[0].cantidad} Vehiculos Anunciados</h3>
      </div>
    </div>
  );
};
