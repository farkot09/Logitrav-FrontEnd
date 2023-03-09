import { ruta } from "./ruta";
const token = JSON.parse(sessionStorage.getItem("loggedUser"))?.token

export const crearBls = async (data) => {    
    const res = await fetch(`${ruta}bls`, {
      method: "POST",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  };

  export const obtenerBlsPorMotonave = async (id) => {    
    const res = await fetch(`${ruta}bls/motonave/${id}`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",}      
    });
    const response = await res.json();
    return response;
  };

  export const editarBls = async (data) => {    
    const res = await fetch(`${ruta}bls/${data._id}`, {
      method: "PATCH",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  };

  export const eliminarBls = async (id) => {    
    const res = await fetch(`${ruta}bls/${id}`, {
      method: "DELETE",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},      
    });
    const response = await res.json();
    return response;
  };