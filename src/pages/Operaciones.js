import React from 'react'
import { ListarOperacion } from '../components/Operaciones/ListarOperacion'
import { useSearchParams } from "react-router-dom";

export const Operaciones = () => {
  const [searchParams] = useSearchParams(); 
  
  return (
    <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">  
      <ListarOperacion id_motonave={searchParams.get("id_motonave")} />
    </div>
  )
}
