import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import { useAuth } from "./contexts/AuthContext";

const Login = React.lazy(() => import("./components/Login/Login"));
const PetList = React.lazy(() => import("./components/PetList/PetList"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));

function App() {
  const { token } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (!token) {
      navigation("/login");
    } else {
      navigation("/pets");
    }
  }, [token, navigation]);

  return (
    <div className="wrapper">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pets" element={<PetList />} />
          <Route pat="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
