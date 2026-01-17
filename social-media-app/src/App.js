import React from "react";
import {
  Route, 
  Routes
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Registration from "./pages/Registraion";
import Login from "./pages/login";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";


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
      <Route path="/post/:postId/" element={
        <ProtectedRoute>
          <SinglePost />
        </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:profileId/"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:profileId/edit/"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}


export default App;
