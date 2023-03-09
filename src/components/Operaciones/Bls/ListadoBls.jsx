import React, { useEffect, useState } from "react";
import { obtenerBlsPorMotonave, editarBls, eliminarBls } from "../../../utils/bls";
import toast, { Toaster } from "react-hot-toast";
import { Cargando } from "../../Cargando";

export const ListadoBls = ({ id_motonave, handlecambio }) => {
  const [BlsData, setBlsData] = useState(null);
  const [dataModal, setdataModal] = useState("");
  const [displayOn, setdisplayOn] = useState("d-none");
  const [handleUpdate, sethandleUpdate] = useState("")

  useEffect(() => {
    obtenerBlsPorMotonave(id_motonave).then((res) => {
      if (res.error === false) {
        setBlsData(res.data);
        setdisplayOn("");
      }
    });
  }, [handlecambio, handleUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Actiualizando...",{
      style: { backgroundColor: "#204c74", color: "#fff" },
    })
    await editarBls(dataModal).then((res) => {
      if (res.error === false) {
          toast.dismiss()
          toast.success(`${dataModal.numero_bl} ${res.message}`,{
            style: { backgroundColor: "#204c74", color: "#fff" },
          })
          sethandleUpdate(new Date())
          
      }
    })
  };

  return (
    <div className="row">
      {displayOn !== "" ? <Cargando /> : ""}
      <div className={`col-12 col-sm-12 ${displayOn}`}>
      <Toaster position="top-right" />
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
            {BlsData?.map((data, index) => (
              <tr key={index}>
                <td>{data.numero_bl}</td>
                <td>{data.cantidad}</td>
                <td>{data.marca}</td>
                <td>{data.transporte}</td>
                <td>{data.condicion}</td>
                <td>
                  <i
                    class="bi bi-pencil-square btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setdataModal(data)}
                  ></i>{" "}
                </td>
                <td>
                  <i class="bi bi-trash btn btn-danger" onClick={() => {
                    toast((t) => (
                      <span>
                        Esta seguro que Desea Eliminar <b>{data.numero_bl}</b>
                        <button onClick={async() => {                          
                          await eliminarBls(data._id).then((res) => {
                            if (res.error === false) {
                              toast.dismiss(t.id)
                              sethandleUpdate(new Date())
                              toast.success(`${data.numero_bl} ${res.message}`,{
                                style: { backgroundColor: "#204c74", color: "#fff" },
                              })
                              
                            }
                          })
                        }}>
                          Si
                        </button>
                        <button onClick={() => toast.dismiss(t.id)}>
                          Cancelar
                        </button>
                      </span>
                    ),{
                      style: { backgroundColor: "#204c74", color: "#fff" },
                    });
                  }}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  Editar {dataModal.numero_bl}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form className="mb-2" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control inputs-general"
                    value={dataModal.numero_bl}
                    onChange={(e) =>
                      setdataModal({ ...dataModal, numero_bl: e.target.value })
                    }
                    required
                  />
                  <input
                    type="number"
                    className="form-control inputs-general"
                    value={dataModal.cantidad}
                    onChange={(e) =>
                      setdataModal({ ...dataModal, cantidad: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    className="form-control inputs-general"
                    value={dataModal.marca}
                    onChange={(e) =>
                      setdataModal({ ...dataModal, marca: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    className="form-control inputs-general"
                    value={dataModal.transporte}
                    onChange={(e) =>
                      setdataModal({ ...dataModal, transporte: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    className="form-control inputs-general"
                    value={dataModal.condicion}
                    onChange={(e) =>
                      setdataModal({ ...dataModal, condicion: e.target.value })
                    }
                    required
                  />
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"  
                      data-bs-dismiss="modal"                                          
                    >
                      Guardar Cambios
                    </button>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
