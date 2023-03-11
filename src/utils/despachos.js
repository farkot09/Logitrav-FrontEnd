import { ruta } from "./ruta";
const token = JSON.parse(sessionStorage.getItem("loggedUser"))?.token

export const obtenerDespachos = async (id) => {    
    const res = await fetch(`${ruta}despachos/motonave/${id}`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},      
    });
    const response = await res.json();
    return response;
  };