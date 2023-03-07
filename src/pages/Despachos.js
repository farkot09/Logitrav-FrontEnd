import React, { useState } from 'react'
import { useSearchParams  } from "react-router-dom";
import { GeneralDespachos } from '../components/Despachos/GeneralDespachos';
import { VerProgramacion } from '../components/Despachos/VerProgramacion';
import { VerNumerosInventarios } from '../components/Despachos/VerNumerosInventarios';
import { RegistrarNovedad } from '../components/Despachos/RegistrarNovedad';
import { render } from '@testing-library/react';

export const Despachos = () => {
    const [searchParams] = useSearchParams();     
    const [ruta, setruta] = useState(searchParams.get("ruta"))
    const [id_motonave, setid_motonave] = useState(searchParams.get("id_motonave"))
    const [nombre_motonave, setnombre_motonave] = useState(searchParams.get("nombre_motonave"))    
    
    if (ruta === "General") {
        return (
            <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
                <GeneralDespachos id_motonave={id_motonave} nombre_motonave={nombre_motonave} />
            </div>
          )
    } else if(ruta === "VerProgramacion"){
        return (
            <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
                <VerProgramacion id_motonave={id_motonave} nombre_motonave={nombre_motonave} />
            </div>
          )
    } else if(ruta === "VerNumerosInventarios"){
        return (
            <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
                <VerNumerosInventarios id_motonave={id_motonave} nombre_motonave={nombre_motonave} />
            </div>
          )
    } else if(ruta === "RegistrarNovedad"){
        return(
            <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
                <RegistrarNovedad id_motonave={id_motonave} nombre_motonave={nombre_motonave} />
            </div>
        )
    }
}
