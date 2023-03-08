/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { listarMotonaves, eliminarMotonave } from "../../utils/motonaves";
import { Cargando } from "../Cargando";

export const ListarMotonaves = () => {
  // eslint-disable-next-line no-unused-vars
  const [dataMotonaves, setdataMotonaves] = useState(null);

  const traerMotonaves = async () => {
    const res = await listarMotonaves();
    setdataMotonaves(res);
  };

  
  useEffect(() => {
    try {
      traerMotonaves();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="row p-2">
      {dataMotonaves ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Motonave</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Bls</th>
              <th className="si-mostrar" scope="col">
                {" "}
              </th>
              <th className="no-mostrar" scope="col">
                Eta
              </th>
              <th className="no-mostrar" scope="col">
                Operaciones
              </th>
              <th className="no-mostrar" scope="col">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {dataMotonaves.data.map((motonave, index) => (
              <tr key={motonave._id}>
                <th scope="row">{index + 1}</th>
                <td>{motonave.nombre_motonave}</td>
                <td>{motonave.cantidad}</td>
                <td>{motonave.cantidad_bls}</td>
                <td className="si-mostrar">
                  <div className="btn-group dropstart">
                    <button
                      type="button"
                      className="btn btn-secondary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="" className="dropdown-item">
                          eta: {motonave.eta}
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          href={`/Operaciones?id_motonave=${motonave._id}`}
                          className="dropdown-item"
                        >
                          <button className="btn btn-info">Operaciones</button>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          href={`?ruta=EditarMotonave&id_motonave=${motonave._id}`}
                          className="dropdown-item"
                        >
                          <i className="bi bi-pencil-square btn btn-warning iconos">
                            {" "}
                            Editar
                          </i>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a href="" className="dropdown-item">
                          <i className="bi bi-trash btn btn-danger iconos">
                            {" "}
                            Eliminar
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="no-mostrar">{motonave.eta}</td>
                <td className="no-mostrar">
                  <a href={`/Operaciones?id_motonave=${motonave._id}`}>
                    <button className="btn btn-info">Operaciones</button>
                  </a>
                </td>
                <td className="no-mostrar">
                  <a href={`?ruta=EditarMotonave&id_motonave=${motonave._id}`}>
                    <i className="bi bi-pencil-square btn btn-warning iconos"></i>
                  </a>
                  <button onClick={() => {
                    toast((t) => (
                      <span>
                        Esta seguro que Desea Eliminar <b>{motonave.nombre_motonave}</b>
                        <button onClick={() => {
                          eliminarMotonave(motonave._id)
                          toast.dismiss(t.id)
                          window.location.reload(true)
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
                  }} className="btn btn-danger"><i className="bi bi-trash  iconos"></i></button>
                  <Toaster position="top-right" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Cargando />
      )}
    </div>
  );
};
