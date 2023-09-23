import { apiClient } from "./ApiClient";

export function retrievePublicUsers(){
    return apiClient.get("/public/users")
        .then(response => response.data);
}

export function retrievePublicUserById({userId}){
    return apiClient.get(`/public/users/${userId}`);
}

export function retrievePublicUserByUsername({username}){
    return apiClient.get(`/public/users/username/${username}`);
}

export function retrieveFollowersOfExercise({exerciseId}){
    return apiClient.get(`/public/exercise/${exerciseId}/followers`);
}

export function retrieveFollowersOfFunction({functionId}){
    return apiClient.get(`/public/function/${functionId}/followers`);
}

export function retrievePrivateUserById({userId}){
    return apiClient.get(`/users/${userId}`);
}

export function retrievePrivateUserByUsername({username}){
    return apiClient.get(`/users/username/${username}`);
}

export function deleteUserById(userId){
    return apiClient.delete(`/users/${userId}`);
}

export function updateUser({userId}, userDetails){
    return apiClient.put(`/users/${userId}`, userDetails);
}

export function followExercise({userId, exerciseId}){
    return apiClient.put(`users/${userId}/following/exercises/add/${exerciseId}`);
}

export function unfollowExercise({userId, exerciseId}){
    return apiClient.put(`users/${userId}/following/exercises/add/${exerciseId}`);
}

export function followFunction({userId, functionId}){
    return apiClient.put(`users/${userId}/following/functions/add/${functionId}`);
}

export function unfollowFunction({userId, functionId}){
    return apiClient.put(`users/${userId}/following/functions/add/${functionId}`);
}



export function updateUserPublish(userId){
    return apiClient.put(`/users/${userId}/publish`);
}

export function updateUserUnpublish(userId){
    return apiClient.put(`/users/${userId}/unpublish`);
}
