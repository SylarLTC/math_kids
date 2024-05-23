import { createContext, useCallback, useEffect, useState } from "react";
import { axiosRequest } from "../utils/axiosConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = useCallback(async (inputs) => {
    await axiosRequest.post("/auth/register", inputs);
  }, []);

  const login = useCallback(async (inputs) => {
    const res = await axiosRequest.post("/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  }, []);

  const logout = useCallback(async () => {
    await axiosRequest.post("/auth/logout", { withCredentials: true });

    setCurrentUser(null);
  }, []);

  const updateCurrentUser = async (res) => {
    await setCurrentUser(res);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, updateCurrentUser, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
