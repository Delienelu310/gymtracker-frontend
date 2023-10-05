import { useState, useContext, createContext } from "react";
import { authenticate, register } from "../api/AuthenticationApi";
import { apiClient } from "../api/ApiClient";
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);

    const [token, setToken] = useState(null);

    const [role, setRole] = useState(null);

    const [requestInjector, setRequestInjector] = useState(null);

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
            console.log(1);
            if(reponse.status == 200){
                console.log(reponse);
                const jwtToken = "Bearer " + reponse.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);

                const decodedToken = jwt_decode(jwtToken.substring(7));

                let roles = decodedToken.scope.split(" ");
                console.log(roles);
                if(roles.includes("ROLE_ADMIN"))
                    setRole("admin");
                else if(roles.includes("ROLE_MODER"))
                    setRole("moder")
                else if(roles.includes("ROLE_USER"))
                    setRole("user");

                setRequestInjector(apiClient.interceptors.request.use((config) => {
                    config.headers.Authorization=jwtToken
                    return config;
                }));

                console.log(apiClient.interceptors);
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
        setRole(null);

        console.log(requestInjector);
        apiClient.interceptors.request.eject(requestInjector);
        setRequestInjector(null);

        console.log("Interceptors after logout");
        console.log(apiClient.interceptors);
    }

    return (

        <AuthContext.Provider value={{ isAuthenticated, handleRegistration, login, logout, userId, username, token, role}}>
            {children}
        </AuthContext.Provider>
    );
}