import React, { useEffect, useState } from "react";
import chasisData from "../../data/chasis.json"
import { obtenerMotonaveId } from "../../utils/motonaves";
import { obtenerBlsPorMotonave } from "../../utils/bls";
import { Cargando } from "../Cargando";

export const ListarOperacion = ({ id_motonave }) => {
  const [dataMotonaves, setdataMotonaves] = useState(null);
  const [dataBls, setdataBls] = useState(null);
  const [dataChasis, setdataChasis] = useState(chasisData); 
  const chasisFilter = dataChasis.data.filter((chasis) => chasis.id_motonave === id_motonave )
  const [ver, setver] = useState(false)

  useEffect(() => {
    obtenerMotonaveId(id_motonave).then((res) => {
      if (res.error === false) {
        setdataMotonaves(res.data)
      }
    })

    obtenerBlsPorMotonave(id_motonave).then((res) => {
      if (res.error === false) {
        setdataBls(res.data)
      }
    })

  }, [])
  
  
  return (
    <div className="row p-2">      
      {
        dataMotonaves && dataBls
        ? <div className="card" style={{width:400}}>
        <div className="card-header">{ dataMotonaves.nombre_motonave }</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cantidad Vehiculos: { dataMotonaves.cantidad }</li>
          <li className="list-group-item">Cantidad Bls: { dataMotonaves.cantidad_bls }</li>          
        </ul>
      </div>
      :""
      }
      {
        dataMotonaves && dataBls 
        ?  <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">BLS</th>
            <th scope="col">Chasis</th>
            <th scope="col">Notas</th>
            <th className="no-mostrar" scope="col">Operacion</th>
            <th className="no-mostrar" scope="col">Procesos</th>            
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{ dataMotonaves.cantidad_bls === dataBls.length 
                ? <a href={`/Bls?id_motonave=${id_motonave}`}><button className="btn btn-success" >Ver Bls</button> </a>
                : <a href={`/Bls?id_motonave=${id_motonave}`}><button className="btn btn-danger" >Agregar Bls</button></a> 
                }</td>
                <td>
                { dataMotonaves.cantidad === chasisFilter.length 
                ? <a href={`/Chasis?id_motonave=${id_motonave}`}><button className="btn btn-success" >Ver Chasis</button> </a>
                : <a href={`/Chasis?id_motonave=${id_motonave}`}><button className="btn btn-danger" >Agregar Chasis</button> </a>
                }
                </td>
                <td>
                { dataMotonaves.cantidad_bls === dataBls.length 
                ? "BLS OK |" 
                : "BLS Incompletos |" 
                }
                { dataMotonaves.cantidad === chasisFilter.length 
                ? " Chasis OK" 
                : " Chasis Incompletos" 
                }

                </td>
                <td className="no-mostrar">
                    {
                        (dataMotonaves.cantidad_bls === dataBls.length && dataMotonaves.cantidad === chasisFilter.length ) && (dataMotonaves.operacion)
                        ? <button className="btn btn-success">Desactivar</button>
                        : ""
                    }
                    {
                        (dataMotonaves.cantidad_bls === dataBls.length && dataMotonaves.cantidad === chasisFilter.length) && (!dataMotonaves.operacion)
                        ?<button className="btn btn-success">Activar</button>
                        :""
                    }
                    {
                        dataMotonaves.cantidad_bls === dataBls.length && dataMotonaves.cantidad === chasisFilter.length
                        ?""
                        :<button className="btn btn-danger" disabled>Activar</button>
                    }
                </td>
                <td className="no-mostrar">
                <a href={`/Procesos?id_motonave=${id_motonave}&nombre_motonave=${dataMotonaves.nombre_motonave}&ruta=VerProcesos`}><button className="btn btn-info">ver</button></a>
                </td>
                {
                    dataMotonaves.operacion 
                    ? <td className="bg-success"></td>
                    : <td className="bg-danger"></td>
                }
            </tr>
            <tr className="si-mostrar">
                <td>Operacion</td>
                <td>Procesos</td>
                <td></td>
                <td></td>
            </tr>
            <tr className="si-mostrar">
            <td className="si-mostrar">
                    {
                        (dataMotonaves.cantidad_bls === dataBls.length && dataMotonaves.cantidad === chasisFilter.length ) && (dataMotonaves.operacion)
                        ? <button className="btn btn-success">Desactivar</button>
                        : ""
                    }
                    {
                        (dataMotonaves.cantidad_bls === dataBls.length && dataMotonaves.cantidad === chasisFilter.length) && (!dataMotonaves.operacion)
                        ?<button className="btn btn-success">Activar</button>
                        :""
                    }
                    {
                        dataMotonaves.cantidad_bls === dataBls.length && dataMotonaves.cantidad === chasisFilter.length
                        ?""
                        :<button className="btn btn-danger" disabled>Activar</button>
                    }
                </td>
                <td className="si-mostrar">
                <a href={`/Procesos?id_motonave=${id_motonave}&nombre_motonave=${dataMotonaves.nombre_motonave}&ruta=VerProcesos`}><button className="btn btn-info">ver</button></a>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
      </table>
      : <Cargando />
      }
     
    </div>
  );
};
