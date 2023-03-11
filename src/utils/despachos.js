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

  export const cargarProgramacion = async(data) => {
    var formData = new FormData()
    formData.append("miArchvo", data, data.name)      
    const res = await fetch(`${ruta}programacion/cargarProgramacion`, {
        method: "POST",
        headers: { 
            'Authorization': `Bearer ${token}`},
        body:formData       
            
      });
      const response = await res.json();      
      return response;
}

export const obtenerProgramado = async () => {    
  const res = await fetch(`${ruta}programacion`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",},      
  });
  const response = await res.json();
  return response;
};

export const agrupadosPlanilla = async (id) => {    
  const res = await fetch(`${ruta}programacion/agrupadosPlanilla`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",},      
  });
  const response = await res.json();
  return response;
};

export const eliminarChasisPlanilla = async (planilla,data) => {    
  const res = await fetch(`${ruta}programacion/eliminarChasis/${planilla}`, {
    method: "DELETE",
    headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",},
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return response;
};
