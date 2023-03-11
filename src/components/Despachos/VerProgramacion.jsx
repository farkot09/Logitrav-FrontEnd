import React, { useEffect, useState } from 'react'
import {BackButton} from "../BackButton"
import { agrupadosPlanilla } from '../../utils/despachos';
import { DetallePlanilla } from './DetallePlanilla';

export const VerProgramacion = ({id_motonave, nombre_motonave}) => {  
  const [planillas, setplanillas] = useState([])
  const [dataPlanilla, setdataPlanilla] = useState({})

  useEffect(() => {
    agrupadosPlanilla().then((res) => {
      if (res.error === false) {        
          setplanillas(res.data)
      }
    }) 
    
  }, [])
  

  return (
    <div className="row col-12 col-sm-12 m-2">
      <BackButton />
        <table className='table table-hover table-bordered '>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Transportess</th>
                    <th>Placa</th>
                    <th>Planilla</th>
                    <th>Cantidad</th>
                    <th>Ver</th>                    
                    <th>Despachar</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
              {
                planillas.map((planilla, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{planilla.records[0].transporte}</td>
                    <td>{planilla.records[0].placa}</td>                    
                    <td>{planilla._id}</td>
                    <td>{planilla.cantidad}</td>
                    <td><i onClick={() => setdataPlanilla(planilla)} className="bi bi-eye btn btn-primary"></i></td>                    
                    <td><i className="bi bi-truck btn btn-success"></i></td>
                    <td><i className="bi bi-pencil-square btn btn-warning"></i></td>
                    <td><i className="bi bi-trash btn btn-danger"></i></td>
                  </tr>
                ))
              }
            </tbody>
        </table>
        <DetallePlanilla data={dataPlanilla} />
    </div>
  )
}
