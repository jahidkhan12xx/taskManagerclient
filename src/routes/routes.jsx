import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Task from "../pages/Task";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import TaskDetails from "../pages/TaskDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/task/:id",
        element: <TaskDetails />,
      },
    ],
  },
]);
export default routes;
