
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
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

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./lib/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <div>Welcome to Dashboard</div>,
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
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <Toaster>
        <RouterProvider router={router} />
      </Toaster>
    </AuthProvider>
  );
}

export default App;
