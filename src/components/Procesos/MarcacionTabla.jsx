import React, { useEffect, useState } from "react";

export const MarcacionTabla = ({id_motonave, nombre_motonave}) => {
  const [marcados, setmarcados] = useState(0)
  const [cantidad, setcantidad] = useState(0)
  useEffect(() => {
    setmarcados(localStorage.getItem("marcados"))
    setcantidad(localStorage.getItem("cantidad"))
  }, [])
  
  return (
    <div className="row col-12 col-sm-12 m-2 alert alert-primary">
      <a class="btn btn-primary" href={`Procesos?ruta=CrearMarcacion&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} >Marcacion a Bordo</a>
      <div className="row text-center">
        <div className="col"> <h5>Marcados</h5> </div>
        <div className="col"> <h5>Restantes</h5>  </div>
      </div>
      <div className="row text-center">
        <div className="col"> <h6>{marcados}</h6> </div>
        <div className="col"><h6>{cantidad - marcados}</h6></div>
      </div>
     
    </div>
  );
};
