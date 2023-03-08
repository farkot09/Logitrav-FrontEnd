import React, { useEffect, useState } from "react";
import { obtenerMotonaveId, actualizarMotonave } from "../../utils/motonaves";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const EditarMotonave = ({ id_motonave }) => {  
  let navigate = useNavigate(); 
  const [nombre_motonave, setnombre_motonave] = useState("")
  const [cantidad, setcantidad] = useState(0)
  const [cantidad_bls, setcantidad_bls] = useState(0)
  const [eta, seteta] = useState("")
  const [fecha_captura, setfecha_captura] = useState("")
  const [operacion, setoperacion] = useState("")
  const [estado_bls, setestado_bls] = useState(false)
  const [datav, setdatav] = useState(0)
  
  const obtenerMotonave = async (id) => {
    const res = await obtenerMotonaveId(id);
    if (!res.error) {
      setnombre_motonave(res.data.nombre_motonave)
      setcantidad(res.data.cantidad)
      setcantidad_bls(res.data.cantidad_bls)
      seteta(res.data.eta)
      setfecha_captura(res.data.fecha_captura)
      setoperacion(res.data.operacion)
      setestado_bls(res.data.estado_bls)
      setdatav(res.data.__v)
      
    }
    
  };

  
  useEffect(() => {    
    obtenerMotonave(id_motonave);
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    toast.loading("Actualizando Motonave...",{
      style: { backgroundColor: "#204c74", color: "#fff" },
    })
    const newData = {
      id_motonave,
      nombre_motonave,
      cantidad,
      cantidad_bls,
      eta,
      fecha_captura,
      operacion,
      estado_bls,
      __v:datav


    }

    const res = await actualizarMotonave(newData)
    if (!res.error) {
      toast.dismiss()
      toast.success(`${res.data.nombre_motonave} ${res.message}`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
      toast.success("Redicrecting...",{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
      setTimeout(() => {
        toast.dismiss()
        navigate("/Motonaves?ruta=ListarMotonaves");
      }, 2000);   
    }
    if (res.error) {
      toast.dismiss()
      toast.error(`${res.message}`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      }) 
    }
  }

  
  return (
    <form className="mb-2" onSubmit={handleSubmit}>
      <h3>Editar Motonave</h3>
      <div className="mb-3">
        <label className="form-label">
          Id
        </label>

        <input
          value={id_motonave}
          type="text"
          className="form-control inputs-general"
          required
          disabled
        />
      </div>
      <div className="mb-3">
        <label for="nombre_motonave" className="form-label">
          Nombre Motonave:
        </label>

        <input
          value={nombre_motonave}
          type="text"
          className="form-control inputs-general"
          onChange={(e) => setnombre_motonave(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Cantidad:
        </label>
        <input
          value={cantidad}
          type="number"
          className="form-control inputs-general"
          onChange={(e) => setcantidad(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Cantidad Bls:
        </label>
        <input
          value={cantidad_bls}
          type="number"
          className="form-control inputs-general"
          onChange={(e) => setcantidad_bls(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          ETA
        </label>
        <input
          value={eta}
          type="text"
          className="form-control inputs-general"
          onChange={(e) => seteta(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="boton-login">
        Actualizar
      </button>
      <Toaster position="top-right" />
    </form>
  );
};
