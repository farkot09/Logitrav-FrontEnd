import React from "react";

export const CrearBls = ({id_motonave}) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-6">
        <form className="mb-2">
          <label>Agregar Bls para: MOTONAVE </label>
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
        <h3>0 de 2 Bls Ingresados</h3>
        <h3>0 de 50 Vehiculos Anunciados</h3>
      </div>
    </div>
  );
};
