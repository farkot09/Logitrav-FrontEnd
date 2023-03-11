import React, { useEffect, useState } from "react";

export const DescargueTabla = ({id_motonave, nombre_motonave}) => {
  const [descargados, setdescargados] = useState(0)
  const [cantidad, setcantidad] = useState(0)
  useEffect(() => {
    setdescargados(localStorage.getItem("descargado"))
    setcantidad(localStorage.getItem("cantidad"))
  }, [])
  return (
    <div className="row col-12 col-sm-12 m-2 alert alert-success">
      <a class="btn btn-success" href={`Procesos?ruta=CrearDescargue&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} >Descargue</a>
      <div className="row text-center">
        <div className="col"> <h5>Descargados</h5> </div>
        <div className="col"> <h5>Restantes</h5>  </div>
      </div>
      <div className="row text-center">
        <div className="col"> <h6>{descargados}</h6> </div>
        <div className="col"><h6>{cantidad - descargados}</h6></div>
      </div>
     
    </div>
  );
}
