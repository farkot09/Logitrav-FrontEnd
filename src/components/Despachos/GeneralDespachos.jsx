import React from 'react'

export const GeneralDespachos = ({id_motonave, nombre_motonave}) => {
  return (
    <div className="row col-12 col-sm-12 m-2">
      <div className='row col-12 col-sm-6'>
      <button className='btn btn-warning m-1'>Descargar Plantilla Excel</button>
      <button className='btn btn-success m-1'>Cargar Plantilla de Programacion Excel</button>
      <button className='btn btn-primary m-1'>Cargar Plantilla de Numeros de Inventarios en Excel</button>
      </div>
      <div className='row col-12 col-sm-12'>
      <table className='table table-hover table-bordered'>
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
            <td>1184</td>
            <td>100</td>
            <td>12</td>
            <td><a className='btn btn-success' href={`/Despachos?ruta=VerProgramacion&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`}> <i class="bi bi-eye"></i></a> </td>
            <td><a className='btn btn-success' href={`/Despachos?ruta=VerNumerosInventarios&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} ><i class="bi bi-arrow-right-circle"></i></a> </td>
            <td><a className='btn btn-warning' href={`/Despachos?ruta=RegistrarNovedad&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} ><i class="bi bi-plus-circle-fill"></i></a> </td>
            <td><a className='btn btn-danger' ><i class="bi bi-newspaper"></i></a></td>
            
          </tr>
        </tbody>
      </table>
      </div>
      
      
    </div>
  )
}
