import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createExercise, retrievePrivateExerciseById, updateExercise } from "../api/ExerciseApiService";

export default function ExerciseUpdate(){
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const {exerciseId} = useParams();
    const {userId} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const navigate = useNavigate();

    function setExerciseDetails(){
        
        if(!functionId) return;

        retrievePrivateExerciseById({userId, exerciseId}).then((response) => {
            if(response.status != 200) navigate("/"); 
            //also we have to check whether it is moderator/admin

            setTitle(response.data.exerciseDetails.title);
            setDescription(response.data.exerciseDetails.description);

        });
    
        
    }


    function updateExer(){

        let action;
        if(!exerciseId){
            //create new function
            action = createExercise({userId}, {title, description})
        }else{
            //update existing functions
            action = updateExercise({userId, exerciseId}, {title, description});
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
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <button type="button" name="update" className='btn btn-success' onClick={updateExer}>Update</button>
                </div>
            </div>
        </div>
    );
}