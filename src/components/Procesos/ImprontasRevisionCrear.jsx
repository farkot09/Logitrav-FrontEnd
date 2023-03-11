import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { crearRevision, obtenerRevisados, cargarPlantillaNumeracion, obtenerNumeracion } from "../../utils/procesos";
import { Cargando } from "../Cargando"


export const ImprontasRevisionCrear = ({ id_motonave, nombre_motonave }) => {
  const [dataChasis, setdataChasis] = useState([]);
  const [faltantes, setfaltantes] = useState([])
  const [chasisBuscar, setchasisBuscar] = useState("");
  const [id_usuario, setid_usuario] = useState(0);
  const [chasisRegistrado, setchasisRegistrado] = useState("");
  const [resultadoChasis, setresultadoChasis] = useState("");
  const [cantidadTotal, setcantidadTotal] = useState(0);
  const [revisado, setrevisado] = useState(0);
  const [ifcargando, setifcargando] = useState(false)
  const [file, setfile] = useState(null)
  const [change, setchange] = useState("")
  const [numero, setnumero] = useState(0)
  const [dataBl, setdataBl] = useState(0)

  useEffect(() => {
    setdataChasis(JSON.parse(localStorage.getItem("dataChasis")));
    setid_usuario(
      JSON.parse(sessionStorage.getItem("loggedUser")).dataUser._id
    );
    setcantidadTotal(localStorage.getItem("cantidad"));
    setrevisado(localStorage.getItem("revisado"));
  }, [change]);

  const handleSubmit = async (e) => {
    toast.loading("Registrando...", {
      style: { backgroundColor: "#204c74", color: "#fff" },
    });
    e.preventDefault();
    if (chasisBuscar.length <= 4) {
      toast.dismiss();
      return toast.error("ingrese mas Caracteres", {
        style: { backgroundColor: "#204c74", color: "#fff" },
      });
    }
    let expresion = new RegExp(`${chasisBuscar}$`, "i");
    const result = dataChasis.filter((data) => expresion.test(data.chasis));
    if (result.length > 1) {
      toast.dismiss();
      return toast.error("Mas de 1 opcion para el chasis Selecionado", {
        style: { backgroundColor: "#204c74", color: "#fff" },
      });
    } else if (result.length === 0) {
      toast.dismiss();
      return toast.error("No se encontro el chasis", {
        style: { backgroundColor: "#204c74", color: "#fff" },
      });
    }

    const newDescargue = {
      id_motonave: result[0].id_motonave._id,
      id_chasis: result[0]._id,
      id_usuario,
    };

    await obtenerNumeracion(newDescargue.id_chasis).then((res) => {
      if (res.error === false) {
        setnumero(res.data[0].numero)
        
      }
    })

    await crearRevision(newDescargue).then((res) => {
      toast.dismiss();
      if (res.error === false) {
        setresultadoChasis(result[0]);
        setdataBl(result[0].id_bl.numero_bl);
        toast.success(`${res.message}`, {
          style: { backgroundColor: "#204c74", color: "#fff" },
        });
        setchasisRegistrado(res.data);
        setdataChasis(dataChasis);
        localStorage.setItem("revisado", parseInt(revisado) + 1);
        setrevisado(parseInt(revisado) + 1);
        setchasisBuscar("");
      } else {
        toast.error(`${res.message}`, {
          style: { backgroundColor: "#204c74", color: "#fff" },
        });
      }
    });
  };

  const verfaltantes = async () => {
    setfaltantes([])
    setifcargando(true)
    let sinMarcar = []
    const marcacion = await obtenerRevisados(id_motonave)
    for (let index = 0; index < dataChasis.length; index++) {
      const element = dataChasis[index];
      const ifMarcacion = await marcacion.data.find(res => res.id_chasis === element._id)
      if (ifMarcacion === undefined) {
        sinMarcar.push(element)
      }
            
    }
   
    setfaltantes(sinMarcar)
    setifcargando(false)
    
  }

  const handleCargarArchivo = async (e) => {    
    setfile(e.target.files[0])
    
  }

  const handleSubirarchivo = async (e) => {      
    toast.loading("Cargando archivo...",{
      style: { backgroundColor: "#204c74", color: "#fff" },
    })           
    cargarPlantillaNumeracion(file).then((res) => {
      if (res.error === false) {
        toast.dismiss()
        toast.success(`${res.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
        setchange(new Date())              
      }else{
        toast.dismiss()
        toast.error(`${res.message}`,{
          style: { backgroundColor: "#204c74", color: "#fff" },
        }) 
        console.log(res);
        setchange(new Date())
      }
    })
      
  }

  return (
    <div className="row alert alert-danger">
      <div className="col-12 col-sm-6">
        <Toaster position="top-center" />
        <h3>Revision Improntas</h3>
        <form className={`mb-2 `} onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control input-sm inputs-general"
            value={nombre_motonave}
            disabled
          />
          <input
            autoFocus
            type="text"
            className="form-control input-sm inputs-general"
            value={chasisBuscar}
            placeholder="Chasis"
            onChange={(e) => setchasisBuscar(e.target.value)}
          />
          <input
            type="submit"
            className="form-control input-sm btn btn-success m-1"
            value="Regitrar"
          />
        </form>
        <button className="form-control input-sm btn btn-danger m-1" onClick={verfaltantes}>
          Ver Faltantes
        </button>
        <div className="input-group mb-3" >
        <input type="file" className="form-control m-1" onChange={handleCargarArchivo}  />         
        <button className="form-control btn btn-warning m-1" onClick={handleSubirarchivo}>
          Cargar
        </button>   
        </div>      
        
        {
          ifcargando ? <div className="row" > <Cargando /> </div> :""
        }
        {
          faltantes?.map((data,index) => (
            <div key={data._id} className="row alert alert-primary">
              <div className="col">{index+1}</div>
              <div className="col">{data.chasis}</div>
              <div className="col" >{data.modelo}</div>
            </div>
          ))
        }
      </div>
      <div className="col-12 col-sm-6">
        <div className="row">
          <div class="alert alert-success" role="alert">
            <p>Numero: {numero}</p>
            <p>Bl: {dataBl}</p>
            <p>Version: {resultadoChasis?.version}</p>
            <p>Chasis: {resultadoChasis?.chasis}</p>
            <p>Chasis: {resultadoChasis?.motor}</p>
            <p>Modelo: {resultadoChasis?.modelo}</p>
            <p>Ultimo Registrado: {chasisRegistrado.fecha}</p>
          </div>
          <div className="row">
            <div className="col alert alert-success m-1">
              Total
              <p> <h3>{cantidadTotal}</h3></p>
            </div>
            <div className="col alert alert-warning m-1">
              Revisados
              <p> <h3>{revisado}</h3></p>
            </div>
            <div className="col alert alert-danger m-1">
              Restantes
              <p><h3>{cantidadTotal - revisado}</h3></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};