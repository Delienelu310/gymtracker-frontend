import { useContext, createContext } from "react";
import { authenticate } from "../api/AuthenticationApi";
import { apiClient } from "../api/ApiClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);

    const [token, setToken] = useState(null);
    
    async function login(username, password){
        
        try{
            const reponse = await authenticate(username, password);
            if(reponse.status == 200){
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

                //getting id
                let userDetails = await apiClient.get(`/users/username/${username}`);
                setUserId(userDetails.data.userId);

                return true;
            }else{
                logout();
                return false;
            }  
        }catch(error){
            logout();
            return false;
        }
        
       
    }

    function logout(){
        setAuthenticated(false);
        setUsername(null);
        setUserId(null);
        setToken(null);
    }

    return (

        <AuthContext.Provider value={{ isAuthenticated, login, logout, userId, username, token}}>
            {children}
        </AuthContext.Provider>
    );
}