import React, { useEffect, useState } from "react";

export const DespachosTabla = ({id_motonave, nombre_motonave}) => {
  const [despachados, setdespachados] = useState(0)
  const [cantidad, setcantidad] = useState(0)
  useEffect(() => {
    setdespachados(localStorage.getItem("despachado"))
    setcantidad(localStorage.getItem("cantidad"))
  }, [])
  return (
    <div className="row col-12 col-sm-12 m-2 alert alert-info">
       <a class="btn btn-info" href={`Despachos?ruta=General&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} >Despachos</a>
       <div className="row text-center">
        <div className="col"> <h5>Despachados</h5> </div>
        <div className="col"> <h5>Restantes</h5>  </div>
      </div>
      <div className="row text-center">
        <div className="col"> <h6>{despachados}</h6> </div>
        <div className="col"><h6>{cantidad - despachados}</h6></div>
      </div>
     
    </div>
  );
}
