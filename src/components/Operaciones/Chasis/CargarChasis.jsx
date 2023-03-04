import React, { useState } from "react";
import dataChasis from "../../../data/chasis.json";

export const CargarChasis = ({ id_motonave }) => {
    const [ChasisData, setChasisData] = useState(dataChasis.data)
    const chasisFilter = ChasisData.filter(item => item.id_motonave === id_motonave)
  return (
    <div className="row">
      <div className="col-12 col-sm-12">
        <div className="row col-12 col-sm-4 m-2">
          <button className="btn btn-warning">
            Descargar Plantilla Excel <i class="bi bi-cloud-download"></i>{" "}
          </button>
        </div>
        <div className="row col-12 col-sm-4 m-2">
          <button className="btn btn-success">
            Cargar Plantilla Diligenciada Excel{" "}
            <i class="bi bi-cloud-upload"></i>{" "}
          </button>
        </div>
        <div className="row col-12 m-2">
          <table class="table table-hover table-bordered">            
            <thead>
              <tr>
                <th>id</th> 
                <th className="no-mostrar">id_bl</th>                
                <th>chasis</th>
                <th>modelo</th>
                <th className="no-mostrar">version</th>
                <th>color</th>
                <th className="no-mostrar">motor</th>                
              </tr>
            </thead>
            <tbody>
                {
                    chasisFilter.map((data, index ) =>(
                        <tr key={index}>
                            <td>{ index + 1 }</td>                            
                            <td  className="no-mostrar">{ data.id_bl }</td>
                            <td>{ data.chasis }</td>
                            <td>{ data.modelo }</td>
                            <td className="no-mostrar">{ data.version }</td>
                            <td>{ data.color }</td>
                            <td className="no-mostrar">{ data.motor }</td>
                        </tr>
                    ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
