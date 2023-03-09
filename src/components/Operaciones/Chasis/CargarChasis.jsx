import React, { useEffect, useState } from "react";
import { generarPlantilla, cargarPlantillaChasis } from "../../../utils/chasis";
import { obtenerMotonaveId } from "../../../utils/motonaves";
import { obtenerBlsPorMotonave } from "../../../utils/bls";
import { Cargando } from "../../Cargando";
import { obtenerChasisPorMotonave } from "../../../utils/chasis";
import toast, { Toaster } from "react-hot-toast";


export const CargarChasis = ({ id_motonave }) => {
  const [cantidadMotonave, setcantidadMotonave] = useState(null);
  const [cantidadBls, setcantidadBls] = useState(null);
  const [file, setfile] = useState(null)
  const [ChasisData, setChasisData] = useState(null);
  const [change, setchange] = useState("")
  const [block, setblock] = useState(false)


  useEffect(() => {
    obtenerMotonaveId(id_motonave).then((res) => {
      if (res.error === false) {
        setcantidadMotonave(res.data);
      }
    });

    obtenerBlsPorMotonave(id_motonave).then((res) => {
      if (res.error === false) {
        setcantidadBls(res.data);
      }
    });

    obtenerChasisPorMotonave(id_motonave).then((res) => {
      if (res.error === false) {        
          setChasisData(res.data)
          if (res.data.length > 0) {
            setblock(true)
          }         
      }
    })


  }, [change]);

  const handleGenerarPlantilla = async () => {    
    await generarPlantilla(id_motonave)
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "PlantillaCargarChasis.xlsx";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      })
      .catch((error) => {
        console.log(error);
      });    
  };

  const handleSubirarchivo = async (e) => {      
    toast.loading("Cargando archivo...",{
      style: { backgroundColor: "#204c74", color: "#fff" },
    })           
    cargarPlantillaChasis(file).then((res) => {
      if (res.error === false) {
        toast.dismiss()
        toast.success(`${res.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
        setchange(new Date())              
      }else{
        toast.dismiss()
        toast.error(`${res.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        }) 
        setchange(new Date())
      }
    })
      
  }
  const handleCargarArchivo = async (e) => {    
    setfile(e.target.files[0])
    
  }
    
  return (
    <div className="row">
      <h3>Cargar Chasis: {cantidadMotonave?.nombre_motonave}</h3>
      <Toaster position="top-center"/>
      {cantidadBls && cantidadBls ? (
        <div className="col-12 col-sm-12">
          {
            !block 
            ? <div className="row col-12 col-sm-4 m-2">
            {cantidadMotonave?.cantidad_bls === cantidadBls?.length ? (
              <div>
                <button                  
                  className="btn btn-warning m-1"
                  onClick={handleGenerarPlantilla}
                  
                >
                  Descargar Plantilla Excel <i class="bi bi-cloud-download"></i>{" "}
                </button>
                <div className="input-group mb-3" >
                  <button
                    className="btn btn-success"
                    type="button"
                    id="inputGroupFileAddon03"
                    onClick={handleSubirarchivo} 
                                     
                  >
                    Cargar <i class="bi bi-cloud-upload"></i>
                  </button>
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile03"
                    aria-describedby="inputGroupFileAddon03"
                    aria-label="Upload"
                    onChange={handleCargarArchivo}
                    
                  />
                </div>{" "}
              </div>
            ) : (
              <button className="btn btn-warning" disabled>
                {" "}
                Bls Incompletos{" "}
              </button>
            )}
          </div>
          :""
          }
          <div className="row col-12 col-sm-4 m-2"></div>
          <div className="row col-12 m-2">
            {
              ChasisData
              ? <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>id</th>
                  <th className="no-mostrar">Numero Bl</th>
                  <th>chasis</th>
                  <th>modelo</th>
                  <th className="no-mostrar">version</th>
                  <th>color</th>
                  <th className="no-mostrar">motor</th>
                </tr>
              </thead>
              <tbody>
                {ChasisData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="no-mostrar">{
                      //LINEA PARA MOSTAR BL, TOCO CONVERTIR LA RESPUESTA A TEXTO PLANO Y ESTRAER ENTRE CARACTERES PORQUE NO PODIA ACCEDER
                      JSON.stringify(data.id_bl).substring((JSON.stringify(data.id_bl).indexOf('numero_bl') + 12),(JSON.stringify(data.id_bl).indexOf('cantidad')-3))
                    }</td>
                    <td>{data.chasis}</td>
                    <td>{data.modelo}</td>
                    <td className="no-mostrar">{data.version}</td>
                    <td>{data.color}</td>
                    <td className="no-mostrar">{data.motor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
              : <Cargando />
            }
            
          </div>
        </div>
      ) : (
        <Cargando />
      )}
    </div>
  );
};
