import React from 'react'

export const VerNumerosInventarios = ({id_motonave, nombre_motonave}) => {
  return (
    <div className="row col-12 col-sm-12 m-2">
        <table className='table table-hover table-bordered'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Placa</th>
                    <th>Chasis</th>
                    <th>Planilla</th>
                    <th>Numero Inventario</th>
                    <th> <a className='btn btn-primary'><i class="bi bi-table"></i></a> </th>                    
                </tr>
            </thead>
        </table>
    </div>
  )
}