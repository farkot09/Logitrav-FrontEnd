import React, { useEffect, useState } from 'react';
import {Cargando} from "../Cargando"
import { motonavesActivas } from '../../utils/motonaves';

export const MotonavesActivas = () => {    
    const [dataMn, setdataMn] = useState(null)
    const traerMotonaves = async () => {
        const res = await motonavesActivas()
        if (!res.error) {
            setdataMn(res)
        }
    }

    useEffect(() => {
        traerMotonaves()
    }, [])
    
  return (
    <div className="row">
        <h3>Operaciones Activas</h3>
        {
            dataMn 
            ? <table className="table table-hover table-striped">
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
            : <Cargando />
        }
        
    </div>
  )
}
