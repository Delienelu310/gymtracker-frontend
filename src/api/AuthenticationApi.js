import { apiClient } from "./ApiClient";

export function register(userDetails){
    return apiClient.post("/register", userDetails);
}

export function authenticate(username, password){
    const token = 'Basic ' + btoa(`${username}:${password}`);
    console.log(token);
    apiClient.interceptors.request.use(
        (config) => {
            console.log("Inside: " + token);
            config.headers.Authorization=token;
            return config;
        }
    );
    return apiClient.post("/authenticate");
}

