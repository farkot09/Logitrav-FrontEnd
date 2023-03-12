import React, { useEffect, useState } from "react";
import { BackButton } from "../BackButton";
import { agrupadosPlanilla, actualizarPlanilla, despacharPlanilla } from "../../utils/despachos";
import { DetallePlanilla } from "./DetallePlanilla";
import toast, { Toaster } from "react-hot-toast";

export const VerProgramacion = ({ id_motonave, nombre_motonave }) => {
  const [planillas, setplanillas] = useState([]);
  const [dataPlanilla, setdataPlanilla] = useState({});
  const [changes, setchanges] = useState("");
  const [planillaParaEditar, setplanillaParaEditar] = useState({});

  useEffect(() => {
    agrupadosPlanilla().then((res) => {
      if (res.error === false) {
        setplanillas(res.data);
      }
    });
  }, [changes]);

  const handleDetallePlanilla = async (indexaEliminar) => {
    const newdataPlanilla = {
      _id: dataPlanilla._id,
      cantidad: dataPlanilla.cantidad,
      records: dataPlanilla.records.filter(
        (item) => item.chasis !== indexaEliminar
      ),
    };
    setdataPlanilla(newdataPlanilla);
    setchanges(new Date());
  };

  const handleAgregarChasis = async (data) => {
    const n = dataPlanilla.records.push(data);
    setchanges(new Date());
  };

  const handleActualizarPlanilla = async (data) => {
    toast.loading("Actiualizando...",{
      style: { backgroundColor: "#204c74", color: "#fff" },
    })
    await actualizarPlanilla(data).then((res) => {
      if (res.error === false) { 
        toast.dismiss()
        toast.success(`Planilla ${data.planilla} actualizada ${res.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
        setchanges(new Date())
      }else{
        toast.dismiss()
        toast.error(`${res.error}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
      }
    }).catch((e) => {
      toast.dismiss()
      toast.error("Error",{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
      console.log(e);
    })
  }

  const handleDespacharPlanilla = async (data) => {    
    
    await despacharPlanilla(data).then((res) =>{
      if (!res.error) {
        console.log(res);
        setchanges(new Date())
      }else{
        console.log(res);
      }
    })
    
  }



  return (
    
    <div className="row col-12 col-sm-12 m-2">  
     <BackButton />                  
      <table className="table table-hover table-bordered ">              
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
          {planillas.map((planilla, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{planilla.records[0]?.transporte}</td>
              <td>{planilla.records[0]?.placa}</td>
              <td>{planilla._id}</td>
              <td>{planilla.cantidad}</td>
              <td>
                <i
                  onClick={() => {
                    setdataPlanilla(planilla);
                  }}
                  className="bi bi-eye btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                ></i>
              </td>
              <td>
                <i 
                onClick={() => handleDespacharPlanilla(planilla._id)}
                className="bi bi-truck btn btn-success"></i>
              </td>
              <td>
                
                <i
                  onClick={() => setplanillaParaEditar(planilla.records[0])}
                  className="bi bi-pencil-square btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                ></i>
              </td>
              <td>
                <i className="bi bi-trash btn btn-danger"></i>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      
      {
        // MODAL DE MOSTRAR DETALLE PLANILLA ------------
      }
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {" "}
                Detalle de Planilla
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <DetallePlanilla
                data={dataPlanilla}
                handle={handleDetallePlanilla}
                handleAgregarChasis={handleAgregarChasis}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        // FIN DEL  MODAL DE MOSTRAR DETALLE PLANILLA -------------------
      }

      {
        // MODAL DE EDITAR PLANILLAXXXXXXXXXXXXXXXXXXXXXX
      }

      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <Toaster position="top-center" />
        
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Editar Planilla {dataPlanilla._id}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control inputs-general"
                value={planillaParaEditar.conductor}
                onChange={(e) => {
                  setplanillaParaEditar({...planillaParaEditar, conductor:e.target.value})
                }}
              />
              <input
                type="text"
                className="form-control inputs-general"
                value={planillaParaEditar.cedula}
                onChange={(e) => {
                  setplanillaParaEditar({...planillaParaEditar, cedula:e.target.value})
                }}
              />
              <input
                type="text"
                className="form-control inputs-general"
                value={planillaParaEditar.placa}
                onChange={(e) => {
                  setplanillaParaEditar({...planillaParaEditar, placa:e.target.value})
                }}
              />
              <input
                type="text"
                className="form-control inputs-general"
                value={planillaParaEditar.transporte}
                onChange={(e) => {
                  setplanillaParaEditar({...planillaParaEditar, transporte:e.target.value})
                }}
              />
              
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={() => handleActualizarPlanilla(planillaParaEditar)} type="button" class="btn btn-primary" >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        // FIN MODAL DE EDITAR PLANILLA XXXXXXXXXXXXXXXXXXXXXXXXXXX
      }
    </div>
  );
};
