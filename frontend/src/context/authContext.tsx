import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export type Inputs = {
  name: string
  email: string
  password: string
}

export interface IUser {
  email: string;
  id: number;
  role: string;
  username: string;
}

interface IAuthContext {
  currentUser: IUser | null;
  handleLogin: (inputs: Inputs, setError: React.Dispatch<React.SetStateAction<string | null>>) => void;
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

  const handleLogin = (inputs: Inputs, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    login.mutate(inputs, {
      onSuccess: (data) => {
        console.log(data);
        setCurrentUser(data.data);
        setError(null);
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setError("Logowanie nie powiodło się! Sprawdź dane logowania.");
      },
    });
  };

  const handleLogout = () => {
    logout.mutate((undefined), {
      onSuccess: () => {
        setCurrentUser(null);
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      handleLogout();
    }, 600000); // 10 minutes in milliseconds
  };

  let logoutTimer: number;

  useEffect(() => {
    resetLogoutTimer();

    const events = ["mousemove", "keydown", "scroll"];
    const resetTimer = () => {
      resetLogoutTimer();
    };

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      clearTimeout(logoutTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

