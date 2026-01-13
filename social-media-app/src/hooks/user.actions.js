import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/api";



function useUserActions() {
    const navigate = useNavigate();


    return {
        login,
        register,
        logout,
    };


    // Login the user
    function login(data) {
        return axios.post(`${BASE_URL}/users/login/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/");
        });
    }

    // Register the user
    function register(data) {
            return axios.post(`${BASE_URL}/users/register/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/");
        });
    }


    // Logout the user
    function logout() {
        localStorage.removeItem("auth");
        navigate("/users/login/");
    }

}


// ====== HELPERS =======

// Get the user
function getUser() {
    // const auth = localStorage.getItem("auth");
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth?.user || null;
}

// Get the access token
function getAccessToken() {
    // const auth = localStorage.getItem("auth");
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth?.access || null;
}

// Get the refresh token
function getRefreshToken() {
    // const auth = localStorage.getItem("auth");
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth?.refresh || null;
}

// Set the access, token and user property
function setUserData(data) {
    localStorage.setItem(
        "auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user
        })
    );
}


export { useUserActions, getUser, getAccessToken, getRefreshToken}