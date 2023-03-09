import React, { useState } from 'react'
import { CrearBls } from '../components/Operaciones/Bls/CrearBls'
import { ListadoBls } from '../components/Operaciones/Bls/ListadoBls'
import { useSearchParams } from "react-router-dom";

export const Bls = () => {
    const [searchParams] = useSearchParams(); 
    const [cambio, setcambio] = useState("")
  return (
    <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-12">
          <CrearBls id_motonave={searchParams.get("id_motonave")} handlecambio={setcambio} />
        </div>
        <div className="col-12 col-sm-12">
          <ListadoBls id_motonave={searchParams.get("id_motonave")} handlecambio={cambio} />
        </div>        
    </div>
  )
}
