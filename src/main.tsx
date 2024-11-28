import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherApp from "./pages/WeatherPage/WeatherPage";
import "./globalStyles.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <WeatherApp />
    <ToastContainer />
  </StrictMode>
);
