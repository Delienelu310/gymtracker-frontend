import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExercise } from "../api/ExerciseApiService";


export default function ExerciseUpdate(){
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const {userId} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");

    const navigate = useNavigate();

    function updateExer(){
        createExercise({userId}, {title, description, image: img})
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
                    {/* trying image: */}
                    <div>
                        <label className="m-2" htmlFor='image'> Choose image </label>
                        <input
                            className="form-control"
                            type="file"
                            id='image'
                            accept='.png, .jpg, .jpeg'
                            onChange={(e) => {
                                const fileReader = new FileReader();
                                
                                fileReader.onload = (event) => {
                                    console.log("Here it is:");
                                    console.log(event.target.result);
                                    setImg(event.target.result);
                                };
                                
                                fileReader.readAsDataURL(e.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="m-5">
                        <p>Selected Image:</p>
                        <img src={img} alt="Selected" />
                    </div>


                    <div>
                        <button type="button" name="create" className='btn btn-success m-5' onClick={updateExer}>Create</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}