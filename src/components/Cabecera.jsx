import React from "react";
import { Logo } from "./Logo";
import {Menu} from "./Menu"

export const Cabecera = () => {
  return (
    <div className="p-0 m-0">
      <div className="row ">
        <div className="container-logo col-12 col-sm-6 d-flex align-items-end p-0 m-0 ">
          <Logo />
        </div>
        <div className="col-12 col-md-6 container-cabecera align-items-end justify-content-end m-0 p-0">
          <div>
            <p></p>
          </div>
          <div>
            <p className="titulo-logo">Logitrav</p>
          </div>
          <div>
            <p className="subtitulo-logo">Logistica Y Trabailidad Vehicular</p>
          </div>
          <div>
            <p className="subtitulo-logo">
              Esta registrado como: viktorgrajales | Cambiar Contraseña | Salir
            </p>
          </div>
        </div>
      </div>
      <div className="row divisor">
        <Menu />
      </div>
    </div>
  );
};
