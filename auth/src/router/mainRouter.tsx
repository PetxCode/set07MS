import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import SignIn from "../pages/auth/SignIn";
import PrivateRoute from "./privateRoute";
import HomePage from "../pages/home/HomePage";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);
