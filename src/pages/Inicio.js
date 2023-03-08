import React from 'react'

export const Inicio = () => {
  const fecha = new Date(Date.now())
  return (
    <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
        <div className="col-12 col-sm-4 text-center">
            <p>Bienvenido a LOGITRAV</p>
            <p>Logistica y Trazabilidad Vehicular</p>
            <p>Fecha de Acceso:</p>
            <p>{fecha.toLocaleString()}</p>
        </div>   
    </div>
  )
}
