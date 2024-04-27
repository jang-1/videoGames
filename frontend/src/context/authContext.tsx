import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export interface IUser {
  email: string;
  id: number;
  role: string;
  username: string;
}

interface IAuthContext {
  currentUser: IUser | null;
  handleLogin: (inputs: any, setError: React.Dispatch<React.SetStateAction<string>>) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  handleLogin: () => {},
  handleLogout: () => {}
});

export const AuthContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const { login, logout } = useAuth();

  const handleLogin = (inputs: any, setError: React.Dispatch<React.SetStateAction<string>>) => {
    login.mutate(inputs, {
      onSuccess: (data) => {
        console.log(data);
        setCurrentUser(data.data);
        setError("");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setError("Logowanie nie powiodło się! Sprawdź dane logowania.");
      },
    });
  };

  const handleLogout = () => {
    logout.mutate({} as any, {
      onSuccess: () => {
        setCurrentUser(null);
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     localStorage.clear();
  //   }, 600000); // 10 minutes in milliseconds

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

