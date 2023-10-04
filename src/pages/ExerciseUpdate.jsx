import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExercise } from "../api/ExerciseApiService";

export default function ExerciseUpdate(){
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const {userId} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    function updateExer(){
        createExercise({userId}, {title, description})
            .then(response => {
                if(response.status != 200) 
                    setShowErrorMessage(true);
            })
            .then(reponse => {
                navigate(`/private/exercises`);
            })
            .catch(e => {
                console.log(e);
                setShowErrorMessage(true)
            });
    }

    return (
        <div className="container">
            <div className="wrapper">
                {showErrorMessage && <div className='errorMessage'>Error</div>}
                <div className="LoginForm">
                    <div>
                        <label for="title" className="m-2">Title</label>
                        <input className="form-control" id="title" type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div>
                        <label for="description" className="m-2">Description</label>
                        <input className="form-control" id="description" type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>
                    <div>
                        <button type="button" name="create" className='btn btn-success m-5' onClick={updateExer}>Create</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}