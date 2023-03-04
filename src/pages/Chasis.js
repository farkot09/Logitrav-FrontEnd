import React from 'react'
import { CargarChasis } from '../components/Operaciones/Chasis/CargarChasis'
import { useSearchParams } from "react-router-dom";

export const Chasis = ({}) => {
    const [searchParams] = useSearchParams(); 
  return (
    <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-12">
          <CargarChasis id_motonave={searchParams.get("id_motonave")} />
        </div>
    </div>
  )
}
