import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { retrievePrivateFunctionById, createFunction, updateFunction } from "../api/FunctionApiService";

export default function FunctionUpdate(){

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const {functionId} = useParams();
    const {userId} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const navigate = useNavigate();

    function setFunctionDetails(){
        
        if(!functionId) return;

        retrievePrivateFunctionById({userId, functionId}).then((response) => {
            if(response.status != 200) navigate("/"); 
            //also we have to check whether it is moderator/admin

            setTitle(response.data.functionDetails.title);
            setDescription(response.data.functionDetails.description);

        });
    
        
    }


    function updateFunc(){

        let action;
        if(!functionId){
            //create new function
            action = createFunction({userId}, {title, description})
        }else{
            //update existing functions
            action = updateFunction({userId, functionId}, {title, description});
        }
        action
            .then(response => {
                if(response.status != 200) 
                    setShowErrorMessage(true);
            })
            .catch(e => setShowErrorMessage(true));
    }

    setFunctionDetails();

    return (
        <div className="container">
            {showErrorMessage && <div className='errorMessage'>Error</div>}
            <div className="LoginForm">
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <button type="button" name="update" className='btn btn-success' onClick={updateFunc}>Update</button>
                </div>
            </div>
        </div>
    );
}