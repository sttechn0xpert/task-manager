import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import system from "./common/theme/theme";
import { TaskProvider } from "./common/context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
