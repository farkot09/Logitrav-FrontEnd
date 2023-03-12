import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { eliminarChasisPlanilla, agregarChasisAPlanilla } from '../../utils/despachos';

export const DetallePlanilla = ({data,handle,handleAgregarChasis}) => {  
const [ifRender, setifRender] = useState(false)
const [dataChasis, setdataChasis] = useState([])
const [chasisFiltrado, setchasisFiltrado] = useState([])
const [chasisAgregar, setchasisAgregar] = useState("")
const [dataPlanilla, setdataPlanilla] = useState({})
useEffect(() => {
  if (data._id) {
    setdataPlanilla(data)
    setifRender(true)
    setdataChasis(JSON.parse(localStorage.getItem("dataChasis")))
  }
}, [data])

const handleEliminar = async (planilla,chasis, index) => {
  toast.loading(`Eliminando Chasis ${chasis}`,{
    style: { backgroundColor: "#204c74", color: "#fff" },
  })  
 
eliminarChasisPlanilla(planilla, {chasis}).then((res) => {
    if (res.error === false) {
      toast.dismiss()
      toast.success(`${chasis} Eliminado de ${planilla}`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })      
      handle(chasis)
    }
  }).catch((e) => {
    toast.dismiss()
      toast.error(`Error eliminando ${chasis}`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
  })
  
}

const handleChasisAgregar = async (chasisBuscar) => {
  let expresion = new RegExp(`${chasisBuscar}$`, "i");
  setchasisFiltrado(dataChasis.filter((data) => expresion.test(data.chasis)))
}

const fetchAgregar = async (data) => {
  await agregarChasisAPlanilla(data).then((res) => {
    if (res.error === false) {
      toast.dismiss()
      toast.success(`${res.message}`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
      handleAgregarChasis(data)
    }else{
      toast.dismiss()
      toast.error(`${data.chasis} ya se encuentra programado`,{
        style: { backgroundColor: "#204c74", color: "#fff" },
      })
    }
  })
}

const submitAgregar = async (data, origen) => {  
  toast.loading("Cargando...",{
    style: { backgroundColor: "#204c74", color: "#fff" },
  })
  if (origen === "button") {
      if (chasisFiltrado.length === 1) {        
        const objData = {
         planilla:dataPlanilla.records[0].planilla,
         chasis:chasisFiltrado[0].chasis
        }
        fetchAgregar(objData)
      } else{
        toast.dismiss()
        toast.error("Elija una Opcion...",{
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
      }
  
  }else if(origen === "div"){
    const objData = {
      planilla:dataPlanilla.records[0].planilla,
      chasis:data.chasis
     }
     fetchAgregar(objData)
  }
 
}

  return (
    <div className="row col-12 col-sm-12 m-1">
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
            <td>{dataPlanilla.records[0]?.conductor}</td>
            <td>{dataPlanilla.records[0]?.cedula}</td>
            <td>{dataPlanilla.records[0]?.placa}</td>
            <td>{dataPlanilla.records[0]?.planilla}</td>                
          </tr>
          {
            dataPlanilla?.records.map((chasis, index) => (
              <tr key={index}>
                
                <td colSpan={2}>{index+1 } - { chasis.chasis}</td>
                <td colSpan={2}><i className="bi bi-trash btn btn-danger" onClick={(e) => {
                  handleEliminar(dataPlanilla.records[0].planilla, chasis.chasis, index)
                  
                  }}></i></td>
              </tr>
            ))
          }
          <tr>            
            <td colSpan={2}><div class="input-group mb-3">
                <input onChange={(e) => handleChasisAgregar(e.target.value)} type="text" className="form-control" placeholder="Chasis a Buscar" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button onClick={(e) => submitAgregar("", e.target.localName)} class="btn btn-outline-success" type="button" id="button-addon2">Agregar</button>
              </div>  
            </td>   
            <td colSpan={2}> </td>             
          </tr>          
        </tbody>
        <tr colSpan={4}>
          {
            chasisFiltrado.length < 3 ?
            chasisFiltrado?.map((item) => (
              <div onClick={(e) => submitAgregar(item, e.target.localName)} className='col m-1 alert alert-success m-1'>{item.chasis}</div>
            ))
            :""
          }
        </tr>
        </table>
        :""
      }
      
      </div>
  )
}
