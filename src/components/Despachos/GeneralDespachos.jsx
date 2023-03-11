import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { cargarProgramacion, obtenerProgramado, agrupadosPlanilla } from "../../utils/despachos";

export const GeneralDespachos = ({ id_motonave, nombre_motonave }) => {
  const [cantidad, setcantidad] = useState(0);
  const [ifRender, setIfrender] = useState(true);
  const [programado, setprogramado] = useState([])
  const [planillas, setplanillas] = useState([])
  const [file, setfile] = useState(false);
  const [changes, setchanges] = useState("")

  useEffect(() => {
    setcantidad(localStorage.getItem("cantidad"));
    obtenerProgramado().then((res) => {
      if (res.error === false) {
        setprogramado(res.data)
      }
    })

    agrupadosPlanilla().then((res) => {
      if (res.error === false) {
        setplanillas(res.data)
      }
    })
  }, [changes]);

  const handleCargarArchivo = async (e) => {
    setfile(e.target.files[0]);
        
  };

  const handleSubirarchivo = async (e) => {   
    if (!file) {
      return toast.error(`Cargue el archivo`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
    }   
    toast.loading("Cargando archivo...",{
      style: { backgroundColor: "#204c74", color: "#fff" },
    })           
    cargarProgramacion(file).then((res) => {
      if (res.error === false) {
        toast.dismiss()
        toast.success(`${res.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
        setIfrender(true)
        setchanges(new Date())
                    
      }else{
        toast.dismiss()
        toast.error(`${res.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        }) 
        setIfrender(true)
                
      }
    })
          
  }

  return (
    <div className="row col-12 col-sm-12 m-2">
      <Toaster position="top-center" />
      <div className="row col-12 col-sm-6">
        {ifRender ? (
          <button
            onClick={() => setIfrender(false)}
            className="btn btn-success m-1"
          >
            Cargar Plantilla de Programacion Excel
          </button>
        ) : (
          <div className="row">
            <input
              type="file"
              className="form-control m-1 alert alert-success"
              onChange={handleCargarArchivo}
            />
            <button onClick={handleSubirarchivo} className="btn btn-success">Cargar</button>
          </div>
        )}
        <button className="btn btn-primary m-1">
          Cargar Plantilla de Numeros de Inventarios en Excel
        </button>
      </div>
      <div className="row col-12 col-sm-12">
        <table className="table table-hover  alert alert-info mt-3">
          <thead>
            <tr>
              <th>Motonave</th>
              <th>Cantidad</th>
              <th>Programados</th>
              <th>Planillas Activas</th>
              <th>Ver Programacion</th>
              <th>Ver Numeros Inv.</th>
              <th>Registrar Novedad</th>
              <th>Generar Informe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{nombre_motonave}</td>
              <td>{cantidad}</td>
              <td>{programado?.length}</td>
              <td>{planillas?.length}</td>
              <td>
                <a
                  className="btn btn-success"
                  href={`/Despachos?ruta=VerProgramacion&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`}
                >
                  {" "}
                  <i class="bi bi-eye"></i>
                </a>{" "}
              </td>
              <td>
                <a
                  className="btn btn-success"
                  href={`/Despachos?ruta=VerNumerosInventarios&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`}
                >
                  <i class="bi bi-arrow-right-circle"></i>
                </a>{" "}
              </td>
              <td>
                <a
                  className="btn btn-warning"
                  href={`/Despachos?ruta=RegistrarNovedad&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`}
                >
                  <i class="bi bi-plus-circle-fill"></i>
                </a>{" "}
              </td>
              <td>
                <a className="btn btn-danger">
                  <i class="bi bi-newspaper"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
