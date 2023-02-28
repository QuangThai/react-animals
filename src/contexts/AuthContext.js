// AuthContext
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import tokenApi from "../api/tokenApi";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();

  const getToken = async () => {
    setIsLoading(true);
    try {
      const response = await tokenApi.getToken({
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      });
      setToken(response?.access_token);
      setIsLoading(false);
      navigation("/pets");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, getToken, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
