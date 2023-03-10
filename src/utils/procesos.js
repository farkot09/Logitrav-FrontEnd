import { ruta } from "./ruta";
const token = JSON.parse(sessionStorage.getItem("loggedUser"))?.token

export const crearMarcacion = async (data) => {    
    const res = await fetch(`${ruta}operaciones/marcacion`, {
      method: "POST",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  };

  export const obtenerMarcacion = async (id) => {    
    const res = await fetch(`${ruta}operaciones/marcacion/motonave/${id}`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},      
    });
    const response = await res.json();
    return response;
  };

