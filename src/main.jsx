import React from "react";
import ReactDOM from "react-dom/client";
import { bootstrapPortal } from "./runtime/bootstrap.js";
import App from "./ui/App.jsx";

bootstrapPortal();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
