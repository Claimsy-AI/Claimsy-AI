import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./theme";
import { OnboardingProvider } from "./onboardingStore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
        <ThemeProvider>
          <OnboardingProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <App />
            </BrowserRouter>
          </OnboardingProvider>
        </ThemeProvider>
  </React.StrictMode>
);
