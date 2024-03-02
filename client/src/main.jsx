import React from "react";
import ReactDOM from "react-dom/client";
// Removed BrowserRouter import since it's no longer used here for Github deploy, else add it again.
import { AppProvider } from "./context/AppContext.context.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Removed BrowserRouter wrapper for Github, else add it back */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);