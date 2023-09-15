import { apiClient } from "./ApiClient";

export function retrievePublicFunctions(filteringResources){
    
    return apiClient.get("/public/functions")
        .then((response) => 
            response.data.filter((func) => {
                return filteringResources.users.includes(func.author.username);
            })
        );
}

export function retrieveFunctionsCreated(userId){
    return apiClient.get(`/users/${userId}/functions/created`);
}

export function retrieveFunctionsFollowed(userId){
    return apiClient.get(`/users/${userId}/functions/followed`);
}


export function retrieveFunctionsAll(userId){
    return apiClient.get(`/users/${userId}/functions`);
}

export function retrieveFunctionsByExercise(userId, exerciseId){
    return apiClient.get(`/users/${userId}/functions/exercise/${exerciseId}`);
}

export function retrievePublicFunctionById({functionId}){
    return apiClient.get(`/public/functions/${functionId}`);
}

export function retrievePrivateFunctionById({userId, functionId}){
    return apiClient.get(`/users/${userId}/functions/${functionId}`);
}

export function deleteFunctionById(userId, functionId){
    return apiClient.delete(`/users/${userId}/functions/${functionId}`);
}

export function createFunction({userId}, functionDetails){
    return apiClient.post(`/users/${userId}/functions`, functionDetails);
}

export function updateFunction(userId, functionId, functionDetails){
    return apiClient.put(`/users/${userId}/functions/${functionId}`, functionDetails);
}

//only for moderator
export function updateFunctionPublish(userId, functionId){
    return apiClient.put(`/users/${userId}/functions/${functionId}/publish`);
}

export function updateFunctionUnpublish(userId, functionId){
    return apiClient.put(`/users/${userId}/functions/${functionId}/unpublish`);
}
