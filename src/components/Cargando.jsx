import React from "react";

export const Cargando = () => {
  return (
    <button class="btn " type="button" disabled>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Cargando...
    </button>
  );
};
