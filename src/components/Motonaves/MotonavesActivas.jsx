import React, { useState } from 'react'
import motonavesData from "../../data/motonaves.json";

export const MotonavesActivas = () => {
    const [dataMn, setdataMn] = useState(motonavesData)
  return (
    <div className="row">
        <h3>Operaciones Activas</h3>
        <table className="table table-hover table-striped">
        <thead>
            <tr>
                <th>Motonave</th>
                <th>Cantidad Vehiculos</th>
                <th> - </th>
            </tr>
        </thead>
        <tbody>
            {
                dataMn.data.map((data) => (
                    <tr>
                        <td>{ data.nombre_motonave }</td>
                        <td>{ data.cantidad }</td>
                        <td className='bg-success'></td>
                    </tr>
                ))
            }

        </tbody>
        </table>
    </div>
  )
}
