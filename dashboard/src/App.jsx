import "./App.css";
import {
  createBrowserRouter,
  RouterProvider, 
} from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/ui/DashboardLayout";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import AddUser from "./pages/AddUser";
import UserList from "./pages/UserList";
import EditProduct from "./pages/EditProduct";
import EditUser from "./pages/EditUser";
import AddCollection from "./pages/AddCollection";
import { Toaster } from "./components/ui/toast";

const router = createBrowserRouter([
   {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "addcollection",
        element: <AddCollection />,
      },
      {
        path: "productlist",
        element: <ProductList />,
      },
      {
        path: "editproduct/:id",
        element: <EditProduct />,
      },
      {
        path: "adduser",
        element: <AddUser />,
      },
      {
        path: "userlist",
        element: <UserList />,
      },
      {
        path: "edituser/:id",
        element: <EditUser />,
      },
    ],
  },
]);

function App() {
  return (
    <Toaster>
      <RouterProvider router={router} />
    </Toaster>
  );
}

export default App;
