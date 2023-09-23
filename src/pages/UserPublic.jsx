import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { retrievePublicUserById } from "../api/UserApiService";

export default function UserPublic(){

    const {userId} = useParams();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    function serFunctionDetails(){
        retrievePublicUserById({userId})
            .then((response) => {
                if(response.status != 200) navigate("/");
                setUsername(response.data.appUserDetails.username);
                setFullname(response.data.appUserDetails.fullname);
                setEmail(response.data.appUserDetails.email);
            })
            .catch((e) => {
                navigate("/");
            });
    }
    serFunctionDetails();

    return (
        <div>
            
            <div className="userDetails">
                <div>Id: {userId}</div>
                <div>Username: {username}</div>
                <div>Full name: {fullname}</div>
                <div>Email: {email}</div>
                
                {/* to add: created by him public exercises and functions */}
                
            </div>



        </div>
    );

}