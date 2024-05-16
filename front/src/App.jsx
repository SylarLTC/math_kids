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
import { useState } from "react";

function App() {
  const [totalCorrects, setTotalCorrects] = useState({
    Sum: 0,
    Subtract: 0,
    Multiply: 0,
    Division: 0,
  });
  const [timeTable, setTimeTable] = useState({
    Addition: "00:00:00",
    Subtraction: "00:00:00",
    Multiplication: "00:00:00",
    Division: "00:00:00",
  });
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
          <Home
            totalCorrects={totalCorrects}
            setTotalCorrects={setTotalCorrects}
            timeTable={timeTable}
            setTimeTable={setTimeTable}
          />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/history",
      element: <History totalCorrects={totalCorrects} timeTable={timeTable} />,
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
