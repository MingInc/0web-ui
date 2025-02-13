import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "remixicon/fonts/remixicon.css";

import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";

import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

import { RepoProvider } from "./contexts/RepoContext";

import {
  Home,
  Login,
} from "./pages";
import { Pricing } from "./pages/Pricing";
import NotFound from "./pages/NotFound.pages";
import { GithubCallback } from "./pages/GithubCallback.pages";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/github/callback",
    element: <GithubCallback />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RepoProvider>
      <RouterProvider router={router} />
      <Toaster />
      <Analytics />
    </RepoProvider>
  </AuthProvider>
);
