import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { eliminarChasisPlanilla } from '../../utils/despachos';

export const DetallePlanilla = ({data}) => {  
const [ifRender, setifRender] = useState(false)
const [chasisAgregar, setchasisAgregar] = useState("")
useEffect(() => {
  if (data._id) {
    setifRender(true)
  }
}, [data])

const handleEliminar = async (planilla,chasis) => {
  toast.loading(`Eliminando Chasis ${chasis}`,{
    style: { backgroundColor: "#204c74", color: "#fff" },
  })
  eliminarChasisPlanilla(planilla, {chasis}).then((res) => {
    if (res.error === false) {
      toast.dismiss()
      toast.success(`${chasis} Eliminado de ${planilla}`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
    }
  }).catch((e) => {
    toast.dismiss()
      toast.error(`Error eliminando ${chasis}`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
  })
}

  return (
    <div className="row col-12 col-sm-12 m-2">
      <Toaster position="top-center" />
      {
        ifRender 
        ? <table className='table table-hover table-bordered text-center'>
        <thead>
            <tr>
                <th>Conductor</th>
                <th>Cedula</th>
                <th>Placa</th>                    
                <th>Planilla</th>                    
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.records[0].conductor}</td>
            <td>{data.records[0].cedula}</td>
            <td>{data.records[0].placa}</td>
            <td>{data.records[0].planilla}</td>                
          </tr>
          {
            data?.records.map((chasis, index) => (
              <tr key={index}>
                <td colSpan={2}>{chasis.chasis}</td>
                <td colSpan={2}><i className="bi bi-trash btn btn-danger" onClick={() => {handleEliminar(data.records[0].planilla, chasis.chasis)}}></i></td>
              </tr>
            ))
          }
          <tr>
            <td colSpan={2}> <input type="text" className='form-control input-sm inputs-general'/> </td>
            <td colSpan={2}> <button className='btn btn-success' >Agregar</button> </td>                
          </tr>
        </tbody>
        </table>
        :""
      }
      
      </div>
  )
}
