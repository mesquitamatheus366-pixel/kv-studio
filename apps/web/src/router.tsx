import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./layouts/AppShell";
import { Repositorio } from "./pages/Repositorio";
import { BrandStudio } from "./pages/BrandStudio";
import { KvMaster } from "./pages/KvMaster";
import { SelecaoFormatos } from "./pages/SelecaoFormatos";
import { Wireframe } from "./pages/Wireframe";
import { DialogoIA } from "./pages/DialogoIA";
import { Revisao } from "./pages/Revisao";
import { Aprovacao } from "./pages/Aprovacao";
import { KonvaSpike } from "./pages/KonvaSpike";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/repositorio" replace /> },
      { path: "repositorio", element: <Repositorio /> },
      { path: "brand-studio", element: <BrandStudio /> },
      { path: "projeto/:id/kv", element: <KvMaster /> },
      { path: "projeto/:id/formatos", element: <SelecaoFormatos /> },
      { path: "projeto/:id/wireframe", element: <Wireframe /> },
      { path: "projeto/:id/dialogo", element: <DialogoIA /> },
      { path: "projeto/:id/revisao", element: <Revisao /> },
      { path: "projeto/:id/aprovacao", element: <Aprovacao /> },
      { path: "spike", element: <KonvaSpike /> },
    ],
  },
]);
