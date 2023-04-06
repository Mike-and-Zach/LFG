import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.js"
import { createRoot } from "react-dom/client"

const root = createRoot(document.querySelector("#root"));
root.render(<BrowserRouter><App /></BrowserRouter>);