import { apiClient } from "./ApiClient";

export function getFunctionGroupsFromWebmoderator(){
    return apiClient.get(`public/functiongroups`)
        .then(groups => {
            if(groups.status != 200){
                console.log(groups);
            }else{
                return groups.data.filter(group => {
                    return group.author.appUserDetails.username == 'web_moderator';
                })
            }   
        }).catch(error => console.log(error));
}

export function getFunctionByTitle({userId, title}){
    return apiClient.get(`/users/${userId}/functions/title/${title}`);
}

export function getPublicFunctionOfGroup(filteringResources, {functionGroupId}){
    return apiClient.get(`/public/functiongroups/${functionGroupId}`)
        .then(response => {
            return response.data.functions;
        });
}

export  function getPrivateFunctionsOfGroup(filteringResources, {userId, functionGroupId}){
    return apiClient.get(`/users/${userId}/functions`)
        .then(response => {
            const filtered = response.data.filter(func => {
                const ids =  func.functionGroups.map(group => {
                    return group.functionGroupId
                })
                return ids.includes(+functionGroupId);
            });
            return filtered;
        }).catch(error => console.log(error));
}

export function getPrivateCreatedFunctionOfGroup(filteringResources, {userId, functionGroupId}){
    return apiClient.get(`/users/${userId}/functions/created`)
        .then(response => {
            const filtered = response.data.filter(func => {
                const ids =  func.functionGroups.map(group => {
                    return group.functionGroupId
                })
                return ids.includes(+functionGroupId);
            });
            return filtered;
        }).catch(error => console.log(error));
}

export function getPrivateFollowedFunctionOfGroup(filteringResources, {userId, functionGroupId}){
    return apiClient.get(`/users/${userId}/functions/followed`)
        .then(response => {
            const filtered = response.data.filter(func => {
                const ids =  func.functionGroups.map(group => {
                    return group.functionGroupId
                })
                return ids.includes(+functionGroupId);
            });
            return filtered;
        }).catch(error => console.log(error));
}



export function addFunctionToGroup({userId, functionId, functionGroupId}){
    return apiClient.put(`/users/${userId}/functions/${functionId}/add/functiongroup/${functionGroupId}`);
}

export function removeFunctionFromGroup({userId, functionId, functionGroupId}){
    return apiClient.put(`/users/${userId}/functions/${functionId}/remove/functiongroup/${functionGroupId}`);
}

export function getPublicFunctionsFromFunctionGroup({functionGroupId}){
    return apiClient.get(`public/functiongroups/${functionGroupId}`).then(response => {
        return response.data.functions;
    }).catch(error => console.log(error));
}
