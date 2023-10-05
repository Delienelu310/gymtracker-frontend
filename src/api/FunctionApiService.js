import { apiClient } from "./ApiClient";

export function retrievePublicFunctions(filteringResources){
    
    return apiClient.get("/public/functions")
        .then((response) => 
            response.data.filter((func) => {
                return filteringResources.users.length < 1 ||  filteringResources.users.includes(func.author.userId);
            })
        );
}

export function retrieveFunctionsCreated(filteringResources, {userId}){
    return apiClient.get(`/users/${userId}/functions/created`).then(response => response.data);
}

export function retrieveFunctionsFollowed(filteringResources, {userId}){
    return apiClient.get(`/users/${userId}/functions/followed`).then(response => response.data);
}


export function retrieveFunctionsAll(filteringResources, {userId}){
    console.log("User id: " + userId);
    return apiClient.get(`/users/${userId}/functions`).then(response => response.data);
}

export function retrieveFunctionsByExercise({userId, exerciseId}){
    return apiClient.get(`/users/${userId}/functions/exercise/${exerciseId}`);
}

export function retrievePublicFunctionById({functionId}){
    return apiClient.get(`/public/functions/${functionId}`);
}

export function retrievePrivateFunctionById({userId, functionId}){
    return apiClient.get(`/users/${userId}/functions/${functionId}`);
}

export function deleteFunctionById({userId, functionId}){
    return apiClient.delete(`/users/${userId}/functions/${functionId}`);
}

export function createFunction({userId}, functionDetails){
    return apiClient.post(`/users/${userId}/functions`, functionDetails);
}

export function updateFunction({userId, functionId}, functionDetails){
    return apiClient.put(`/users/${userId}/functions/${functionId}`, functionDetails);
}

//only for moderator
export function updateFunctionPublish({userId, functionId}){
    return apiClient.put(`/users/${userId}/functions/${functionId}/publish`);
}

export function updateFunctionUnpublish({userId, functionId}){
    return apiClient.put(`/users/${userId}/functions/${functionId}/unpublish`);
}
