import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { createFunction } from "../api/FunctionApiService";

export default function FunctionUpdate(){

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const {userId} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    
    const navigate = useNavigate();

    function updateFunc(){

        createFunction({userId}, {title, description, image:img})
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
            <div className="wrapper">
                <div>
                    <label for="title" className="m-2">Title</label>
                    <input className="form-control" type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    <label for="description" className="m-2">Description</label>
                    <input className="form-control" type="text" id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
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
                    <button type="button" name="update" className='btn btn-success m-5' onClick={updateFunc}>Update</button>
                </div>

            </div>
        </div>
    );
}