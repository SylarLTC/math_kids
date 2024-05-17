import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import { History } from "./pages/History";

function App() {
  const { currentUser } = useAuthContext();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/history",
      element: (
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
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
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
