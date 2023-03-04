import React, { useState } from "react";
import dataBLs from "../../../data/bls.json"

export const ListadoBls = ({id_motonave}) => {
const [BlsData, setBlsData] = useState(dataBLs.data)
    return (
    <div className="row">
      <div className="col-12 col-sm-12">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Numero de BLs</th>
              <th>Cantidad de Vehiculos</th>
              <th>Marca</th>
              <th>Transporte</th>
              <th>condicion</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
                BlsData.map((data,index) =>(
                    <tr key={index}>
                        <td>{ data.numero_bl }</td>
                        <td>{ data.cantidad }</td>
                        <td>{ data.marca }</td>
                        <td>{ data.transporte }</td>
                        <td>{ data.condicion }</td>
                        <td><i class="bi bi-pencil-square btn btn-warning"></i></td>
                        <td><i class="bi bi-trash btn btn-danger"></i></td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
