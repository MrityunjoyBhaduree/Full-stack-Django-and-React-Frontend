import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"


const axiosService = axios.create({
    baseURL: "https://full-stack-django-and-react-backend.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosService.interceptors.request.use(async (config) => {
    /**
     *  Retrieving the access token from the localStorage
     * and adding it to the headers of the request
     */

    const {access} =
    JSON.parse(localStorage.getItem("auth"));
    config.headers.Authorization = `Bearer ${access}`;
    return config
});

axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
);

const resfresAuthLogic = async (failedRequest) => {
    const { refresh } = 
    JSON.parse(localStorage.getItem("auth"));
    return axios
    .post("/users/refresh/token", null, {
        baseURL: "https://full-stack-django-and-react-backend.onrender.com",
        headers: {
            Authorization: `Bearrer ${refresh}`,
        },
    })
    .then((resp) => {
        const {access, refresh} = resp.data;
        failedRequest.response.config.headers[
            "Authorization"
        ] = "Bearer " + access;
        localStorage.setItem("auth", JSON.stringify({
            access, refresh
        }));
    })
    .catch(() => {
        localStorage.removeItem("auth")
    });
};

createAuthRefreshInterceptor(axiosService, resfresAuthLogic);

export function fetcher(url) {
    return axiosService.get(url).then((res) => res.data);
}

export default axiosService;