import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProvider from "./AppProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);

reportWebVitals();
