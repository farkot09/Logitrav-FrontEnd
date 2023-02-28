import React from 'react'
import { CrearBls } from '../components/Operaciones/Bls/CrearBls'
import { useSearchParams } from "react-router-dom";

export const Bls = ({}) => {
    const [searchParams] = useSearchParams(); 
  return (
    <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-12">
          <CrearBls id_motonave={searchParams.get("id_motonave")} />
        </div>
    </div>
  )
}
