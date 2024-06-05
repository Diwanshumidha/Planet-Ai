import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Navbar from "./components/shared/navbar.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div>
        <Navbar />
        <App />
      </div>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
