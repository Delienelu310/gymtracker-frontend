import { apiClient } from "./ApiClient";

export function register(userDetails){
    return apiClient.post("/register", userDetails);
}

export function authenticate(username, password){
    const token = btoa(`${username}:${password}`);

    return apiClient.post("/authenticate", {
        headers: {
            Authorization: token
        }
    });
}

