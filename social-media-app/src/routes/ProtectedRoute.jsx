import React from "react";
import { Navigate } from "react-router-dom";

import { getUser } from "../hooks/user.actions";


function ProtectedRoute({ children }) {
    const user = getUser();

    if (!user) {
        return <Navigate to="/users/login/" replace />
    }

    return children;
}


export default ProtectedRoute;