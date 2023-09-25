import { apiClient } from "./ApiClient";

export function register(userDetails){
    return apiClient.post("/register", userDetails);
}

export async function authenticate(username, password){
    const token = 'Basic ' + btoa(`${username}:${password}`);
    console.log(token);

    let tempInterceptor = apiClient.interceptors.request.use((config) => {
        config.headers.Authorization=token;
        return config;
    });
    return apiClient.post("/authenticate").then(response => {
        console.log("During authentication:");
        console.log(tempInterceptor);
        apiClient.interceptors.request.eject(tempInterceptor);
        console.log(apiClient.interceptors);
        
        return response;
    });
}

