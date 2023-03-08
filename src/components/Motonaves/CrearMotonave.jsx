import React, { useState } from 'react'
import { crearMotonave } from '../../utils/motonaves'
import toast, { Toaster } from "react-hot-toast";

export const CrearMotonave = () => {
  const [nombre_motonave, setnombre_motonave] = useState("")
  const [cantidad, setcantidad] = useState(0)
  const [cantidad_bls, setcantidad_bls] = useState(0)
  const [eta, seteta] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault();
    toast.loading("Creando Motonave...",{
      style: { backgroundColor: "#204c74", color: "#fff" },
    })
    try {
      const motonave = await crearMotonave({
        nombre_motonave,
        cantidad,
        cantidad_bls,
        eta
      })
      if (!motonave.error) {
        toast.dismiss()
        toast.success(`${motonave.data.nombre_motonave} ${motonave.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
      }
      
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <form className="mb-2" onSubmit={handleSubmit}>     
         <h3>Anunciar Motonave</h3>
          <div className="mb-3">
            <label for="nombre_motonave" className="form-label">
                Nombre Motonave:
            </label>
            
            <input type="text" className="form-control inputs-general" required onChange={e => setnombre_motonave(e.target.value) } />
          </div>
          <div className="mb-3">
            <label for="cantidad" className="form-label">
                Cantidad:
            </label>
            <input type="number" className="form-control inputs-general" required onChange={e => setcantidad(e.target.value) } />
          </div>
          <div className="mb-3">
            <label for="cantidad_bls" className="form-label">
                Cantidad Bls:
            </label>
            <input type="number" className="form-control inputs-general" required onChange={e => setcantidad_bls(e.target.value) } />
          </div>
          <div className="mb-3">
            <label for="31 de enero de 2023" className="form-label">
                ETA
            </label>
            <input type="text" className="form-control inputs-general" required onChange={e => seteta(e.target.value) }/>
          </div>
          
          <button type="submit" className="boton-login">Crear</button>
          <Toaster position="top-right" />
        </form>
  )
}
