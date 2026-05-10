import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { router } from "./routes/router.tsx";

import "./styles/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />

    <ToastContainer
      position='top-center'
      autoClose={1800}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable={false}
      theme='colored'
      transition={Bounce}
    />
  </StrictMode>,
);
