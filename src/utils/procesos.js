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


  export const crearDescargue = async (data) => {    
    const res = await fetch(`${ruta}operaciones/recibo`, {
      method: "POST",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  };

  export const obtenerDescargue = async (id) => {    
    const res = await fetch(`${ruta}operaciones/recibo/motonave/${id}`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},      
    });
    const response = await res.json();
    return response;
  };

  export const obtenerTomados = async (id) => {    
    const res = await fetch(`${ruta}operaciones/toma/motonave/${id}`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},      
    });
    const response = await res.json();
    return response;
  };

  export const crearTomados = async (data) => {    
    const res = await fetch(`${ruta}operaciones/toma`, {
      method: "POST",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  };


  export const obtenerRevisados= async (id) => {    
    const res = await fetch(`${ruta}operaciones/revision/motonave/${id}`, {
      method: "GET",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},      
    });
    const response = await res.json();
    return response;
  };

  export const crearRevision = async (data) => {    
    const res = await fetch(`${ruta}operaciones/revision`, {
      method: "POST",
      headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",},
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  };

  export const cargarPlantillaNumeracion = async(data) => {
    var formData = new FormData()
    formData.append("miArchvo", data, data.name)      
    const res = await fetch(`${ruta}operaciones/cargarNumeracion`, {
        method: "POST",
        headers: { 
            'Authorization': `Bearer ${token}`},
        body:formData       
            
      });
      const response = await res.json();      
      return response;
}

export const obtenerNumeracion = async (id) => {    
  const res = await fetch(`${ruta}operaciones/numeracion/${id}`, {
    method: "GET",
    headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",},      
  });
  const response = await res.json();
  return response;
};


