import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
// import axios from "../api/axiosCreate";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || 'null')
  );


  const { login, logout } = useAuth();

  const handleLogin = (inputs:any, setError: React.Dispatch<React.SetStateAction<string>>) => {
    login.mutate(inputs, {
      onSuccess: (data) => {
        console.log(data)
        setCurrentUser(data.data); // Assuming the response has a `data` object
        setError(''); // Czyść błąd przy udanym logowaniu
      },
      onError: (error) => {
        console.error('Login failed:', error);
        setError('Logowanie nie powiodło się! Sprawdź dane logowania.');
      }
    });
  };

  const handleLogout = () => {
    logout.mutate({} as any, {
      onSuccess: () => {
        setCurrentUser(null);
      },
      onError: (error) => {
        console.error('Logout failed:', error);
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout  }}>
      {children}
    </AuthContext.Provider>
  );
};
