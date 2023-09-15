import { useAuth } from "../security/AuthContext";


export default function Header(){

    const authContext = useAuth();

    return (
        <div>
            Header
            {authContext.username}
            {authContext.userId}
        </div>
    );
}