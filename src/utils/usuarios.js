import {ruta} from "./ruta"

export const login = async(data) => {    
    const res = await fetch(`${ruta}usuarios/login`,{method:"POST",headers: {"Content-Type": "application/json",},body: JSON.stringify(data)})
    const response = await res.json()
    return response
}