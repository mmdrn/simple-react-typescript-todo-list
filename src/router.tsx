import { createBrowserRouter } from "react-router-dom";
import Signin from "./routes/Auth/Signin";
import Signup from "./routes/Auth/Signup";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;