import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Cabecera } from "./components/Cabecera";
import { Login } from "./pages/Login";
import { Inicio } from "./pages/Inicio";
import { Motonaves } from "./pages/Motonaves";
import { Operaciones } from "./pages/Operaciones";
import { Bls } from "./pages/Bls";
import { Chasis } from "./pages/Chasis";
import { Procesos } from "./pages/Procesos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/Login",
    element: <Login />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/Inicio",
    element: <Inicio />,
  },
  {
    path: "/Motonaves",
    element: <Motonaves />,
  },
  {
    path: "/Operaciones",
    element: <Operaciones />,
  },
  {
    path: "/Bls",
    element: <Bls />,
  },
  {
    path: "/Chasis",
    element: <Chasis />,
  },
  {
    path: "/Procesos",
    element: <Procesos />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container-fluid contenedor-principal">
      <Cabecera />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
