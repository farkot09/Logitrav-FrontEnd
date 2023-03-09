import React, { useEffect, useState } from "react";
import { obtenerBlsPorMotonave, crearBls } from "../../../utils/bls";
import { obtenerMotonaveId } from "../../../utils/motonaves";
import toast, { Toaster } from "react-hot-toast";
import { Cargando } from "../../Cargando";

export const CrearBls = ({ id_motonave, handlecambio }) => {
  const [BlsData, setBlsData] = useState(null);
  const [MotonaveData, setMotonaveData] = useState(null);
  const [numero_bl, setnumeroBls] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [marca, setmarca] = useState("");
  const [transporte, settransporte] = useState("LOGIVECO");
  const [condicion, setcondicion] = useState("NACIONALIZADO");
  const [blCreado, setblCreado] = useState("");

  let totalCantidadEnBls = 0;
  let displayForm = "";

  for (let index = 0; index < BlsData?.length; index++) {
    totalCantidadEnBls += BlsData[index].cantidad;
  }

 // if (BlsData?.length === MotonaveData.cantidad_bls && totalCantidadEnBls === MotonaveData.cantidad) {
   // displayForm = "d-none";
  //}

  useEffect(() => {
    obtenerMotonaveId(id_motonave).then((res) => {
      if (res.error === false) {
        setMotonaveData(res.data);
      }
    });

    obtenerBlsPorMotonave(id_motonave).then((res) => {
      if (res.error === false) {
        setBlsData(res.data);
      }
    });
  }, [blCreado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Cargando...", {
      style: { backgroundColor: "#204c74", color: "#fff" },
    });
    const newBls = {
      id_motonave,
      numero_bl,
      cantidad,
      marca,
      transporte,
      condicion,
    };

    const res = await crearBls(newBls);
    if (res.error === false) {
      toast.dismiss();
      toast.success(`${numero_bl} ${res.message}`, {
        style: { backgroundColor: "#204c74", color: "#fff" },
      });
      setblCreado(numero_bl);
      handlecambio(numero_bl);
    }
  };

  return (
    <div className="row">
      {MotonaveData && BlsData ? (
        <div className="col-12 col-sm-6">
          <label>
            Agregar Bls para: <h2>{MotonaveData.nombre_motonave}</h2>{" "}
          </label>
          {
            BlsData?.length === MotonaveData.cantidad_bls && totalCantidadEnBls === MotonaveData.cantidad 
            ?""
            : <form className="mb-2" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control input-sm inputs-general"
              value={id_motonave}
              disabled
            />
            <input
              type="text"
              className="form-control input-sm inputs-general"
              placeholder="Numero Bl"
              onChange={(e) => setnumeroBls(e.target.value)}
              required
            />
            <input
              type="number"
              className="form-control input-sm inputs-general"
              placeholder="Cantidad"
              onChange={(e) => setcantidad(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control input-sm inputs-general"
              placeholder="Marca"
              onChange={(e) => setmarca(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control input-sm inputs-general"
              placeholder="Transporte"
              onChange={(e) => settransporte(e.target.value)}
              value={transporte}
              required
            />
            <input
              type="radio"
              className="form-check-input"
              value="NACIONALIZADO"
              name="condicion"
              checked
              onChange={(e) => setcondicion(e.target.value)}
            />
            <label>Nacionalizado</label>
            <input
              type="radio"
              className="form-check-input"
              value="DTA"
              name="condicion"
              onChange={(e) => setcondicion(e.target.value)}
            />
            <label>DTA</label>

            <input type="submit" className="form-control input-sm " />
            <Toaster position="top-right" />
          </form>
          }
         
        </div>
      ) : (
        <Cargando />
      )}
      {MotonaveData && BlsData ? (
        <div className="col-12 col-sm-6">
          <h3>
            {BlsData.length} de {MotonaveData.cantidad_bls} Bls Ingresados
          </h3>
          <h3>
            {totalCantidadEnBls} de {MotonaveData.cantidad} Vehiculos Anunciados
          </h3>
        </div>
      ) : (
        <Cargando />
      )}
    </div>
  );
};
