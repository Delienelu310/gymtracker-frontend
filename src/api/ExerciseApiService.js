import { apiClient } from "./ApiClient";

function filterExerciseByFunctions(functions, exercise){
    let doesContainFunction = functions.length == 0;
    for(let func of exercise.functions){
        if(functions.includes(func.functionId)){
            doesContainFunction = true;
            break;
        }
    }
    return doesContainFunction;
}

export function retrievePublicExercises(filteringResources){
    return apiClient.get("/public/exercises")
        .then((response) => 
            response.data.filter((exercise) => {
                return filteringResources.users.includes(exercise.author.username) &&
                    filterExerciseByFunctions(filteringResources.functions, exercise);
            })
        );
}

export function retrieveExercisesCreated(userId, filteringResources){
    return apiClient.get(`/users/${userId}/exercises/created`).then(response => response.data.filter((exercise => {
        return filterExerciseByFunctions(filteringResources.functions, exercise);
    })));
}

export function retrieveExercisesFollowed(userId, filteringResources){
    return apiClient.get(`/users/${userId}/exercises/followed`).then(response => response.data.filter((exercise => {
        return filterExerciseByFunctions(filteringResources.functions, exercise);
    })));
}

export function retrieveExercisesAll(userId, filteringResources){
    return apiClient.get(`/users/${userId}/exercises`).then(response => response.data.filter((exercise => {
        return filterExerciseByFunctions(filteringResources.functions, exercise);
    })));
}

//not sure if needed this exact function
export function retreiveExercisesForFunction(userId, functionId){
    return apiClient.get(`/users/${userId}/exercises/function/${functionId}`);
}



export function retrievePublicExerciseById(exerciseId){
    return apiClient.get(`/public/exercises/${exerciseId}`);
}

export function retrievePrivateExerciseById(userId, exerciseId){
    return apiClient.get(`/users/${userId}/exercises/${exerciseId}`);
}

export function deleteExerciseById(userId, exerciseId){
    return apiClient.delete(`/users/${userId}/exercises/${exerciseId}`);
}

export function createExercise(userId, exerciseDetails){
    return apiClient.post(`/users/${userId}/exercises`, exerciseDetails);
}

export function updateExersice(userId, exerciseId, exerciseDetails){
    return apiClient.put(`/users/${userId}/exercises/${exerciseId}`, exerciseDetails);
}

export function updateExerciseAddingFunction(userId, exerciseId, functionId){
    return apiClient.put(`/users/${userId}/exercises/${exerciseId}/functions/add/${functionId}`);
}

export function updateExerciseRemovingFunction(userId, exerciseId, functionId){
    return apiClient.put(`/users/${userId}/exercises/${exerciseId}/functions/remove/${functionId}`);
}

export function updateExerciseChangingPerformance(userId, exerciseId, functionId, value){
    return apiClient.put(`/users/${userId}/exercises/${exerciseId}/functions/${functionId}/set/${value}`);
}

//only for moderator
export function updateExercisePublish(userId, exerciseId){
    return apiClient.put(`/users/${userId}/exercises/${exerciseId}/publish`);
}

export function updateExerciseUnpublish(userId, exerciseId){
    return apiClient.put(`/users/${userId}/exercises/${exerciseId}/unpublish`);
}
