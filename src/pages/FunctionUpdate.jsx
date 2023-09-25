import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { createFunction } from "../api/FunctionApiService";

export default function FunctionUpdate(){

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const {userId} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const navigate = useNavigate();

    function updateFunc(){

        createFunction({userId}, {title, description})
            .then(response => {
                if(response.status != 200) 
                    setShowErrorMessage(true);
            }).then(response => {
                navigate("/private/functions");
            })
            .catch(e => setShowErrorMessage(true));
    }

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