/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export const Menu = () => {
  return (
    <div className="container">
      <div className="btn-group">
        <button
          type="button"
          className=" dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Motonaves
        </button>
        <ul className="dropdown-menu">
          <li>
            
            <a className="dropdown-item" href="/Motonaves?ruta=CrearMotonave">
              Anunciar
            </a>
          </li>
          <li>
          <hr className="dropdown-divider" />
            <a className="dropdown-item" href="/Motonaves?ruta=ListarMotonaves">
              Listado
            </a>
          </li>
          <li>
          <hr className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              Selecionar
            </a>
          </li>          
        </ul>
      </div>
    </div>
  );
};
