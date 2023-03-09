import { ruta } from "./ruta";
const token = JSON.parse(sessionStorage.getItem("loggedUser"))?.token

export const generarPlantilla = async(id) => {
    const res = await fetch(`${ruta}chasis/generarPlantilla/${id}`, {
        method: "GET",
        headers: { 
            'Authorization': `Bearer ${token}`},      
      });
      const response = await res.blob();
      return response;
}

export const cargarPlantillaChasis = async(data) => {
    var formData = new FormData()
    formData.append("miArchvo", data, data.name)      
    const res = await fetch(`${ruta}chasis/cargarChasis`, {
        method: "POST",
        headers: { 
            'Authorization': `Bearer ${token}`},
        body:formData       
            
      });
      const response = await res.json();      
      return response;
}

export const obtenerChasisPorMotonave = async(id) => {
    const res = await fetch(`${ruta}chasis/motonave/${id}`, {
        method: "GET",
        headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"},      
      });
      const response = await res.json();
      return response;
}