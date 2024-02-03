import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home/> },
      { path: "/users", element: <Users/> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
