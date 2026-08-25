import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // LOGIN
  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;