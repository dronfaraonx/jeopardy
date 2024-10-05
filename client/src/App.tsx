import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/Context/auth";

import Layout from "./components/Layout";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/Auth/Login";
import RegistrationPage from "./components/Auth/Registration";
import Board from "./components/Board/Board";

function App() {
  // const [user, setUser] = useState()
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/registration",
          element: <RegistrationPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/game",
          element: <Board />,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
