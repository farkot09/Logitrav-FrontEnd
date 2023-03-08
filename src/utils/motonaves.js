import { ruta } from "./ruta";
const token = JSON.parse(sessionStorage.getItem("loggedUser")).token

export const crearMotonave = async (data) => {    
  const res = await fetch(`${ruta}motonaves`, {
    method: "POST",
    headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",},
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return response;
};

export const listarMotonaves = async () => {
    const res = await fetch(`${ruta}motonaves`, {
        method: "GET",
        headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",}
        
      });
      const response = await res.json();
      return response;
}

export const actualizarMotonave = async (data) => {
    const res = await fetch(`${ruta}motonaves/${data.id_motonave}`, {
        method: "PATCH",
        headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",},
            body: JSON.stringify(data),        
      });
      const response = await res.json();
      return response;
}

export const obtenerMotonaveId = async (id) => {
  const res = await fetch(`${ruta}motonaves/${id}`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",}       
    });
    const response = await res.json();
    return response;
}

export const eliminarMotonave = async (id) => {
  const res = await fetch(`${ruta}motonaves/${id}`, {
      method: "DELETE",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",}       
    });
    const response = await res.json();
    return response;
}

export const motonavesActivas = async () => {
  const res = await fetch(`${ruta}motonaves/activas`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",}
      
    });
    const response = await res.json();
    return response;
}