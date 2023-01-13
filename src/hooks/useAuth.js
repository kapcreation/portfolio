import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuth = () => {
  const value = useContext(AuthContext)
  return value
}

export default useAuth