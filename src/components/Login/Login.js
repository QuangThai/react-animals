import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";

function LoginForm() {
  const { getToken, isLoading } = useAuth();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <button className="btn btn-animation" onClick={getToken}>
          <span></span>
          <span></span>
          <span></span>
          <span>{isLoading ? "Loading..." : "Login"}</span>
        </button>
      </div>
    </>
  );
}

export default LoginForm;
