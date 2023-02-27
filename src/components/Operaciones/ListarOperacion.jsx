import React, { useState } from "react";
import motonavesData from "../../data/motonaves.json";
import blsData from "../../data/bls.json";
import chasisData from "../../data/chasis.json"

export const ListarOperacion = ({ id_motonave }) => {
  const [dataMotonaves, setdataMotonaves] = useState(motonavesData);
  const [dataBls, setdataBls] = useState(blsData);
  const [dataChasis, setdataChasis] = useState(chasisData);
  const mnFilter = dataMotonaves.data.filter((mn) => mn._id === id_motonave);
  const blFilter = dataBls.data.filter((bls) => bls.id_motonave === id_motonave )   
  const chasisFilter = dataChasis.data.filter((chasis) => chasis.id_motonave === id_motonave )   
  
  return (
    <div className="row p-2">
      <div className="card" style={{width:400}}>
        <div className="card-header">{ mnFilter[0].nombre_motonave }</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cantidad Vehiculos: { mnFilter[0].cantidad }</li>
          <li className="list-group-item">Cantidad Bls: { mnFilter[0].cantidad_bls }</li>          
        </ul>
      </div>
      <table className="table table-hover">
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
                <td>{ mnFilter[0].cantidad_bls === blFilter.length 
                ? <button className="btn btn-success" >Ver Bls</button> 
                : <button className="btn btn-danger" >Agregar Bls</button> 
                }</td>
                <td>
                { mnFilter[0].cantidad === chasisFilter.length 
                ? <button className="btn btn-success" >Ver Chasis</button> 
                : <button className="btn btn-danger" >Agregar Chasis</button> 
                }
                </td>
                <td>
                { mnFilter[0].cantidad_bls === blFilter.length 
                ? "BLS OK |" 
                : "BLS Incompletos |" 
                }
                { mnFilter[0].cantidad === chasisFilter.length 
                ? " Chasis OK" 
                : " Chasis Incompletos" 
                }

                </td>
                <td className="no-mostrar">
                    {
                        (mnFilter[0].cantidad_bls === blFilter.length && mnFilter[0].cantidad === chasisFilter.length ) && (mnFilter[0].operacion)
                        ? <button className="btn btn-success">Desactivar</button>
                        : ""
                    }
                    {
                        (mnFilter[0].cantidad_bls === blFilter.length && mnFilter[0].cantidad === chasisFilter.length) && (!mnFilter[0].operacion)
                        ?<button className="btn btn-success">Activar</button>
                        :""
                    }
                    {
                        mnFilter[0].cantidad_bls === blFilter.length && mnFilter[0].cantidad === chasisFilter.length
                        ?""
                        :<button className="btn btn-danger" disabled>Activar</button>
                    }
                </td>
                <td className="no-mostrar">
                    <button className="btn btn-info">ver</button>
                </td>
                {
                    mnFilter[0].operacion 
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
                        (mnFilter[0].cantidad_bls === blFilter.length && mnFilter[0].cantidad === chasisFilter.length ) && (mnFilter[0].operacion)
                        ? <button className="btn btn-success">Desactivar</button>
                        : ""
                    }
                    {
                        (mnFilter[0].cantidad_bls === blFilter.length && mnFilter[0].cantidad === chasisFilter.length) && (!mnFilter[0].operacion)
                        ?<button className="btn btn-success">Activar</button>
                        :""
                    }
                    {
                        mnFilter[0].cantidad_bls === blFilter.length && mnFilter[0].cantidad === chasisFilter.length
                        ?""
                        :<button className="btn btn-danger" disabled>Activar</button>
                    }
                </td>
                <td className="si-mostrar">
                    <button className="btn btn-info">ver</button>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};
