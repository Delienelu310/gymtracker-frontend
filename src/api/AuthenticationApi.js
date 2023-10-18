import { apiClient } from "./ApiClient";

export function register(userDetails){
    return apiClient.post("/register", userDetails);
}

export async function authenticate(username, password){
    const token = 'Basic ' + btoa(`${username}:${password}`);


    let tempInterceptor = apiClient.interceptors.request.use((config) => {
        config.headers.Authorization=token;
        return config;
    });
    return apiClient.post("/authenticate").then(response => {


        apiClient.interceptors.request.eject(tempInterceptor);

        
        return response;
    });
}

