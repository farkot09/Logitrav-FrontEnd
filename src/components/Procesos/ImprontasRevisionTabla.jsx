import React, { useEffect, useState } from "react";

export const ImprontasRevisionTabla = ({id_motonave, nombre_motonave}) => {  
    const [revisados, setrevisados] = useState(0)
    const [cantidad, setcantidad] = useState(0)
    useEffect(() => {
      setrevisados(localStorage.getItem("revisado"))
      setcantidad(localStorage.getItem("cantidad"))
    }, [])
  return (
    <div className="row col-12 col-sm-12 m-2 alert alert-danger">
      <a class="btn btn-danger" href={`Procesos?ruta=CrearRevisionImprontas&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} >Revision de Improntas</a>
      <div className="row text-center">
        <div className="col"> <h5>Revisados</h5> </div>
        <div className="col"> <h5>Restantes</h5>  </div>
      </div>
      <div className="row text-center">
        <div className="col"> <h6>{revisados}</h6> </div>
        <div className="col"><h6>{cantidad - revisados}</h6></div>
      </div>
     
    </div>
  );
}
