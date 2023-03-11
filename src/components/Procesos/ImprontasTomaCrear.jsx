import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { obtenerTomados, crearTomados } from "../../utils/procesos";
import { Cargando } from "../Cargando"


export const ImprontasTomaCrear = ({ id_motonave, nombre_motonave }) => {
  const [dataChasis, setdataChasis] = useState([]);
  const [faltantes, setfaltantes] = useState([])
  const [chasisBuscar, setchasisBuscar] = useState("");
  const [id_usuario, setid_usuario] = useState(0);
  const [chasisRegistrado, setchasisRegistrado] = useState("");
  const [resultadoChasis, setresultadoChasis] = useState("");
  const [cantidadTotal, setcantidadTotal] = useState(0);
  const [tomado, settomado] = useState(0);
  const [ifcargando, setifcargando] = useState(false)

  useEffect(() => {
    setdataChasis(JSON.parse(localStorage.getItem("dataChasis")));
    setid_usuario(
      JSON.parse(sessionStorage.getItem("loggedUser")).dataUser._id
    );
    setcantidadTotal(localStorage.getItem("cantidad"));
    settomado(localStorage.getItem("tomado"));
  }, []);

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

    await crearTomados(newDescargue).then((res) => {
      toast.dismiss();
      if (res.error === false) {
        setresultadoChasis(result[0]);
        toast.success(`${res.message}`, {
          style: { backgroundColor: "#204c74", color: "#fff" },
        });
        setchasisRegistrado(res.data);
        setdataChasis(dataChasis);
        localStorage.setItem("tomado", parseInt(tomado) + 1);
        settomado(parseInt(tomado) + 1);
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
    const marcacion = await obtenerTomados(id_motonave)
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

  return (
    <div className="row alert alert-warning">
      <div className="col-12 col-sm-6">
        <Toaster position="top-center" />
        <h3>Toma de Improntas</h3>
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
            <p>Ultimo Registrado: {chasisRegistrado.fecha}</p>
            <p>Chasis: {resultadoChasis?.chasis}</p>
            <p>Modelo: {resultadoChasis?.modelo}</p>
            <p>Version: {resultadoChasis?.version}</p>
          </div>
          <div className="row">
            <div className="col alert alert-success m-1">
              Total
              <p>{cantidadTotal}</p>
            </div>
            <div className="col alert alert-warning m-1">
              Descargados
              <p>{tomado}</p>
            </div>
            <div className="col alert alert-danger m-1">
              Restantes
              <p>{cantidadTotal - tomado}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

