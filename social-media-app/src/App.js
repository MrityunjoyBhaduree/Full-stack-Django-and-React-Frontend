import React from "react";
import {
  Route, 
  Routes
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Registration from "./pages/Registraion";
import Login from "./pages/login";


function App () {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/users/login/" element={<Login/>} />
      <Route path="/users/register/" element={<Registration />} />
    </Routes>
  );
}


export default App;
