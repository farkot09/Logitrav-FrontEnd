import React from 'react'
import { useNavigate } from 'react-router-dom';

export const VerProgramacion = ({id_motonave, nombre_motonave}) => {
  const navigate = useNavigate();

  return (
    <div className="row col-12 col-sm-12 m-2">
      <button onClick={() => navigate(-1)}>go back</button>
        <table className='table table-hover table-bordered'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Transporte</th>
                    <th>Placa</th>
                    <th>Planilla</th>
                    <th>Cantidad</th>
                    <th>Ver</th>
                    <th>Guia</th>
                    <th>Despachar</th>
                    <th>Modificar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
        </table>
    </div>
  )
}
