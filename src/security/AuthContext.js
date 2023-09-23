import { useState, useContext, createContext } from "react";
import { authenticate, register } from "../api/AuthenticationApi";
import { apiClient } from "../api/ApiClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);

    const [token, setToken] = useState(null);

    async function handleRegistration(userDetails){
        try{
            const registrationResponse = await register(userDetails);
            if(registrationResponse.status == 200){

                return login(userDetails.username, userDetails.password);

            }else{
                logout();
                return false;
            }
        }catch(e){
            logout();
            return false;
        }
    }
    
    async function login(username, password){
        
        try{
            const reponse = await authenticate(username, password);
            if(reponse.status == 200){
                console.log(reponse);
                const jwtToken = "Bearer " + reponse.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization=jwtToken
                        return config;
                    }
                );
                console.log(jwtToken + ' ' + userId);
                //getting id
                let userDetails = await apiClient.get(`/users/username/${username}`);
                setUserId(userDetails.data.userId);

                return true;
            }else{
                logout();
                return false;
            }  
        }catch(error){
            console.log("Error");
            console.log(error);
            logout();
            return false;
        }
        
       
    }

    function logout(){
        setAuthenticated(false);
        setUsername(null);
        setUserId(null);
        setToken(null);

        apiClient.interceptors.request.use(
            (config) => {
                config.headers.Authorization = null;
                return config;
            }
        );
    }

    return (

        <AuthContext.Provider value={{ isAuthenticated, handleRegistration, login, logout, userId, username, token}}>
            {children}
        </AuthContext.Provider>
    );
}