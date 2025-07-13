import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ParallaxProvider } from "react-scroll-parallax";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll.tsx";
import ModelViewer from "./components/ModelViewer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <ParallaxProvider>
          <SmoothScroll />
          <ModelViewer />
          <App />
        </ParallaxProvider>
    </BrowserRouter>
  </StrictMode>
);
