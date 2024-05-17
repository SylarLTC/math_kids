import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContextProvider } from "./contexts/ToastContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { TimeTableContextProvider } from "./contexts/TimeTableContext";
import { TotalCorrectsContextProvider } from "./contexts/TotalCorects";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TotalCorrectsContextProvider>
        <TimeTableContextProvider>
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </TimeTableContextProvider>
      </TotalCorrectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
