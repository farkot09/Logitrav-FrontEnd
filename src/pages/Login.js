import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../utils/usuarios";

export const Login = () => {
  const [usuario, setusuario] = useState("");
  const [password, setpassword] = useState("");
  
  
  useEffect(() => {
    const loggedUserJson = sessionStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const usuario = JSON.parse(loggedUserJson);
      setusuario(usuario.dataUser.usuario);
      setpassword(usuario.dataUser.password);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Cargando...", {
      style: { backgroundColor: "#204c74", color: "#fff" },
    });
      

    try {
      const user = await login({ usuario, password });
      if (!user.error) {
        sessionStorage.setItem("loggedUser", JSON.stringify(user.data));
        toast.success("User Valid", {
          style: { backgroundColor: "#204c74", color: "#fff" },
        });
        toast.success("Redirecting..", {
          style: { backgroundColor: "#204c74", color: "#fff" },
        });
        setTimeout(() => {
          toast.dismiss();
          window.location.reload(true)
        }, 3000);
      }

      if (user.error) {
        toast.error(user.message, {
          style: { backgroundColor: "#204c74", color: "#fff" },
        })
        setTimeout(() => {
          toast.dismiss();          
        }, 3000);
      }
    } catch (error) {
      
    }
  };
  return (
    <div className="row border d-flex align-items-center justify-content-center contenedor-paginas">
      <div className="col-12 col-sm-4">
        <form className="mb-2" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              <i className="bi bi-person"> usuario:</i>
            </label>

            <input
              type="text"
              className="form-control inputs-general"
              required
              onChange={(e) => setusuario(e.target.value)}
              value={usuario}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              <i className="bi bi-key"> Contraseña:</i>
            </label>
            <input
              type="password"
              className="form-control inputs-general"
              required
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              claclassNamess="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Recuerdame
            </label>
          </div>
          <button type="submit" className="boton-login">
            Login
          </button>
          <Toaster position="top-right" />
        </form>
      </div>
    </div>
  );
};
