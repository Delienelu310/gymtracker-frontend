import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateUser, retrievePrivateUserById } from "../api/UserApiService";

export default function UserUpdate(){
    const params = useParams();
    
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    let {userId} = useAuth();
    if(!userId) userId = params.userId;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    
    const navigate = useNavigate();

    function setExerciseDetails(){
        
        if(!userId) return;

        retrievePrivateUserById({userId}).then((response) => {
            if(response.status != 200) navigate("/"); 
            //also we have to check whether it is moderator/admin

            setUsername(response.data.appUserDetails.username);
            setEmail(response.data.appUserDetails.email);
            setFullname(response.data.appUserDetails.fullname);

        });
    
        
    }

    function updateUs(){

        let action;
        if(!userId){
            //add moderator or user for admin
        }else{
            //update existing functions
            action = updateUser({userId}, {});
        }
        action
            .then(response => {
                if(response.status != 200) 
                    setShowErrorMessage(true);
            })
            .catch(e => setShowErrorMessage(true));
    }

    setExerciseDetails();

    return (
        <div className="container">
            {showErrorMessage && <div className='errorMessage'>Error</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Full name</label>
                    <input type="text" name="fullname" value={fullname} onChange={(event) => setFullname(event.target.value)} />
                </div>
                <div>
                    <button type="button" name="update" className='btn btn-success' onClick={updateUs}>Update</button>
                </div>
            </div>
        </div>
    );
}