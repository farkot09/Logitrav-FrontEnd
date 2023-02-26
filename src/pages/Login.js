import React from "react";

export const Login = () => {
  return (
    <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
      <div className="col-12 col-sm-4">
        <form className="mb-2">     
         
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
            <i className="bi bi-person"> usuario:</i>
            </label>
            
            <input type="text" className="form-control inputs-general" id="usuario" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
            <i className="bi bi-key"> Contraseña:</i>
            </label>
            <input type="password" className="form-control inputs-general" id="password" />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              claclassNamess="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Recuerdame
            </label>
          </div>
          <button type="submit" className="boton-login">Login</button>
        </form>
      </div>
    </div>
  );
};
