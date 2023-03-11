import React, { useEffect, useState } from "react";

export const ImprontasTomaTabla = ({id_motonave, nombre_motonave}) => {
  const [tomados, settomados] = useState(0)
  const [cantidad, setcantidad] = useState(0)
  useEffect(() => {
    settomados(localStorage.getItem("tomado"))
    setcantidad(localStorage.getItem("cantidad"))
  }, [])
  return (
    <div className="row col-12 col-sm-12 m-2 alert alert-warning">
     <a class="btn btn-warning" href={`Procesos?ruta=CrearTomaImprontas&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} >Toma de Improntas</a>
     <div className="row text-center">
        <div className="col"> <h5>Tomados</h5> </div>
        <div className="col"> <h5>Restantes</h5>  </div>
      </div>
      <div className="row text-center">
        <div className="col"> <h6>{tomados}</h6> </div>
        <div className="col"><h6>{cantidad - tomados}</h6></div>
      </div>
     
    </div>
  );
}
