import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ParallaxProvider } from "react-scroll-parallax";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <ParallaxProvider>
          <App />
        </ParallaxProvider>
    </BrowserRouter>
  </StrictMode>
);
