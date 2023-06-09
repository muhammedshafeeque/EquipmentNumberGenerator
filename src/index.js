import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import EquipmentProvider from "./Context/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <EquipmentProvider>
          <App />
        </EquipmentProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
