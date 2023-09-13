import { apiClient } from "./ApiClient";


export function retrieveTrainingsForExercise(userId, exerciseId){
    return apiClient.get(`/users/${userId}/exercises/${exerciseId}/trainings`);
}

export function retrieveTrainingByIds(userId, exerciseId, trainingId){
    return apiClient.get(`/users/${userId}/exercises/${exerciseId}/trainings/${trainingId}`);
}

export function retrieveTrainingsForUser(userId){
    return apiClient.get(`/users/${userId}/trainings`);
}

export function deleteTraining(userId, exerciseId, trainingId){
    return apiClient.delete(`/users/${userId}/exercises/${exerciseId}/trainings/${trainingId}`);
}

export function deleteAllTrainingsForExercise(userId, exerciseId){
    return apiClient.delete(`/users/${userId}/exercises/${exerciseId}/trainings`);
}

export function deleteAllTrainingsForUser(userId){
    return apiClient.delete(`/users/${userId}/trainings`);
}

export function createTraining(userId, exerciseId, training){
    return apiClient.post(`/users/${userId}/exercises/${exerciseId}/trainings`, training);
}

export function updateTraining(userId, exerciseId, trainingId, functionDetails){
    return apiClient.put(`/users/${userId}/exercises/${exerciseId}/trainings/${trainingId}`, functionDetails);
}
