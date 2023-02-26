import React from "react";
import { CrearMotonave } from "../components/Motonaves/CrearMotonave";
import { ListarMotonaves } from "../components/Motonaves/ListarMotonaves";
import { useSearchParams } from "react-router-dom";
import { EditarMotonave } from "../components/Motonaves/EditarMotonave";

export const Motonaves = () => {
  const [searchParams] = useSearchParams(); 
  console.log(searchParams); 
  if (searchParams.get("ruta") === "CrearMotonave") {
    return (
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-4">
          <CrearMotonave />
        </div>
      </div>
    );
  } else if (searchParams.get("ruta") === "ListarMotonaves") {
    return (
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-12">
          <ListarMotonaves />
        </div>
      </div>
    );
  } else if(searchParams.get("ruta") === "EditarMotonave"){
    return (
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-4">
         <EditarMotonave id_motonave={searchParams.get("id_motonave")} />
        </div>
      </div>
    );
  }else {
    return (
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-12">
          ---x Elija una opcion del Menu x---
        </div>
      </div>
    );
  }
};
