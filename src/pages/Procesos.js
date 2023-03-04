import React from "react";
import { MarcacionTabla } from "../components/Procesos/MarcacionTabla";
import { MarcacionCrear } from "../components/Procesos/MarcacionCrear";
import { useSearchParams } from "react-router-dom";
import { DescargueTabla } from "../components/Procesos/DescargueTabla";
import { ImprontasTomaTabla } from "../components/Procesos/ImprontasTomaTabla";
import { ImprontasRevisionTabla } from "../components/Procesos/ImprontasRevisionTabla";
import { DespachosTabla } from "../components/Procesos/DespachosTabla";
import { DescargueCrear } from "../components/Procesos/DescargueCrear";
import { ImprontasTomaCrear } from "../components/Procesos/ImprontasTomaCrear";
import { ImprontasRevisionCrear } from "../components/Procesos/ImprontasRevisionCrear";
export const Procesos = () => {
  const [searchParams] = useSearchParams();
  const ruta = searchParams.get("ruta");
  const id_motonave = searchParams.get("id_motonave");
  const nombre_motonave = searchParams.get("nombre_motonave");
  if (ruta === "VerProcesos") {
    return (
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <h1>Procesos Motonave {nombre_motonave}</h1>
        <div className="row col-12">
          <MarcacionTabla
            id_motonave={id_motonave}
            nombre_motonave={nombre_motonave}
          />
        </div>
        <div className="row col-12">
          <DescargueTabla
            id_motonave={id_motonave}
            nombre_motonave={nombre_motonave}
          />
        </div>
        <div className="row col-12">
          <ImprontasTomaTabla
            id_motonave={id_motonave}
            nombre_motonave={nombre_motonave}
          />
        </div>
        <div className="row col-12">
          <ImprontasRevisionTabla
            id_motonave={id_motonave}
            nombre_motonave={nombre_motonave}
          />
        </div>
        <div className="row col-12">
          <DespachosTabla
            id_motonave={id_motonave}
            nombre_motonave={nombre_motonave}
          />
        </div>
      </div>
    );
  } else if (ruta === "CrearMarcacion") {
    return (
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <MarcacionCrear
          id_motonave={id_motonave}
          nombre_motonave={nombre_motonave}
        />
      </div>
    );
  } else if (ruta === "CrearDescargue") {
    return (
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <DescargueCrear
          id_motonave={id_motonave}
          nombre_motonave={nombre_motonave}
        />
      </div>
    );
  } else if (ruta === "CrearTomaImprontas") {
    return(
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <ImprontasTomaCrear
          id_motonave={id_motonave}
          nombre_motonave={nombre_motonave}
        />
      </div>
    )
  } else if (ruta === "CrearRevisionImprontas" ) {
    return(
      <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <ImprontasRevisionCrear
          id_motonave={id_motonave}
          nombre_motonave={nombre_motonave}
        />
      </div>
    )
  }
};