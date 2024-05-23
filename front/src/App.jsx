import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import { History } from "./pages/History";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Header } from "./components/Header";

function App() {
  const { currentUser } = useAuthContext();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else if (currentUser.isVerified !== 1) {
      return <Navigate to="/verify-email" />;
    }

    return children;
  };

  const LayoutPage = () => {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/history",
          element: (
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "signup",
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
    {
      path: "login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "verify-email",
      element: <VerifyEmail />,
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
