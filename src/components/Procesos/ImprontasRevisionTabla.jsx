import React from 'react'

export const ImprontasRevisionTabla = ({id_motonave, nombre_motonave}) => {
  return (
    <div className="row col-12 col-sm-12 m-2">
      <a class="btn btn-success" href={`Procesos?ruta=CrearRevisionImprontas&id_motonave=${id_motonave}&nombre_motonave=${nombre_motonave}`} >Revision de Improntas</a>
      <table class="table table-hover table-condensed table-bordered">
        <tbody>
          <tr>
            <td>Vehiculos Anunciados</td>
            <td>Improntas Revisadas</td>
            <td>Restantes</td>
            <td className="no-mostrar">Fecha y Hora Ultima Sincronizacion</td>
          </tr>
          <tr>
            <td>1182</td>
            <td>0</td>
            <td>1182</td>
            <td className="no-mostrar"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
