import React from 'react'

export const RegistrarNovedad = ({id_motonave, nombre_motonave}) => {
    return (
        <div className="row">
          <div className="col-12 col-sm-6">
              <h3>Revision de Improntas</h3>
              <form className={`mb-2 `}>
              <input type="text" id='id_motonave' className="form-control input-sm inputs-general" value={id_motonave}  disabled />
              <input type="text" className="form-control input-sm inputs-general" value={nombre_motonave}  disabled />
              <input type="text" className="form-control input-sm inputs-general" placeholder="Chasis" />         
              <textarea   className="form-control input-sm inputs-general" placeholder="novedad" />         
              
              <input type="submit" className="form-control input-sm btn btn-success m-1" value="Regitrar" />
              
            </form>
          </div>
          <div className="col-12 col-sm-6">        
            123
          </div>
        </div>
      )
}