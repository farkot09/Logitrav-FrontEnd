import React, { useEffect, useState } from "react";
import { crearMarcacion } from "../../utils/procesos";
import toast, { Toaster } from "react-hot-toast";

export const MarcacionCrear = ({ id_motonave, nombre_motonave }) => {
  const [dataChasis, setdataChasis] = useState([]);
  const [chasisBuscar, setchasisBuscar] = useState("");
  const [id_usuario, setid_usuario] = useState(0);
  const [chasisRegistrado, setchasisRegistrado] = useState("");
  const [resultadoChasis, setresultadoChasis] = useState("");
  const [cantidadTotal, setcantidadTotal] = useState(0);
  const [marcados, setmarcados] = useState(0);

  useEffect(() => {
    setdataChasis(JSON.parse(localStorage.getItem("dataChasis")));
    setid_usuario(
      JSON.parse(sessionStorage.getItem("loggedUser")).dataUser._id
    );
    setcantidadTotal(localStorage.getItem("cantidad"));
    setmarcados(localStorage.getItem("marcados"));
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

    const newMarcacion = {
      id_motonave: result[0].id_motonave._id,
      id_chasis: result[0]._id,
      id_usuario,
    };

    await crearMarcacion(newMarcacion).then((res) => {
      toast.dismiss();
      if (res.error === false) {
        setresultadoChasis(result[0]);
        toast.success(`${res.message}`, {
          style: { backgroundColor: "#204c74", color: "#fff" },
        });
        setchasisRegistrado(res.data);
        setdataChasis(dataChasis);
        localStorage.setItem("marcados", parseInt(marcados) + 1);
        setmarcados(parseInt(marcados) + 1);
        setchasisBuscar("");
      } else {
        toast.error(`${res.message}`, {
          style: { backgroundColor: "#204c74", color: "#fff" },
        });
      }
    });
  };

  return (
    <div className="row">
      <div className="col-12 col-sm-6">
        <Toaster position="top-center" />
        <h3>Marcacion a Bordo</h3>
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
        <button className="form-control input-sm btn btn-danger m-1">
          Ver Faltantes
        </button>
      </div>
      <div className="col-12 col-sm-6">
        <div className="row">
          <div class="alert alert-success" role="alert">
            <p>Ultimo Registrado: {chasisRegistrado.fecha}</p>
            <p>Chasis: {resultadoChasis?.chasis}</p>
            <p>Modelo: {resultadoChasis?.modelo}</p>
            <p>Vercion: {resultadoChasis?.version}</p>
          </div>
          <div className="row">
            <div className="col alert alert-success m-1">
              Total
              <p>{cantidadTotal}</p>
            </div>
            <div className="col alert alert-warning m-1">
              Registrados
              <p>{marcados}</p>
            </div>
            <div className="col alert alert-danger m-1">
              Restantes
              <p>{cantidadTotal - marcados}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
